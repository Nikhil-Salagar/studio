
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Trees } from 'lucide-react';
import { suggestCrops, type SuggestCropsOutput } from '@/ai/flows/suggest-crops';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/lib/i18n';

const STORAGE_KEY = 'cropSuggestionData';

export function CropSuggestionCard() {
  const { t } = useLanguage();
  const [soilType, setSoilType] = useState('');
  const [season, setSeason] = useState('');
  const [location, setLocation] = useState('');
  const [result, setResult] = useState<SuggestCropsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    try {
      const storedData = localStorage.getItem(STORAGE_KEY);
      if (storedData) {
        const { soilType, season, location, result } = JSON.parse(storedData);
        setSoilType(soilType || '');
        setSeason(season || '');
        setLocation(location || '');
        setResult(result || null);
      }
    } catch (error) {
      console.error("Failed to parse crop suggestion data from localStorage", error);
    }
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      try {
        const dataToStore = JSON.stringify({ soilType, season, location, result });
        localStorage.setItem(STORAGE_KEY, dataToStore);
      } catch (error) {
          console.error("Failed to save crop suggestion data to localStorage", error);
      }
    }
  }, [soilType, season, location, result, isMounted]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!soilType || !season || !location) return;

    setIsLoading(true);
    setResult(null);
    try {
      const response = await suggestCrops({ soilType, season, location });
      setResult(response);
    } catch (error) {
      console.error('Error suggesting crops:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to get crop suggestions. Please try again.",
      });
    }
    setIsLoading(false);
  };

  if (!isMounted) {
    return null; // Or a loading skeleton
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Trees className="h-6 w-6 text-primary" />
          <CardTitle className="font-headline text-2xl">{t('cropSuggestionCard.title')}</CardTitle>
        </div>
        <CardDescription>{t('cropSuggestionCard.description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="soil-type">{t('cropSuggestionCard.soilType')}</Label>
              <Input id="soil-type" placeholder={t('cropSuggestionCard.soilTypePlaceholder')} value={soilType} onChange={(e) => setSoilType(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="season">{t('cropSuggestionCard.season')}</Label>
              <Select value={season} onValueChange={setSeason} required>
                <SelectTrigger id="season">
                  <SelectValue placeholder={t('cropSuggestionCard.seasonPlaceholder')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Kharif (Monsoon)">{t('cropSuggestionCard.kharif')}</SelectItem>
                  <SelectItem value="Rabi (Winter)">{t('cropSuggestionCard.rabi')}</SelectItem>
                  <SelectItem value="Zaid (Summer)">{t('cropSuggestionCard.zaid')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">{t('cropSuggestionCard.location')}</Label>
            <Input id="location" placeholder={t('cropSuggestionCard.locationPlaceholder')} value={location} onChange={(e) => setLocation(e.target.value)} required />
          </div>
          <Button type="submit" disabled={isLoading || !soilType || !season || !location}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {t('cropSuggestionCard.buttonText')}
          </Button>
        </form>

        {result && result.crops && (
          <div className="mt-6">
            <h3 className="font-headline text-xl text-foreground mb-4">{t('cropSuggestionCard.resultsTitle')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {result.crops.map((crop, index) => (
                <Card key={index} className="bg-primary/5">
                  <CardHeader>
                    <CardTitle className="text-lg text-primary">{crop.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-foreground">{crop.reason}</p>
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
