
'use client';

import { PageHeader } from '@/components/page-header';
import { Users } from 'lucide-react';
import { CommunityQaCard } from '@/components/features/community-qa-card';
import { useLanguage } from '@/lib/i18n';

export default function CommunityPage() {
  const { t } = useLanguage();
  return (
    <div>
      <PageHeader
        title={t('communityPage.title')}
        description={t('communityPage.description')}
        icon={Users}
      />
      <CommunityQaCard />
    </div>
  );
}
