
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BarChart3, Sprout, Users, Sparkles, Landmark } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', label: 'Home', icon: Home },
  { href: '/dashboard/market', label: 'Market', icon: BarChart3 },
  { href: '/dashboard/my-farm', label: 'My Farm', icon: Sprout },
  { href: '/dashboard/finance', label: 'Finance', icon: Landmark },
  { href: '/dashboard/community', label: 'Community', icon: Users },
  { href: '/dashboard/ask-ai', label: 'Ask AI', icon: Sparkles },
];

export function BottomNav() {
  const pathname = usePathname();

  // A more flexible approach to finding the active item, especially for nested routes.
  const checkActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };


  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="mx-auto mb-4 max-w-lg w-full px-4">
        <div className="bg-card/80 backdrop-blur-lg border border-primary/20 shadow-lg rounded-full">
            <nav className="flex items-center justify-around p-2">
            {navItems.map((item) => {
                const isActive = checkActive(item.href);
                return (
                <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                    'flex flex-col items-center justify-center text-center gap-1 p-2 rounded-full transition-colors duration-200 w-16',
                    'hover:bg-primary/10 hover:text-primary',
                    isActive ? 'text-primary' : 'text-muted-foreground'
                    )}
                >
                    <item.icon className="h-6 w-6" />
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
