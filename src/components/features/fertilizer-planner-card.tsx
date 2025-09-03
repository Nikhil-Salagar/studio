
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, TestTube2 } from 'lucide-react';
import { recommendFertilizerPlan, type RecommendFertilizerPlanOutput } from '@/ai/flows/recommend-fertilizer-plan';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/lib/i18n';
import { useTTS } from '@/hooks/use-tts';

const STORAGE_KEY = 'fertilizerPlanData';

export function FertilizerPlannerCard() {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    cropType: '',
    soilType: '',
    location: '',
    season: '',
    historicalYield: '',
    farmerExperience: ''
  });
  const [result, setResult] = useState<RecommendFertilizerPlanOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { readAloud } = useTTS();
  const [isMounted, setIsMounted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const storedData = localStorage.getItem(STORAGE_KEY);
      if (storedData) {
        const { formData, result } = JSON.parse(storedData);
        setFormData(formData || {
            cropType: '',
            soilType: '',
            location: '',
            season: '',
            historicalYield: '',
            farmerExperience: ''
        });
        setResult(result || null);
      }
    } catch (error) {
      console.error("Failed to parse fertilizer plan data from localStorage", error);
    }
    setIsMounted(true);
  }, []);

  const getPlanAsText = () => {
    if (!result) return "";
    return `
      Fertilizer Type: ${result.fertilizerType}.
      Amount per Acre: ${result.amount}.
      Application Schedule: ${result.schedule}.
      Additional Tips: ${result.additionalTips}.
    `;
  };

  useEffect(() => {
    if (isMounted) {
      try {
        const dataToStore = JSON.stringify({ formData, result });
        localStorage.setItem(STORAGE_KEY, dataToStore);
      } catch (error) {
          console.error("Failed to save fertilizer plan data to localStorage", error);
      }
    }
  }, [formData, result, isMounted]);

  useEffect(() => {
    if (result) {
        const text = getPlanAsText();
        readAloud(text);
    }
  }, [result]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSelectChange = (id: keyof typeof formData) => (value: string) => {
    setFormData({ ...formData, [id]: value });
  };

  const isFormValid = () => {
    return Object.values(formData).every(value => value !== '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) return;
    
    setIsLoading(true);
    setResult(null);
    try {
      const response = await recommendFertilizerPlan({
        ...formData,
        historicalYield: Number(formData.historicalYield),
        language,
      });
      setResult(response);
    } catch (error) {
      console.error('Error recommending fertilizer plan:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to get fertilizer plan. Please try again.",
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
          <TestTube2 className="h-6 w-6 text-primary" />
          <CardTitle className="font-headline text-2xl">{t('fertilizerPlannerCard.title')}</CardTitle>
        </div>
        <CardDescription>{t('fertilizerPlannerCard.description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cropType">{t('fertilizerPlannerCard.cropType')}</Label>
              <Input id="cropType" placeholder={t('fertilizerPlannerCard.cropTypePlaceholder')} value={formData.cropType} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="soilType">{t('fertilizerPlannerCard.soilType')}</Label>
              <Input id="soilType" placeholder={t('fertilizerPlannerCard.soilTypePlaceholder')} value={formData.soilType} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">{t('fertilizerPlannerCard.location')}</Label>
              <Input id="location" placeholder={t('fertilizerPlannerCard.locationPlaceholder')} value={formData.location} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="season">{t('fertilizerPlannerCard.season')}</Label>
               <Select value={formData.season} onValueChange={handleSelectChange('season')} required>
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
            <div className="space-y-2">
              <Label htmlFor="historicalYield">{t('fertilizerPlannerCard.historicalYield')}</Label>
              <Input id="historicalYield" type="number" placeholder={t('fertilizerPlannerCard.historicalYieldPlaceholder')} value={formData.historicalYield} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="farmerExperience">{t('fertilizerPlannerCard.farmerExperience')}</Label>
              <Select value={formData.farmerExperience} onValueChange={handleSelectChange('farmerExperience')} required>
                <SelectTrigger id="farmerExperience">
                  <SelectValue placeholder={t('fertilizerPlannerCard.experiencePlaceholder')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">{t('fertilizerPlannerCard.beginner')}</SelectItem>
                  <SelectItem value="Intermediate">{t('fertilizerPlannerCard.intermediate')}</SelectItem>
                  <SelectItem value="Expert">{t('fertilizerPlannerCard.expert')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button type="submit" disabled={isLoading || !isFormValid()}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {t('fertilizerPlannerCard.buttonText')}
          </Button>
        </form>

        {result && (
          <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="font-headline text-xl text-foreground">{t('fertilizerPlannerCard.resultsTitle')}</h3>
            </div>
            <div>
                <h4 className="font-semibold text-primary">{t('fertilizerPlannerCard.resultFertilizerType')}</h4>
                <p>{result.fertilizerType}</p>
            </div>
            <div>
                <h4 className="font-semibold text-primary">{t('fertilizerPlannerCard.resultAmount')}</h4>
                <p>{result.amount}</p>
            </div>
             <div>
                <h4 className="font-semibold text-primary">{t('fertilizerPlannerCard.resultSchedule')}</h4>
                <p>{result.schedule}</p>
            </div>
             <div>
                <h4 className="font-semibold text-primary">{t('fertilizerPlannerCard.resultTips')}</h4>
                <p>{result.additionalTips}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
