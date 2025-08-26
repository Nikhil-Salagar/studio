
'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, ShieldCheck, Upload, Camera, SwitchCamera, Volume2 } from 'lucide-react';
import { generateCropCarePlan, type GenerateCropCarePlanOutput } from '@/ai/flows/generate-crop-care-plan';
import { useToast } from '@/hooks/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { useLanguage } from '@/lib/i18n';
import { textToSpeech } from '@/ai/flows/text-to-speech';

const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB
const STORAGE_KEY = 'cropCarePlanData';

export function CropCarePlannerCard() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    crop: '',
    harvestMonths: '',
  });
  const [plantationDate, setPlantationDate] = useState<Date | undefined>(new Date());
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [result, setResult] = useState<GenerateCropCarePlanOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | undefined>();
  const [cameraFacingMode, setCameraFacingMode] = useState<'user' | 'environment'>('environment');

  useEffect(() => {
    try {
      const storedData = localStorage.getItem(STORAGE_KEY);
      if (storedData) {
        const { formData, plantationDate, photoPreview, result } = JSON.parse(storedData);
        setFormData(formData || { crop: '', harvestMonths: '' });
        setPlantationDate(plantationDate ? new Date(plantationDate) : new Date());
        setPhotoPreview(photoPreview || null);
        setResult(result || null);
      }
    } catch (error) {
      console.error("Failed to parse crop care plan data from localStorage", error);
    }
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      try {
        const dataToStore = JSON.stringify({ formData, plantationDate, photoPreview, result });
        localStorage.setItem(STORAGE_KEY, dataToStore);
      } catch (error) {
        console.error("Failed to save crop care plan data to localStorage", error);
      }
    }
  }, [formData, plantationDate, photoPreview, result, isMounted]);

  useEffect(() => {
    let stream: MediaStream | null = null;
    const getCameraPermission = async () => {
      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
           throw new Error('Camera not supported');
        }
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: cameraFacingMode } });
        setHasCameraPermission(true);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        setIsCameraOpen(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings.',
        });
      }
    };

    if (isCameraOpen) {
      getCameraPermission();
    }

    return () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
        if(videoRef.current) {
            videoRef.current.srcObject = null;
        }
    }
  }, [isCameraOpen, cameraFacingMode, toast]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        toast({
          variant: "destructive",
          title: "File too large",
          description: "Please upload an image smaller than 4MB.",
        });
        return;
      }
      setPhoto(file);
      const newPhotoPreview = URL.createObjectURL(file);
      setPhotoPreview(newPhotoPreview);
      setResult(null);
    }
  };

  const fileToDataUri = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };
  
  const handleToggleCamera = () => {
    setCameraFacingMode(prevMode => prevMode === 'user' ? 'environment' : 'user');
  };

  const handleCapture = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const context = canvas.getContext('2d');
      if(context){
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], "capture.jpg", { type: "image/jpeg" });
            setPhoto(file);
            setPhotoPreview(URL.createObjectURL(file));
          }
        }, 'image/jpeg');
      }
      setIsCameraOpen(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  
  const isFormValid = () => {
    return formData.crop && formData.harvestMonths && plantationDate;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) return;
    
    setIsLoading(true);
    setResult(null);
    try {
      let photoDataUri: string | undefined = undefined;
      if (photo) {
        photoDataUri = await fileToDataUri(photo);
      } else if (photoPreview) {
        // If there's a preview but no file, it's likely from localStorage.
        // We can't re-upload, but the flow can proceed without the image data.
        // The AI won't do photo analysis in this case, which is acceptable.
      }

      const response = await generateCropCarePlan({
        ...formData,
        plantationDate: format(plantationDate!, 'yyyy-MM-dd'),
        harvestMonths: Number(formData.harvestMonths),
        photoDataUri
      });
      setResult(response);
    } catch (error) {
      console.error('Error generating crop care plan:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate a crop care plan. Please try again.",
      });
    }
    setIsLoading(false);
  };
  
  const handleReadAloud = async () => {
    if (!result) return;
    let textToRead = "";
    if (result.photoAnalysis) {
      textToRead += `${t('cropCarePlannerCard.photoAnalysis')}: ${result.photoAnalysis}. `;
    }
    result.monthlyPlan.forEach(plan => {
      textToRead += `${t('cropCarePlannerCard.month')} ${plan.month}: 
        ${t('cropCarePlannerCard.fertilizer')}: ${plan.fertilizer}. 
        ${t('cropCarePlannerCard.herbicide')}: ${plan.herbicide}. 
        ${t('cropCarePlannerCard.pesticide')}: ${plan.pesticide}. `;
    });

    setIsReading(true);
    try {
      const { audio } = await textToSpeech({ text: textToRead });
      const audioPlayer = new Audio(audio);
      audioPlayer.play();
      audioPlayer.onended = () => setIsReading(false);
    } catch (error) {
      console.error('Error with text-to-speech:', error);
      toast({
        variant: "destructive",
        title: "Audio Error",
        description: "Could not play audio. Please try again.",
      });
      setIsReading(false);
    }
  };
  
  if (!isMounted) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-6 w-6 text-primary" />
          <CardTitle className="font-headline text-2xl">{t('cropCarePlannerCard.title')}</CardTitle>
        </div>
        <CardDescription>{t('cropCarePlannerCard.description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="crop">{t('cropCarePlannerCard.crop')}</Label>
              <Input id="crop" placeholder={t('cropCarePlannerCard.cropPlaceholder')} value={formData.crop} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="plantationDate">{t('cropCarePlannerCard.plantationDate')}</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !plantationDate && "text-muted-foreground"
                    )}
                  >
                    {plantationDate ? format(plantationDate, "PPP") : <span>{t('cropCarePlannerCard.pickDate')}</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={plantationDate}
                    onSelect={setPlantationDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="harvestMonths">{t('cropCarePlannerCard.harvestMonths')}</Label>
              <Input id="harvestMonths" type="number" placeholder={t('cropCarePlannerCard.harvestMonthsPlaceholder')} value={formData.harvestMonths} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
                <Label>{t('cropCarePlannerCard.cropPhoto')}</Label>
                <div className="flex gap-2">
                    <Input id="photo" type="file" accept="image/*" onChange={handleFileChange} ref={fileInputRef} className="hidden"/>
                    <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
                        <Upload className="mr-2 h-4 w-4"/>
                        {photo || photoPreview ? t('common.change') : t('common.upload')}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setIsCameraOpen(true)}>
                        <Camera className="mr-2 h-4 w-4"/>
                        {t('common.openCamera')}
                    </Button>
                </div>
            </div>
          </div>

          {photoPreview && (
            <div className="mt-4 relative w-full max-w-sm h-64 rounded-lg overflow-hidden border">
              <Image src={photoPreview} alt="Plant preview" layout="fill" objectFit="cover" />
            </div>
          )}

          {isCameraOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center z-50 p-4">
                <Card className="w-full max-w-lg">
                    <CardHeader>
                        <CardTitle>{t('cropCarePlannerCard.cameraCardTitle')}</CardTitle>
                        <CardDescription>{t('cropCarePlannerCard.cameraCardDescription')}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <video ref={videoRef} className="w-full aspect-video rounded-md" autoPlay muted />
                        {hasCameraPermission === false && (
                            <Alert variant="destructive" className="mt-4">
                                <AlertTitle>Camera Access Required</AlertTitle>
                                <AlertDescription>Please allow camera access to use this feature.</AlertDescription>
                            </Alert>
                        )}
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setIsCameraOpen(false)}>{t('common.cancel')}</Button>
                        <Button variant="outline" onClick={handleToggleCamera} disabled={hasCameraPermission !== true}>
                            <SwitchCamera className="mr-2 h-4 w-4" />
                            {t('common.switchCamera')}
                        </Button>
                        <Button onClick={handleCapture} disabled={hasCameraPermission !== true}>{t('common.capture')}</Button>
                    </CardFooter>
                </Card>
            </div>
           )}

          <Button type="submit" disabled={isLoading || !isFormValid()}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {t('cropCarePlannerCard.buttonText')}
          </Button>
        </form>

        {result && (
          <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg space-y-4">
             <div className="flex justify-between items-center">
                <h3 className="font-headline text-xl text-foreground">{t('cropCarePlannerCard.resultsTitle')}</h3>
                <Button variant="ghost" size="icon" onClick={handleReadAloud} disabled={isReading}>
                    {isReading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Volume2 className="h-5 w-5" />}
                    <span className="sr-only">Read aloud</span>
                </Button>
            </div>
            {result.photoAnalysis && (
                <div>
                    <h4 className="font-semibold text-primary">{t('cropCarePlannerCard.photoAnalysis')}</h4>
                    <p className="whitespace-pre-wrap">{result.photoAnalysis}</p>
                </div>
            )}
            <div className="space-y-4">
                {result.monthlyPlan.map((monthPlan) => (
                    <Card key={monthPlan.month}>
                        <CardHeader>
                            <CardTitle>{t('cropCarePlannerCard.month')} {monthPlan.month}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div>
                                <h5 className="font-semibold">{t('cropCarePlannerCard.fertilizer')}:</h5>
                                <p>{monthPlan.fertilizer}</p>
                            </div>
                             <div>
                                <h5 className="font-semibold">{t('cropCarePlannerCard.herbicide')}:</h5>
                                <p>{monthPlan.herbicide}</p>
                            </div>
                             <div>
                                <h5 className="font-semibold">{t('cropCarePlannerCard.pesticide')}:</h5>
                                <p>{monthPlan.pesticide}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

    