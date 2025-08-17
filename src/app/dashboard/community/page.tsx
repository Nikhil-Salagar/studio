import { PageHeader } from '@/components/page-header';
import { Users } from 'lucide-react';
import { CommunityQaCard } from '@/components/features/community-qa-card';

export default function CommunityPage() {
  return (
    <div>
      <PageHeader
        title="Community Q&A"
        description="Connect with the community and get answers to your questions."
        icon={Users}
      />
      <CommunityQaCard />
    </div>
  );
}
