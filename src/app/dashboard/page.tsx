import { PageHeader } from '@/components/page-header';
import { WeatherCard } from '@/components/features/weather-card';
import { Home } from 'lucide-react';

export default function DashboardHomePage() {
  return (
    <div>
      <PageHeader
        title="Welcome, Farmer!"
        description="Here's a quick overview of your farm's status."
        icon={Home}
      />
      <div className="grid grid-cols-1 gap-6">
        <WeatherCard />
      </div>
    </div>
  );
}
