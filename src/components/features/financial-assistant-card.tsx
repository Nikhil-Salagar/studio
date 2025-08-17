'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Handshake } from 'lucide-react';
import { getFinancialAdvice, type GetFinancialAdviceOutput } from '@/ai/flows/get-financial-advice';
import { useToast } from '@/hooks/use-toast';

type Topic = 'loan' | 'subsidy' | 'insurance';

export function FinancialAssistantCard() {
  const [topic, setTopic] = useState<Topic>('loan');
  const [query, setQuery] = useState('');
  const [language, setLanguage] = useState('English');
  const [result, setResult] = useState<GetFinancialAdviceOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const getPlaceholderText = () => {
    switch (topic) {
      case 'loan':
        return 'e.g., Which bank loan is best for dairy farming?';
      case 'subsidy':
        return 'e.g., Are there any subsidies for solar water pumps?';
      case 'insurance':
        return 'e.g., Crop: Rice, Area: 5 acres. What is the best insurance?';
      default:
        return '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    
    setIsLoading(true);
    setResult(null);
    try {
      const response = await getFinancialAdvice({ topic, query, language });
      setResult(response);
    } catch (error) {
      console.error('Error getting financial advice:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to get financial advice. Please try again.",
      });
    }
    setIsLoading(false);
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Handshake className="h-6 w-6 text-primary" />
          <CardTitle className="font-headline text-2xl">Financial Assistant</CardTitle>
        </div>
        <CardDescription>Get expert advice on loans, subsidies, and insurance.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="topic">I need advice about</Label>
              <Select value={topic} onValueChange={(v) => setTopic(v as Topic)} required>
                <SelectTrigger id="topic">
                  <SelectValue placeholder="Select a topic" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="loan">Loans</SelectItem>
                  <SelectItem value="subsidy">Subsidies</SelectItem>
                  <SelectItem value="insurance">Insurance</SelectItem>
                </SelectContent>
              </Select>
            </div>
             <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Hindi">Hindi</SelectItem>
                    <SelectItem value="Spanish">Spanish</SelectItem>
                    <SelectItem value="French">French</SelectItem>
                  </SelectContent>
                </Select>
              </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="query">Details / Question</Label>
            <Textarea
              id="query"
              placeholder={getPlaceholderText()}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              rows={4}
              required
            />
          </div>
          <Button type="submit" disabled={isLoading || !query}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Get Advice
          </Button>
        </form>

        {result && (
          <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <h3 className="font-headline text-xl text-foreground mb-2">Your Financial Advice:</h3>
            <p className="text-foreground whitespace-pre-wrap">{result.advice}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
