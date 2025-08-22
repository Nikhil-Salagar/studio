import { MetadataRoute } from 'next'
import { blogPosts } from '@/app/blog/posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = 'https://ns-agri-ai.com';

  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/privacy',
    '/signup',
    '/dashboard',
    '/dashboard/my-farm',
    '/dashboard/community',
    '/dashboard/finance',
    '/dashboard/ask-ai',
    '/dashboard/profile',
    '/blog'
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as 'monthly',
    priority: route === '' ? 1.0 : 0.8,
  }));
  
  const blogRoutes = blogPosts.map(post => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as 'weekly',
    priority: 0.9,
  }));

  return [...staticRoutes, ...blogRoutes];
}
