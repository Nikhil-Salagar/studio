
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2, Sparkles, Volume2 } from 'lucide-react';
import { askAi } from '@/ai/flows/ask-ai';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/lib/i18n';
import { textToSpeech } from '@/ai/flows/text-to-speech';

export function AskAiCard() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isReading, setIsReading] = useState(false);
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
  
  const handleReadAloud = async () => {
    if (!answer) return;
    setIsReading(true);
    try {
      const { audio } = await textToSpeech({ text: answer });
      const audioPlayer = new Audio(audio);
      audioPlayer.play();
      audioPlayer.onended = () => setIsReading(false);
    } catch (error) {
      console.error('Error with text-to-speech:', error);
      toast({
        variant: "destructive",
        title: "Audio Error",
        description: "Could not play audio. Please try again.",
      });
      setIsReading(false);
    }
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
            <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-lg text-primary">{t('communityQACard.resultsTitle')}</h3>
                <Button variant="ghost" size="icon" onClick={handleReadAloud} disabled={isReading}>
                    {isReading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Volume2 className="h-5 w-5" />}
                    <span className="sr-only">Read aloud</span>
                </Button>
            </div>
            <p className="text-foreground whitespace-pre-wrap">{answer}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
