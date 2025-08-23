
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AppLogo } from "@/components/app-logo";

export default function WelcomePage() {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md mx-auto shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <AppLogo />
          </div>
          <CardTitle className="text-3xl font-headline">Welcome to NS Agri AI</CardTitle>
          <CardDescription>
            Your AI-powered partner in modern agriculture.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
            <p className="mb-6">All features are publicly accessible. Proceed to the dashboard to get started.</p>
            <Button asChild className="w-full text-lg py-6">
              <Link href="/dashboard">
                Go to Dashboard
              </Link>
            </Button>
        </CardContent>
      </Card>
    </div>
  );
}
