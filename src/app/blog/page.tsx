
'use client';

import { PageHeader } from '@/components/page-header';
import { BookText } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';
import { blogPosts, type BlogPost } from './posts';
import { useState, useEffect } from 'react';

const STORAGE_KEY = 'blogPostsData';

export default function BlogIndexPage() {
  const [currentPosts, setCurrentPosts] = useState<BlogPost[]>(blogPosts);

  useEffect(() => {
    try {
      const storedData = localStorage.getItem(STORAGE_KEY);
      if (storedData) {
        setCurrentPosts(JSON.parse(storedData));
      }
    } catch (error) {
      console.error("Failed to parse blog posts from localStorage", error);
      // Fallback to static data if parsing fails
      setCurrentPosts(blogPosts);
    }
  }, []);

  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <PageHeader
        title="Our Blog"
        description="Stay updated with the latest news, tips, and insights on modern agriculture."
        icon={BookText}
      />
      <div className="space-y-6">
        {currentPosts.map((post) => (
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
