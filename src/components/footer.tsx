
'use client';

import Link from "next/link";
import { AppLogo } from "./app-logo";
import { useLanguage } from "@/lib/i18n";

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-muted/50 border-t mt-auto">
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <AppLogo />
            <p className="text-muted-foreground">
              {t('footer.tagline')}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('footer.dashboard')}
                </Link>
              </li>
              <li>
                <Link href="/dashboard/my-farm" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('footer.myFarm')}
                </Link>
              </li>
              <li>
                <Link href="/dashboard/community" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('footer.community')}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">{t('footer.company')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('footer.aboutUs')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('footer.contactUs')}
                </Link>
              </li>
               <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('footer.blog')}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">{t('footer.legal')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('footer.privacyPolicy')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-4 text-center text-muted-foreground text-sm">
          {t('footer.copyright', { year: new Date().getFullYear() })}
        </div>
      </div>
    </footer>
  );
}
