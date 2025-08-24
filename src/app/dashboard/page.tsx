
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
import { useEffect, useState } from 'react';

const LANGUAGE_STORAGE_KEY = 'appLanguage';

export default function DashboardHomePage() {
  const [language, setLanguage] = useState('English');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    try {
      const storedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (storedLanguage) {
        setLanguage(storedLanguage);
      }
    } catch (error) {
      console.error("Failed to get language from localStorage", error);
    }
    setIsMounted(true);
  }, []);

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
     try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, value);
    } catch (error) {
      console.error("Failed to set language in localStorage", error);
    }
  };

  if (!isMounted) {
    return null; // Or a loading spinner
  }

  return (
    <div>
      <PageHeader
        title="Welcome, Farmer!"
        description="Your AI-powered assistant for modern agriculture."
        icon={Home}
      />
      
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <Languages className="h-6 w-6 text-primary"/>
            <Label htmlFor="language-select" className="text-lg font-medium">Select Your Language</Label>
          </div>
          <Select value={language} onValueChange={handleLanguageChange}>
            <SelectTrigger id="language-select" className="mt-2">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Hindi">Hindi</SelectItem>
                <SelectItem value="Kannada">Kannada</SelectItem>
                <SelectItem value="Marathi">Marathi</SelectItem>
                <SelectItem value="Tamil">Tamil</SelectItem>
                <SelectItem value="Telugu">Telugu</SelectItem>
                <SelectItem value="Malayalam">Malayalam</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>


      <div className="mt-6">
        <AskAiCard language={language} />
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
                            <h2 className="text-2xl font-headline tracking-tight text-foreground">Read Our Blog</h2>
                            <p className="text-muted-foreground mt-1 text-sm">Get the latest tips and insights on modern agriculture.</p>
                        </div>
                    </div>
                    <Link href="/blog">
                        <Button>
                            View All Posts
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
      </div>

    </div>
  );
}
