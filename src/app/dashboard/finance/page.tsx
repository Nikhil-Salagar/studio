
'use client';

import { PageHeader } from '@/components/page-header';
import { Landmark, IndianRupee, MessageCircleQuestion } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExpenseTrackerCard } from '@/components/features/expense-tracker-card';
import { FinancialAssistanceCard } from '@/components/features/financial-assistance-card';
import { useLanguage } from '@/lib/i18n';

export default function FinancePage() {
  const { t } = useLanguage();
  return (
    <div>
      <PageHeader
        title={t('financePage.title')}
        description={t('financePage.description')}
        icon={Landmark}
      />
      <Tabs defaultValue="tracker" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="tracker" className="gap-2">
            <IndianRupee className="h-4 w-4" />
            {t('financePage.tabTracker')}
          </TabsTrigger>
          <TabsTrigger value="assistance" className="gap-2">
            <MessageCircleQuestion className="h-4 w-4" />
            {t('financePage.tabAssistant')}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tracker" className="mt-4">
          <ExpenseTrackerCard />
        </TabsContent>
        <TabsContent value="assistance" className="mt-4">
          <FinancialAssistanceCard />
        </TabsContent>
      </Tabs>
    </div>
  );
}
