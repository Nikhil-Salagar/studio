'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Trees } from 'lucide-react';
import { suggestCrops, type SuggestCropsOutput } from '@/ai/flows/suggest-crops';
import { useToast } from '@/hooks/use-toast';

export function CropSuggestionCard() {
  const [soilType, setSoilType] = useState('');
  const [season, setSeason] = useState('');
  const [location, setLocation] = useState('');
  const [result, setResult] = useState<SuggestCropsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

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

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Trees className="h-6 w-6 text-primary" />
          <CardTitle className="font-headline text-2xl">Crop Suggestions</CardTitle>
        </div>
        <CardDescription>Get AI-powered crop recommendations based on your farm's conditions.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="soil-type">Soil Type</Label>
              <Input id="soil-type" placeholder="e.g., Loamy, Sandy, Clay" value={soilType} onChange={(e) => setSoilType(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="season">Season</Label>
              <Select onValueChange={setSeason} required>
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
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" placeholder="e.g., Punjab, India" value={location} onChange={(e) => setLocation(e.target.value)} required />
          </div>
          <Button type="submit" disabled={isLoading || !soilType || !season || !location}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Suggest Crops
          </Button>
        </form>

        {result && result.crops && (
          <div className="mt-6">
            <h3 className="font-headline text-xl text-foreground mb-4">Recommended Crops:</h3>
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
