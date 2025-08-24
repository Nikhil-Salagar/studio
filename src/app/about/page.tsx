
'use client';

import { PageHeader } from '@/components/page-header';
import { Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AppLogo } from '@/components/app-logo';
import Image from 'next/image';
import { useLanguage } from '@/lib/i18n';

export default function AboutUsPage() {
  const { t } = useLanguage();
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <PageHeader
        title={t('aboutPage.title')}
        description={t('aboutPage.description')}
        icon={Info}
      />
      <Card>
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <AppLogo />
          </div>
          <CardTitle className="font-headline text-3xl">{t('aboutPage.missionTitle')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-lg text-foreground/80 leading-relaxed">
           <div className="relative w-full h-64 rounded-lg overflow-hidden border mb-6">
              <Image src="https://placehold.co/800x300.png" alt="Farm landscape" layout="fill" objectFit="cover" data-ai-hint="farm landscape" />
            </div>
          <p>
            {t('aboutPage.missionP1')}
          </p>
          <p>
            {t('aboutPage.missionP2')}
          </p>
           <p>
            {t('aboutPage.missionP3')}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
