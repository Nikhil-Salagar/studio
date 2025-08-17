'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { AppLogo } from '@/components/app-logo';
import { Home, BarChart3, Sprout, Users, User, LogOut, Landmark, Sparkles, PanelLeft } from 'lucide-react';
import { Button } from './ui/button';

const navItems = [
  { href: '/dashboard', label: 'Home', icon: Home },
  { href: '/dashboard/my-farm', label: 'My Farm', icon: Sprout },
  { href: '/dashboard/market', label: 'Market Prices', icon: BarChart3 },
  { href: '/dashboard/finance', label: 'Finance', icon: Landmark },
  { href: '/dashboard/community', label: 'Community', icon: Users },
  { href: '/dashboard/ask-ai', label: 'Ask AI', icon: Sparkles },
  { href: '/dashboard/profile', label: 'Profile', icon: User },
];

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    router.push('/');
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center justify-between">
            <AppLogo />
            <SidebarTrigger asChild className="md:hidden">
                <Button size="icon" variant="ghost">
                    <PanelLeft />
                    <span className="sr-only">Toggle Menu</span>
                </Button>
            </SidebarTrigger>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
             <SidebarMenuItem key={item.href}>
                <Link href={item.href} passHref>
                  <SidebarMenuButton
                    isActive={pathname.startsWith(item.href) && (item.href !== '/dashboard' || pathname === '/dashboard')}
                    tooltip={item.label}
                    className="justify-start"
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="text-base">{item.label}</span>
                  </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <Button variant="ghost" className="w-full justify-start gap-2" onClick={handleLogout}>
          <LogOut className="h-5 w-5" />
          <span className="text-base">Logout</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
