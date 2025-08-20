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

export function CommunityQaCard() {
  const [question, setQuestion] = useState('');
  const [language, setLanguage] = useState('English');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

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
            <CardTitle className="font-headline text-2xl">Community Q&A</CardTitle>
        </div>
        <CardDescription>Ask a question in your language and get an AI-powered answer.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid w-full gap-1.5">
            <Label htmlFor="question">Your Question</Label>
            <Textarea
              placeholder="e.g., How can I improve my wheat yield?"
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              rows={4}
            />
          </div>
          <div className="w-full md:w-1/2">
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
          <Button type="submit" disabled={isLoading || !question}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Get Answer
          </Button>
        </form>

        {answer && (
          <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <h3 className="font-semibold text-lg text-primary mb-2">AI Generated Answer:</h3>
            <p className="text-foreground whitespace-pre-wrap">{answer}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
