import { PageHeader } from '@/components/page-header';
import { BookText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';
import { blogPosts } from './posts';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Blog | NS Agri AI',
    description: 'Read the latest articles and insights on AI in agriculture, smart farming techniques, and how NS Agri AI is revolutionizing the industry.',
    keywords: ['NS Agri AI Blog', 'AI in Agriculture', 'Smart Farming', 'AgriTech Insights', 'Farming Technology'],
};

export default function BlogIndexPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <PageHeader
        title="Our Blog"
        description="Stay updated with the latest news, tips, and insights on modern agriculture."
        icon={BookText}
      />
      <div className="space-y-6">
        {blogPosts.map((post) => (
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
  );
}
