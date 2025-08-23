import { PageHeader } from '@/components/page-header';
import { Home } from 'lucide-react';
import { AskAiCard } from '@/components/features/ask-ai-card';

export default function DashboardHomePage() {
  return (
    <div>
      <PageHeader
        title="Welcome, Farmer!"
        description="Get instant answers to your farming questions from our AI assistant."
        icon={Home}
      />
      
      <div className="mt-6">
        <AskAiCard />
      </div>
    </div>
  );
}
