'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LineChart, IndianRupee } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const sampleData = [
  { name: 'Jan', profit: 4000 },
  { name: 'Feb', profit: 3000 },
  { name: 'Mar', profit: 5000 },
  { name: 'Apr', profit: 4500 },
  { name: 'May', profit: 6000 },
  { name: 'Jun', profit: 5500 },
];

export function ProfitabilityForecastCard() {
  const [formData, setFormData] = useState({
    investment: '',
    expectedRevenue: '',
  });
  const [forecastedProfit, setForecastedProfit] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  
  const isFormValid = () => {
    return formData.investment && formData.expectedRevenue;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(!isFormValid()) return;
    const profit = parseFloat(formData.expectedRevenue) - parseFloat(formData.investment);
    setForecastedProfit(profit);
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-3">
          <LineChart className="h-6 w-6 text-primary" />
          <CardTitle className="font-headline text-2xl">Profitability Forecast</CardTitle>
        </div>
        <CardDescription>Estimate your potential profit based on investment and expected revenue.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="investment">Total Investment (₹)</Label>
              <Input id="investment" type="number" placeholder="e.g., 50000" value={formData.investment} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expectedRevenue">Expected Revenue (₹)</Label>
              <Input id="expectedRevenue" type="number" placeholder="e.g., 120000" value={formData.expectedRevenue} onChange={handleChange} required />
            </div>
          </div>
          <Button type="submit" disabled={!isFormValid()}>Forecast Profit</Button>
        </form>

        {forecastedProfit !== null && (
          <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg text-center">
            <h3 className="font-semibold text-lg text-primary mb-2">Forecasted Profit</h3>
            <p className={`text-3xl font-bold ${forecastedProfit >= 0 ? 'text-foreground' : 'text-red-600'}`}>
              ₹{forecastedProfit.toLocaleString()}
            </p>
          </div>
        )}

        <div className="mt-8">
            <h3 className="font-headline text-xl mb-4">Historical Profit Trend</h3>
            <div className="w-full h-64">
                <ResponsiveContainer>
                    <BarChart data={sampleData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis tickFormatter={(value) => `₹${value/1000}k`}/>
                        <Tooltip formatter={(value: number) => `₹${value.toLocaleString()}`} />
                        <Legend />
                        <Bar dataKey="profit" fill="hsl(var(--primary))" name="Profit" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>

      </CardContent>
    </Card>
  );
}
