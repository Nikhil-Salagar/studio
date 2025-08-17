import { PageHeader } from '@/components/page-header';
import { BarChart3 } from 'lucide-react';
import { MarketPriceCard } from '@/components/features/market-price-card';

export default function MarketPage() {
  return (
    <div>
      <PageHeader
        title="Market Prices"
        description="Get the latest market intelligence for your crops."
        icon={BarChart3}
      />
      <MarketPriceCard />
    </div>
  );
}
