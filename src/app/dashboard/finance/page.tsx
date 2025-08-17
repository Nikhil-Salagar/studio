import { PageHeader } from '@/components/page-header';
import { Landmark, LineChart, Handshake } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExpenseTrackerCard } from '@/components/features/expense-tracker-card';
import { ProfitabilityForecastCard } from '@/components/features/profitability-forecast-card';
import { FinancialAssistantCard } from '@/components/features/financial-assistant-card';

export default function FinancePage() {
  return (
    <div>
      <PageHeader
        title="Financial Tools"
        description="Manage your farm's finances, get forecasts, and receive expert advice."
        icon={Landmark}
      />
      <Tabs defaultValue="tracker" className="w-full">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3">
          <TabsTrigger value="tracker" className="gap-2">
            <LineChart className="h-4 w-4" />
            Expense & Income Tracker
          </TabsTrigger>
          <TabsTrigger value="forecast" className="gap-2">
            <LineChart className="h-4 w-4" />
            Profitability Forecast
          </TabsTrigger>
          <TabsTrigger value="assistance" className="gap-2">
            <Handshake className="h-4 w-4" />
            Financial Assistant
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tracker" className="mt-4">
          <ExpenseTrackerCard />
        </TabsContent>
        <TabsContent value="forecast" className="mt-4">
          <ProfitabilityForecastCard />
        </TabsContent>
        <TabsContent value="assistance" className="mt-4">
          <FinancialAssistantCard />
        </TabsContent>
      </Tabs>
    </div>
  );
}
