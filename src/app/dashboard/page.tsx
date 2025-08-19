import { PageHeader } from '@/components/page-header';
import { Home } from 'lucide-react';
import { CropSuggestionCard } from '@/components/features/crop-suggestion-card';
import { CommunityQaCard } from '@/components/features/community-qa-card';
import { AskAiCard } from '@/components/features/ask-ai-card';
import { AdBanner } from '@/components/ad-banner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DashboardHomePage() {
  return (
    <div>
      <PageHeader
        title="Welcome, Farmer!"
        description="Here's a quick overview of your farm's status."
        icon={Home}
      />
      <Card className="mb-6">
          <CardHeader>
            <CardTitle>Sample Content</CardTitle>
          </CardHeader>
          <CardContent>
            <p>This is some sample paragraph text placed above the ad banner to demonstrate the layout. The ad below is a test ad and will be responsive to the screen size.</p>
          </CardContent>
      </Card>

      <AdBanner />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="lg:col-span-2">
            <CropSuggestionCard />
        </div>
        <div className="lg:col-span-2">
            <CommunityQaCard />
        </div>
        <div className="lg:col-span-2">
            <AskAiCard />
        </div>
      </div>
    </div>
  );
}
