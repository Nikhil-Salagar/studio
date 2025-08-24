
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AppLogo } from "@/components/app-logo";
import { useLanguage } from "@/lib/i18n";

export default function WelcomePage() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md mx-auto shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <AppLogo />
          </div>
          <CardTitle className="text-3xl font-headline">{t('welcomePage.title')}</CardTitle>
          <CardDescription>
            {t('welcomePage.description')}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
            <p className="mb-6">{t('welcomePage.message')}</p>
            <Button asChild className="w-full text-lg py-6">
              <Link href="/dashboard">
                {t('welcomePage.goToDashboard')}
              </Link>
            </Button>
        </CardContent>
      </Card>
    </div>
  );
}
