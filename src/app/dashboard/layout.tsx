import { BottomNav } from '@/components/bottom-nav';
import { AdBanner } from '@/components/ad-banner';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 p-4 sm:p-6 lg:p-8 mb-20">
        <AdBanner />
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
