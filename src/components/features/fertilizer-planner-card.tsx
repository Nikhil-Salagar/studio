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

const STORAGE_KEY = 'fertilizerPlanData';

export function FertilizerPlannerCard() {
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
        historicalYield: Number(formData.historicalYield)
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
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-3">
          <TestTube2 className="h-6 w-6 text-primary" />
          <CardTitle className="font-headline text-2xl">Fertilizer Planner</CardTitle>
        </div>
        <CardDescription>Get a personalized fertilizer recommendation for your crops.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cropType">Crop Type</Label>
              <Input id="cropType" placeholder="e.g., Wheat, Rice" value={formData.cropType} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="soilType">Soil Type</Label>
              <Input id="soilType" placeholder="e.g., Alluvial" value={formData.soilType} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="e.g., Haryana, India" value={formData.location} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="season">Season</Label>
               <Select value={formData.season} onValueChange={handleSelectChange('season')} required>
                <SelectTrigger id="season">
                  <SelectValue placeholder="Select a season" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Kharif (Monsoon)">Kharif (Monsoon)</SelectItem>
                  <SelectItem value="Rabi (Winter)">Rabi (Winter)</SelectItem>
                  <SelectItem value="Zaid (Summer)">Zaid (Summer)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="historicalYield">Historical Yield (kg/acre)</Label>
              <Input id="historicalYield" type="number" placeholder="e.g., 2000" value={formData.historicalYield} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="farmerExperience">Farmer Experience</Label>
              <Select value={formData.farmerExperience} onValueChange={handleSelectChange('farmerExperience')} required>
                <SelectTrigger id="farmerExperience">
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button type="submit" disabled={isLoading || !isFormValid()}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Get Plan
          </Button>
        </form>

        {result && (
          <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg space-y-4">
            <h3 className="font-headline text-xl text-foreground">Your Personalized Fertilizer Plan:</h3>
            <div>
                <h4 className="font-semibold text-primary">Fertilizer Type</h4>
                <p>{result.fertilizerType}</p>
            </div>
            <div>
                <h4 className="font-semibold text-primary">Amount per Acre</h4>
                <p>{result.amount}</p>
            </div>
             <div>
                <h4 className="font-semibold text-primary">Application Schedule</h4>
                <p>{result.schedule}</p>
            </div>
             <div>
                <h4 className="font-semibold text-primary">Additional Tips</h4>
                <p>{result.additionalTips}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
