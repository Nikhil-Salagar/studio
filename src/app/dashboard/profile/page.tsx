
"use client";

import { PageHeader } from '@/components/page-header';
import { User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/lib/i18n';

export default function ProfilePage() {
  const { t } = useLanguage();
  
  return (
    <div>
      <PageHeader
        title={t('profilePage.title')}
        description={t('profilePage.description')}
        icon={User}
      />
      <Card>
        <CardHeader>
            <div>
                <CardTitle className="font-headline text-2xl">{t('profilePage.accountInfo')}</CardTitle>
                <CardDescription>{t('profilePage.viewAndEdit')}</CardDescription>
            </div>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                    <AvatarImage src="https://placehold.co/100x100.png" alt="User" data-ai-hint="profile picture" />
                    <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                    <h3 className="text-xl font-semibold">John Doe</h3>
                    <p className="text-muted-foreground">{t('profilePage.joined')}</p>
                </div>
            </div>

            <Separator/>
            
            <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">{t('profilePage.fullName')}</Label>
                        <Input id="name" defaultValue="John Doe" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="email">{t('profilePage.email')}</Label>
                        <Input id="email" type="email" defaultValue="farmer@example.com" disabled/>
                    </div>
                </div>
                <Button>{t('common.saveChanges')}</Button>
            </form>

            <Separator/>
            
            <div>
                <h3 className="text-lg font-semibold text-destructive">{t('profilePage.deleteAccount')}</h3>
                <p className="text-sm text-muted-foreground mb-2">{t('profilePage.deleteWarning')}</p>
                <Button variant="destructive">{t('profilePage.deleteButton')}</Button>
            </div>

        </CardContent>
      </Card>
    </div>
  );
}
