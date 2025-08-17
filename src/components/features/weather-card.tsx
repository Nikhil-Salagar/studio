'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Sun, CloudRain, Wind } from 'lucide-react';
import { summarizeWeatherAlerts } from '@/ai/flows/summarize-weather-alerts';
import { useToast } from '@/hooks/use-toast';

// A mock function to simulate fetching raw weather data
const getRawWeatherData = async (location: string) => {
    // In a real app, this would call a weather API
    await new Promise(res => setTimeout(res, 500));
    const forecasts = [
        "Expect sunny skies with a high of 32°C. Winds from SW at 15 km/h.",
        "Partly cloudy with a 30% chance of afternoon showers. Low of 22°C.",
        "Heavy rainfall warning issued for tomorrow. Potential for flooding in low-lying areas. 50-75mm expected.",
        "Strong winds gusting up to 60 km/h expected overnight. Secure loose objects."
    ];
    return `Location: ${location}. Data: ${forecasts[Math.floor(Math.random() * forecasts.length)]}`;
}

export function WeatherCard() {
  const [location, setLocation] = useState('My Farm');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchWeatherSummary = async (loc: string) => {
    if(!loc) return;
    setIsLoading(true);
    setSummary('');
    try {
      const rawWeatherData = await getRawWeatherData(loc);
      const result = await summarizeWeatherAlerts({ rawWeatherData, location: loc });
      setSummary(result.summary);
    } catch (error) {
      console.error('Error getting weather summary:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to get weather data. Please try again.",
      });
    }
    setIsLoading(false);
  }

  useEffect(() => {
    fetchWeatherSummary('My Farm');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchWeatherSummary(location);
  };
  
  const getWeatherIcon = () => {
    if (!summary) return <Sun className="h-10 w-10 text-yellow-500" />;
    const lowerSummary = summary.toLowerCase();
    if (lowerSummary.includes('rain') || lowerSummary.includes('shower') || lowerSummary.includes('flood')) {
        return <CloudRain className="h-10 w-10 text-blue-500" />;
    }
    if (lowerSummary.includes('wind') || lowerSummary.includes('gust')) {
        return <Wind className="h-10 w-10 text-gray-500" />;
    }
    return <Sun className="h-10 w-10 text-yellow-500" />;
  }

  return (
    <Card className="shadow-lg w-full">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Weather Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex items-end gap-2 mb-4">
          <div className="flex-grow space-y-1">
            <Label htmlFor="location">Location</Label>
            <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>
          <Button type="submit" disabled={isLoading || !location}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Get Weather
          </Button>
        </form>

        <div className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-lg min-h-[100px]">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="flex items-start gap-4">
                <div className="mt-1">{getWeatherIcon()}</div>
                <div className="flex-1">
                    <h3 className="font-semibold text-lg text-primary mb-1">Summary for {location}</h3>
                    <p className="text-foreground">{summary || "No weather data available."}</p>
                </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
