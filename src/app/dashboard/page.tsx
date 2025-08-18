import { PageHeader } from '@/components/page-header';
import { WeatherCard } from '@/components/features/weather-card';
import { Home } from 'lucide-react';
import { MarketPriceCard } from '@/components/features/market-price-card';
import { CropSuggestionCard } from '@/components/features/crop-suggestion-card';
import { CommunityQaCard } from '@/components/features/community-qa-card';
import { AskAiCard } from '@/components/features/ask-ai-card';
import { BannerAdCard } from '@/components/features/banner-ad-card';

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
            <BannerAdCard />
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
