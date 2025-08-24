
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2, Sparkles } from 'lucide-react';
import { askAi } from '@/ai/flows/ask-ai';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/lib/i18n';

export function AskAiCard() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { language, t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question) return;

    setIsLoading(true);
    setAnswer('');
    try {
      const result = await askAi({ question, language });
      setAnswer(result.answer);
    } catch (error) {
      console.error('Error getting answer:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to get an answer. Please try again.",
      });
    }
    setIsLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
            <Sparkles className="h-6 w-6 text-primary" />
            <CardTitle className="font-headline text-2xl">{t('askAICard.title')}</CardTitle>
        </div>
        <CardDescription>{t('askAICard.description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid w-full gap-1.5">
            <Label htmlFor="question">{t('askAICard.yourQuestion')}</Label>
            <Textarea
              placeholder={t('askAICard.placeholder')}
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              rows={4}
            />
          </div>
          <Button type="submit" disabled={isLoading || !question}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {t('askAICard.buttonText')}
          </Button>
        </form>

        {answer && (
          <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <h3 className="font-semibold text-lg text-primary mb-2">{t('communityQACard.resultsTitle')}</h3>
            <p className="text-foreground whitespace-pre-wrap">{answer}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
