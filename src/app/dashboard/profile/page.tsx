"use client";

import { PageHeader } from '@/components/page-header';
import { User, LogOut } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    router.push('/');
  };
  
  return (
    <div>
      <PageHeader
        title="My Profile"
        description="Manage your account details and settings."
        icon={User}
      />
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle className="font-headline text-2xl">Account Information</CardTitle>
                <CardDescription>View and edit your personal information.</CardDescription>
            </div>
            <Button variant="outline" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4"/>
                Logout
            </Button>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                    <AvatarImage src="https://placehold.co/100x100.png" alt="User" data-ai-hint="profile picture" />
                    <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                    <h3 className="text-xl font-semibold">John Doe</h3>
                    <p className="text-muted-foreground">Joined on June 2024</p>
                </div>
            </div>

            <Separator/>
            
            <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" defaultValue="John Doe" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" defaultValue="farmer@example.com" disabled/>
                    </div>
                </div>
                <Button>Save Changes</Button>
            </form>

            <Separator/>

            <div>
                <h3 className="text-lg font-semibold text-destructive">Delete Account</h3>
                <p className="text-sm text-muted-foreground mb-2">Permanently delete your account and all associated data. This action cannot be undone.</p>
                <Button variant="destructive">Delete My Account</Button>
            </div>

        </CardContent>
      </Card>
    </div>
  );
}
