
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AppLogo } from "@/components/app-logo";
import { ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      router.replace('/dashboard');
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('isLoggedIn', 'true');
    router.push('/dashboard');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
       <div className="mb-8 text-center">
            <Link href="/blog">
                <Button variant="outline" size="lg" className="text-lg animate-pulse">
                    Visit Our Blog <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
            </Link>
        </div>
      <Card className="w-full max-w-md mx-auto shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <AppLogo />
          </div>
          <CardTitle className="text-3xl font-headline">Welcome Back!</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="farmer@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full text-lg py-6">
              Login
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline text-primary font-semibold hover:text-primary/80">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
