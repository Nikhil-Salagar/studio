
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, LineChart } from 'lucide-react';
import { forecastProfitability, type ForecastProfitabilityOutput } from '@/ai/flows/forecast-profitability';
import { useToast } from '@/hooks/use-toast';

export function ProfitabilityForecastCard() {
  const [formData, setFormData] = useState({
    crop: '',
    acres: '',
    soilType: '',
    location: '',
  });
  const [result, setResult] = useState<ForecastProfitabilityOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
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
      const response = await forecastProfitability({
        ...formData,
        acres: Number(formData.acres)
      });
      setResult(response);
    } catch (error) {
      console.error('Error forecasting profitability:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to get profitability forecast. Please try again.",
      });
    }
    setIsLoading(false);
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-3">
          <LineChart className="h-6 w-6 text-primary" />
          <CardTitle className="font-headline text-2xl">Profitability Forecast</CardTitle>
        </div>
        <CardDescription>Get an AI-powered profitability forecast for your next crop.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="crop">Crop</Label>
              <Input id="crop" placeholder="e.g., Maize" value={formData.crop} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="acres">Acres to Plant</Label>
              <Input id="acres" type="number" placeholder="e.g., 2" value={formData.acres} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="soilType">Soil Type</Label>
              <Input id="soilType" placeholder="e.g., Loamy" value={formData.soilType} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="e.g., Punjab, India" value={formData.location} onChange={handleChange} required />
            </div>
          </div>
          <Button type="submit" disabled={isLoading || !isFormValid()}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Forecast Profit
          </Button>
        </form>

        {result && (
          <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg space-y-4">
            <h3 className="font-headline text-xl text-foreground">Profitability Forecast:</h3>
            <p className="text-lg text-center font-semibold text-primary bg-background p-3 rounded-md">
                {result.recommendation}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <h4 className="font-semibold text-primary">Expected Yield</h4>
                    <p>{result.expectedYield}</p>
                </div>
                <div>
                    <h4 className="font-semibold text-primary">Expected Profit</h4>
                    <p>{result.expectedProfit}</p>
                </div>
                <div>
                    <h4 className="font-semibold text-primary">Timeframe</h4>
                    <p>{result.timeframe}</p>
                </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
