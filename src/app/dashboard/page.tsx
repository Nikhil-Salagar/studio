import { PageHeader } from '@/components/page-header';
import { Home, BookText } from 'lucide-react';
import { AskAiCard } from '@/components/features/ask-ai-card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function DashboardHomePage() {

  return (
    <div>
      <PageHeader
        title="Welcome, Farmer!"
        description="Get instant answers to your farming questions from our AI assistant."
        icon={Home}
      />
      
      <div className="mt-6">
        <AskAiCard />
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
