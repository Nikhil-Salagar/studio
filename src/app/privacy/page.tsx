
'use client';

import { PageHeader } from '@/components/page-header';
import { Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/lib/i18n';

export default function PrivacyPolicyPage() {
  const { t } = useLanguage();
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <PageHeader
        title={t('privacyPage.title')}
        description={t('privacyPage.description')}
        icon={Shield}
      />
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl">{t('privacyPage.policyTitle')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-foreground/80 leading-relaxed">
          <p><strong>{t('privacyPage.lastUpdated')}:</strong> {new Date().toLocaleDateString()}</p>

          <p>{t('privacyPage.p1')}</p>

          <h2 className="font-headline text-2xl pt-4">{t('privacyPage.h2_1')}</h2>
          <p>{t('privacyPage.p2')}</p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li><strong>{t('privacyPage.li1_1').split(':')[0]}:</strong> {t('privacyPage.li1_1').split(':')[1]}</li>
            <li><strong>{t('privacyPage.li1_2').split(':')[0]}:</strong> {t('privacyPage.li1_2').split(':')[1]}</li>
            <li><strong>{t('privacyPage.li1_3').split(':')[0]}:</strong> {t('privacyPage.li1_3').split(':')[1]}</li>
          </ul>

          <h2 className="font-headline text-2xl pt-4">{t('privacyPage.h2_2')}</h2>
          <p>{t('privacyPage.p3')}</p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>{t('privacyPage.li2_1')}</li>
            <li>{t('privacyPage.li2_2')}</li>
            <li>{t('privacyPage.li2_3')}</li>
            <li>{t('privacyPage.li2_4')}</li>
            <li>{t('privacyPage.li2_5')}</li>
          </ul>

          <h2 className="font-headline text-2xl pt-4">{t('privacyPage.h2_3')}</h2>
          <p>{t('privacyPage.p4')}</p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>{t('privacyPage.li3_1')}</li>
            <li>{t('privacyPage.li3_2')}</li>
            <li>{t('privacyPage.li3_3')}</li>
          </ul>
          <p>
            {t('privacyPage.p5').split('Google Privacy Policy')[0]} <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary underline">Google Privacy Policy</a>.
          </p>
          
          <h2 className="font-headline text-2xl pt-4">{t('privacyPage.h2_4')}</h2>
          <p>{t('privacyPage.p6')}</p>
          
          <h2 className="font-headline text-2xl pt-4">{t('privacyPage.h2_5')}</h2>
          <p>
            {t('privacyPage.p7').split('support@nsagriai.com')[0]} <a href="mailto:support@nsagriai.com" className="text-primary underline">support@nsagriai.com</a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
