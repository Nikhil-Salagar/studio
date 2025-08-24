
'use client';

import { PageHeader } from '@/components/page-header';
import { Home, BookText, Languages } from 'lucide-react';
import { AskAiCard } from '@/components/features/ask-ai-card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/lib/i18n';

export default function DashboardHomePage() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div>
      <PageHeader
        title={t('dashboardHome.title')}
        description={t('dashboardHome.description')}
        icon={Home}
      />
      
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <Languages className="h-6 w-6 text-primary"/>
            <Label htmlFor="language-select" className="text-lg font-medium">{t('dashboardHome.selectLanguage')}</Label>
          </div>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger id="language-select" className="mt-2">
              <SelectValue placeholder={t('dashboardHome.selectLanguage')} />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="English">{t('common.english')}</SelectItem>
                <SelectItem value="Hindi">{t('common.hindi')}</SelectItem>
                <SelectItem value="Kannada">{t('common.kannada')}</SelectItem>
                <SelectItem value="Marathi">{t('common.marathi')}</SelectItem>
                <SelectItem value="Tamil">{t('common.tamil')}</SelectItem>
                <SelectItem value="Telugu">{t('common.telugu')}</SelectItem>
                <SelectItem value="Malayalam">{t('common.malayalam')}</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>


      <div className="mt-6">
        <AskAiCard />
      </div>

      <div className="mt-12">
        <Card>
            <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                         <div className="bg-primary/10 p-2.5 rounded-lg border hidden sm:block">
                            <BookText className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-headline tracking-tight text-foreground">{t('dashboardHome.readBlogTitle')}</h2>
                            <p className="text-muted-foreground mt-1 text-sm">{t('dashboardHome.readBlogDescription')}</p>
                        </div>
                    </div>
                    <Link href="/blog">
                        <Button>
                            {t('dashboardHome.viewAllPosts')}
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
      </div>

    </div>
  );
}
