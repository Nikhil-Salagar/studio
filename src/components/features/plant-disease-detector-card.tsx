'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Bug, Upload } from 'lucide-react';
import { detectPlantDisease, type DetectPlantDiseaseOutput } from '@/ai/flows/detect-plant-disease';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '../ui/progress';

const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB
const STORAGE_KEY = 'plantDiseaseData';

export function PlantDiseaseDetectorCard() {
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [result, setResult] = useState<DetectPlantDiseaseOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const storedData = localStorage.getItem(STORAGE_KEY);
      if (storedData) {
        const { photoPreview, result } = JSON.parse(storedData);
        setPhotoPreview(photoPreview || null);
        setResult(result || null);
      }
    } catch (error) {
      console.error("Failed to parse plant disease data from localStorage", error);
    }
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      try {
        if (photoPreview || result) {
            const dataToStore = JSON.stringify({ photoPreview, result });
            localStorage.setItem(STORAGE_KEY, dataToStore);
        }
      } catch (error) {
          console.error("Failed to save plant disease data to localStorage", error);
      }
    }
  }, [photoPreview, result, isMounted]);

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
      setPhotoPreview(URL.createObjectURL(file));
      setResult(null); // Clear previous results when new photo is selected
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!photo) return;

    setIsLoading(true);
    setResult(null);
    try {
      const photoDataUri = await fileToDataUri(photo);
      const response = await detectPlantDisease({ photoDataUri });
      setResult(response);
    } catch (error) {
      console.error('Error detecting plant disease:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to analyze the image. Please try again.",
      });
    }
    setIsLoading(false);
  };
  
  if (!isMounted) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Bug className="h-6 w-6 text-primary" />
          <CardTitle className="font-headline text-2xl">Plant Disease Detector</CardTitle>
        </div>
        <CardDescription>Upload a photo of a plant to detect diseases and get treatment recommendations.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="photo">Plant Photo</Label>
            <Input id="photo" type="file" accept="image/*" onChange={handleFileChange} ref={fileInputRef} className="hidden"/>
            <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
                <Upload className="mr-2 h-4 w-4"/>
                {photo || photoPreview ? 'Change Photo' : 'Upload Photo'}
            </Button>
          </div>

          {photoPreview && (
            <div className="mt-4 relative w-full max-w-sm h-64 rounded-lg overflow-hidden border">
              <Image src={photoPreview} alt="Plant preview" layout="fill" objectFit="cover" />
            </div>
          )}

          <Button type="submit" disabled={isLoading || !photo}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Analyze Photo
          </Button>
        </form>

        {result && (
          <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg space-y-4">
            <h3 className="font-headline text-xl text-foreground">Analysis Result:</h3>
            <div>
              <h4 className="font-semibold text-primary">Detected Disease/Pest</h4>
              <p>{result.disease}</p>
            </div>
            <div>
              <h4 className="font-semibold text-primary">Confidence</h4>
              <div className="flex items-center gap-2">
                <Progress value={result.confidence * 100} className="w-full max-w-xs" />
                <span>{(result.confidence * 100).toFixed(0)}%</span>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-primary">Recommended Treatment</h4>
              <p className="whitespace-pre-wrap">{result.treatment}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
