
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AppLogo } from "@/components/app-logo";

export default function SignupPage() {

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md mx-auto shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <AppLogo />
          </div>
          <CardTitle className="text-3xl font-headline">Welcome</CardTitle>
          <CardDescription>
            Join our community of modern farmers.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
            <Button asChild className="w-full text-lg py-6">
                <Link href="/dashboard">
                    Proceed to Dashboard
                </Link>
            </Button>
          <div className="mt-4 text-center text-sm">
            You can directly access all features of the app.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
