
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, MessageSquare } from 'lucide-react';
import { answerFarmerQuestions } from '@/ai/flows/answer-farmer-questions';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/lib/i18n';
import { useTTS } from '@/hooks/use-tts';

export function CommunityQaCard() {
  const { language, setLanguage, t } = useLanguage();
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { isReading, readAloud } = useTTS();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question) return;

    setIsLoading(true);
    setAnswer('');
    try {
      const result = await answerFarmerQuestions({ question, language });
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
            <MessageSquare className="h-6 w-6 text-primary" />
            <CardTitle className="font-headline text-2xl">{t('communityQACard.title')}</CardTitle>
        </div>
        <CardDescription>{t('communityQACard.description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid w-full gap-1.5">
            <Label htmlFor="question">{t('communityQACard.yourQuestion')}</Label>
            <Textarea
              placeholder={t('communityQACard.placeholder')}
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              rows={4}
            />
          </div>
          <div className="w-full md:w-1/2">
            <Label htmlFor="language">{t('common.language')}</Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger id="language">
                <SelectValue placeholder={t('common.language')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="English">{t('common.english')}</SelectItem>
                <SelectItem value="Hindi">{t('common.hindi')}</SelectItem>
                <SelectItem value="Kannada">{t('common.kannada')}</SelectItem>
                <SelectItem value="Marathi">{t('common.marathi')}</SelectItem>
                <SelectItem value="Tamil">{t('common.tamil')}</SelectItem>
                <SelectItem value="Telugu">{t('common.telugu')}</SelectItem>
                <SelectItem value="Malayalam">{t('common.malayalam')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" disabled={isLoading || !question}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {t('communityQACard.buttonText')}
          </Button>
        </form>

        {answer && (
          <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
             <h3 className="font-semibold text-lg text-primary mb-2">{t('communityQACard.resultsTitle')}</h3>
            <p className="text-foreground whitespace-pre-wrap">{answer}</p>
             <Button 
                variant="outline" 
                size="sm"
                onClick={() => readAloud(answer)} 
                disabled={isReading}
                className="mt-4"
              >
                {isReading ? '🔊 Reading…' : '🔊 Listen'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
