'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Store } from 'lucide-react';
import { summarizeMarketPrices } from '@/ai/flows/summarize-market-prices';
import { useToast } from '@/hooks/use-toast';

export function MarketPriceCard() {
  const [crop, setCrop] = useState('');
  const [location, setLocation] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!crop || !location) return;

    setIsLoading(true);
    setSummary('');
    try {
      const result = await summarizeMarketPrices({ crop, location });
      setSummary(result.summary);
    } catch (error) {
      console.error('Error getting market prices:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to get market prices. Please try again.",
      });
    }
    setIsLoading(false);
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
         <div className="flex items-center gap-3">
          <Store className="h-6 w-6 text-primary" />
          <CardTitle className="font-headline text-2xl">Market Price Summary</CardTitle>
        </div>
        <CardDescription>Get AI-summarized market prices (Mandi prices) for your crops.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="crop">Crop</Label>
              <Input id="crop" placeholder="e.g., Wheat" value={crop} onChange={(e) => setCrop(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location (Market/Mandi)</Label>
              <Input id="location" placeholder="e.g., Karnal Mandi" value={location} onChange={(e) => setLocation(e.target.value)} required />
            </div>
          </div>
          <Button type="submit" disabled={isLoading || !crop || !location}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Get Prices
          </Button>
        </form>

        {summary && (
          <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <h3 className="font-semibold text-lg text-primary mb-2">Market Summary for {crop} in {location}:</h3>
            <p className="text-foreground whitespace-pre-wrap">{summary}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
