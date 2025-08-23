
'use client';

import { PageHeader } from '@/components/page-header';
import { Shield, PlusCircle, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { blogPosts, type BlogPost } from '@/app/blog/posts';
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
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const STORAGE_KEY = 'blogPostsData';
const ADMIN_PASSWORD = 'Salagar@123';
const AUTH_KEY = 'isAdminAuthenticated';

export default function AdminPage() {
  const router = useRouter();
  const { toast } = useToast();
  
  const [currentPosts, setCurrentPosts] = useState<BlogPost[]>(blogPosts);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isPromptOpen, setIsPromptOpen] = useState(true);
  const [passwordInput, setPasswordInput] = useState('');

  useEffect(() => {
    try {
      const authStatus = sessionStorage.getItem(AUTH_KEY);
      if (authStatus === 'true') {
        setIsAuthenticated(true);
        setIsPromptOpen(false);
      } else {
        setIsAuthenticated(false);
        setIsPromptOpen(true);
      }
    } catch (error) {
       console.error('Session storage not available.');
       setIsAuthenticated(false);
       setIsPromptOpen(true);
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    try {
      const storedData = localStorage.getItem(STORAGE_KEY);
      if (storedData) {
        setCurrentPosts(JSON.parse(storedData));
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(blogPosts));
      }
    } catch (error) {
      console.error("Failed to parse blog posts from localStorage", error);
      setCurrentPosts(blogPosts);
    }
  }, [isAuthenticated]);
  
  const handlePasswordSubmit = () => {
    if (passwordInput === ADMIN_PASSWORD) {
      try {
        sessionStorage.setItem(AUTH_KEY, 'true');
      } catch (error) {
        console.error('Session storage not available.');
      }
      setIsAuthenticated(true);
      setIsPromptOpen(false);
      setPasswordInput('');
    } else {
      toast({
        variant: 'destructive',
        title: 'Incorrect Password',
        description: 'Please try again.',
      });
      setPasswordInput('');
    }
  };

  const handleCancelPrompt = () => {
      setIsPromptOpen(false);
      router.back();
  }

  if (!isAuthenticated) {
    return (
       <AlertDialog open={isPromptOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Admin Access Required</AlertDialogTitle>
            <AlertDialogDescription>
              Please enter the password to access the admin panel.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-2">
            <Input 
              id="password"
              type="password"
              placeholder="Enter password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handlePasswordSubmit();
                }
              }}
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelPrompt}>Cancel</AlertDialogCancel>
            <Button onClick={handlePasswordSubmit}>Continue</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

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
              {currentPosts.map((post) => (
                <TableRow key={post.slug}>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell className="hidden md:table-cell">{post.description}</TableCell>
                  <TableCell className="text-right">
                    <Link href={`/dashboard/edit/${post.slug}`}>
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
