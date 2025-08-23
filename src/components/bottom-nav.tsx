
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Sprout, Users, Landmark, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', label: 'Home', icon: Home },
  { href: '/dashboard/my-farm', label: 'My Farm', icon: Sprout },
  { href: '/dashboard/community', label: 'Community', icon: Users },
  { href: '/dashboard/finance', label: 'Finance', icon: Landmark },
  { href: '/dashboard/admin', label: 'Admin', icon: Shield },
];

export function BottomNav() {
  const pathname = usePathname();

  const checkActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === href;
    }
    // Make admin active only on its page, not children
    if (href === '/dashboard/admin') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };


  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="mx-auto mb-4 max-w-lg w-full px-4">
        <div className="bg-card/80 backdrop-blur-lg border shadow-xl shadow-black/10 rounded-full">
            <nav className="flex items-center justify-around p-1.5">
            {navItems.map((item) => {
                const isActive = checkActive(item.href);
                return (
                <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                    'flex flex-col items-center justify-center text-center gap-1 p-2 rounded-full transition-colors duration-300 w-16 h-16',
                    isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted/50'
                    )}
                >
                    <item.icon className="h-5 w-5" />
                    <span className="text-xs font-medium">{item.label}</span>
                </Link>
                );
            })}
            </nav>
        </div>
      </div>
    </div>
  );
}
