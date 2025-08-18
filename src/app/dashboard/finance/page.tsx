import { PageHeader } from '@/components/page-header';
import { Landmark, IndianRupee, LineChart, MessageCircleQuestion } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExpenseTrackerCard } from '@/components/features/expense-tracker-card';
import { ProfitabilityForecastCard } from '@/components/features/profitability-forecast-card';
import { FinancialAssistanceCard } from '@/components/features/financial-assistance-card';

export default function FinancePage() {
  return (
    <div>
      <PageHeader
        title="Finance"
        description="Manage your farm's finances and get AI-powered insights."
        icon={Landmark}
      />
      <Tabs defaultValue="tracker" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tracker" className="gap-2">
            <IndianRupee className="h-4 w-4" />
            Tracker
          </TabsTrigger>
          <TabsTrigger value="forecast" className="gap-2">
            <LineChart className="h-4 w-4" />
            Forecast
          </TabsTrigger>
          <TabsTrigger value="assistance" className="gap-2">
            <MessageCircleQuestion className="h-4 w-4" />
            Assistant
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tracker" className="mt-4">
          <ExpenseTrackerCard />
        </TabsContent>
        <TabsContent value="forecast" className="mt-4">
          <ProfitabilityForecastCard />
        </TabsContent>
        <TabsContent value="assistance" className="mt-4">
          <FinancialAssistanceCard />
        </TabsContent>
      </Tabs>
    </div>
  );
}
