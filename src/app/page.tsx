
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AppLogo } from "@/components/app-logo";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      router.replace('/dashboard');
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'nikhil1' && password === 'Salagar@123') {
        localStorage.setItem('isLoggedIn', 'true');
        router.push('/dashboard');
    } else {
        toast({
            variant: "destructive",
            title: "Login Failed",
            description: "Invalid username or password. Please try again.",
        });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md mx-auto shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <AppLogo />
          </div>
          <CardTitle className="text-3xl font-headline">Welcome Back!</CardTitle>
          <CardDescription>
            Enter your credentials below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" type="text" placeholder="Enter your username" required value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required value={password} placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
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
