import { PageHeader } from '@/components/page-header';
import { Sparkles } from 'lucide-react';
import { AskAiCard } from '@/components/features/ask-ai-card';

export default function AskAiPage() {
  return (
    <div>
      <PageHeader
        title="Ask AI"
        description="Get instant answers to your farming questions from our AI assistant."
        icon={Sparkles}
      />
      <AskAiCard />
    </div>
  );
}
