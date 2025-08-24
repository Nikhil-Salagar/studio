
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AppLogo } from "@/components/app-logo";
import { useLanguage } from "@/lib/i18n";

export default function SignupPage() {
  const { t } = useLanguage();

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md mx-auto shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <AppLogo />
          </div>
          <CardTitle className="text-3xl font-headline">{t('signupPage.title')}</CardTitle>
          <CardDescription>
            {t('signupPage.description')}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
            <Button asChild className="w-full text-lg py-6">
                <Link href="/dashboard">
                    {t('signupPage.proceedToDashboard')}
                </Link>
            </Button>
          <div className="mt-4 text-center text-sm">
            {t('signupPage.message')}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
