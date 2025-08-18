'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2, MessageCircleQuestion } from 'lucide-react';
import { getFinancialAssistance } from '@/ai/flows/get-financial-assistance';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

export function FinancialAssistanceCard() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [assistance, setAssistance] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query || !category) return;

    setIsLoading(true);
    setAssistance('');
    try {
      const result = await getFinancialAssistance({ query, category });
      setAssistance(result.assistance);
    } catch (error) {
      console.error('Error getting financial assistance:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to get assistance. Please try again.",
      });
    }
    setIsLoading(false);
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-3">
            <MessageCircleQuestion className="h-6 w-6 text-primary" />
            <CardTitle className="font-headline text-2xl">Financial Assistant</CardTitle>
        </div>
        <CardDescription>Get AI-powered guidance on loans, subsidies, and insurance.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
           <div className="space-y-2">
              <Label htmlFor="category">Assistance Category</Label>
              <Select onValueChange={setCategory} required>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Government Loans">Government Loans</SelectItem>
                  <SelectItem value="Government Subsidies">Government Subsidies</SelectItem>
                  <SelectItem value="Crop Insurance">Crop Insurance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          <div className="grid w-full gap-1.5">
            <Label htmlFor="query">Your Query</Label>
            <Textarea
              placeholder="e.g., How can I apply for a tractor loan? What documents are required?"
              id="query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              rows={4}
            />
          </div>
          <Button type="submit" disabled={isLoading || !query || !category}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Get Assistance
          </Button>
        </form>

        {assistance && (
          <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <h3 className="font-semibold text-lg text-primary mb-2">AI Generated Guidance:</h3>
            <p className="text-foreground whitespace-pre-wrap">{assistance}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
