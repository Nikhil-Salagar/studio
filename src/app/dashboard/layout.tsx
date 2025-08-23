
import { AuthWrapper } from '@/components/auth-wrapper';
import { BottomNav } from '@/components/bottom-nav';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthWrapper>
      <div className="flex flex-col flex-grow min-h-screen">
        <div className="flex-1 p-4 sm:p-6 lg:p-8 mb-20">
          {children}
        </div>
        <BottomNav />
      </div>
    </AuthWrapper>
  );
}
