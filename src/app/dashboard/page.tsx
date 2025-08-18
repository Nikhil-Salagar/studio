import { PageHeader } from '@/components/page-header';
import { WeatherCard } from '@/components/features/weather-card';
import { Home, Image } from 'lucide-react';
import { MarketPriceCard } from '@/components/features/market-price-card';
import { CropSuggestionCard } from '@/components/features/crop-suggestion-card';
import { CommunityQaCard } from '@/components/features/community-qa-card';
import { AskAiCard } from '@/components/features/ask-ai-card';
import { Card, CardContent } from '@/components/ui/card';

function BannerAdPlaceholder() {
  return (
    <Card className="shadow-lg w-full bg-muted/40 border-dashed">
      <CardContent className="p-6 flex flex-col items-center justify-center h-32 text-center">
        <Image className="h-8 w-8 text-muted-foreground mb-2" />
        <p className="text-sm text-muted-foreground">Banner Ad Space</p>
      </CardContent>
    </Card>
  );
}


export default function DashboardHomePage() {
  return (
    <div>
      <PageHeader
        title="Welcome, Farmer!"
        description="Here's a quick overview of your farm's status."
        icon={Home}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lg:col-span-2">
            <BannerAdPlaceholder/>
        </div>
        <WeatherCard />
        <MarketPriceCard />
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
