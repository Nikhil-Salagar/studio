
import { PageHeader } from '@/components/page-header';
import { Shield, PlusCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { blogPosts } from '@/app/blog/posts';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AdminPage() {
  return (
    <div>
      <PageHeader
        title="Admin Panel"
        description="Manage your blog posts and other site content."
        icon={Shield}
      />
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="font-headline text-2xl">Blog Posts</CardTitle>
            <CardDescription>A list of all the articles on your site.</CardDescription>
          </div>
           <Button>
                <PlusCircle className="mr-2 h-4 w-4"/>
                Create New Post
            </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold">Title</TableHead>
                <TableHead className="font-semibold hidden md:table-cell">Description</TableHead>
                <TableHead className="text-right font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blogPosts.map((post) => (
                <TableRow key={post.slug}>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell className="hidden md:table-cell">{post.description}</TableCell>
                  <TableCell className="text-right">
                    <Link href={`/dashboard/admin/edit/${post.slug}`}>
                      <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                    </Link>
                    <Button variant="destructive" size="sm">Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
