import { PageHeader } from '@/components/page-header';
import { Home, BookText } from 'lucide-react';
import { AskAiCard } from '@/components/features/ask-ai-card';
import { blogPosts } from '@/app/blog/posts';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function DashboardHomePage() {
  const latestPosts = blogPosts.slice(0, 3);

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
        <div className="flex items-center gap-4 mb-6">
            <div className="bg-primary/10 p-2.5 rounded-lg border">
                <BookText className="h-6 w-6 text-primary" />
            </div>
            <div>
                <h2 className="text-3xl font-headline tracking-tight text-foreground">Latest from the Blog</h2>
                <p className="text-muted-foreground mt-1 text-sm">Read our latest articles on modern agriculture.</p>
            </div>
        </div>
        <div className="space-y-6">
            {latestPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="block hover:no-underline">
                <Card className="hover:border-primary/50 hover:shadow-lg transition-all duration-300">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl text-primary">{post.title}</CardTitle>
                    <CardDescription className="pt-2">{post.description}</CardDescription>
                </CardHeader>
                </Card>
            </Link>
            ))}
        </div>
      </div>

    </div>
  );
}
