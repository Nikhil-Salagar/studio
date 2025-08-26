
'use client';

import { PageHeader } from '@/components/page-header';
import { Shield, PlusCircle } from 'lucide-react';
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
import { useLanguage } from '@/lib/i18n';

const STORAGE_KEY = 'blogPostsData';
const ADMIN_PASSWORD = 'Salagar@123';
const AUTH_KEY = 'isAdminAuthenticated';

export default function AdminPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { t } = useLanguage();
  
  const [currentPosts, setCurrentPosts] = useState<BlogPost[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined);
  const [passwordInput, setPasswordInput] = useState('');
  const [postToDelete, setPostToDelete] = useState<BlogPost | null>(null);

  useEffect(() => {
    try {
      const authStatus = sessionStorage.getItem(AUTH_KEY);
      if (authStatus === 'true') {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
       console.error('Session storage not available.');
       setIsAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      try {
        const storedData = localStorage.getItem(STORAGE_KEY);
        if (storedData) {
          setCurrentPosts(JSON.parse(storedData));
        } else {
          // If no data in local storage, use the initial posts and save them.
          setCurrentPosts(blogPosts);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(blogPosts));
        }
      } catch (error) {
        console.error("Failed to parse blog posts from localStorage", error);
        setCurrentPosts(blogPosts);
      }
    }
  }, [isAuthenticated]);
  
  const handlePasswordSubmit = () => {
    if (passwordInput === ADMIN_PASSWORD) {
      try {
        sessionStorage.setItem(AUTH_KEY, 'true');
        setIsAuthenticated(true);
        toast({
            title: 'Access Granted',
            description: 'Welcome to the admin panel.',
        });
      } catch (error) {
        console.error('Session storage not available.');
        toast({
            variant: 'destructive',
            title: 'Login Failed',
            description: 'Could not access session storage. Please enable cookies and try again.',
        });
      }
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

  const handleDeleteClick = (post: BlogPost) => {
    setPostToDelete(post);
  };

  const handleConfirmDelete = () => {
    if (!postToDelete) return;

    try {
        const updatedPosts = currentPosts.filter(p => p.slug !== postToDelete.slug);
        setCurrentPosts(updatedPosts);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPosts));

        toast({
            title: "Post Deleted",
            description: `"${postToDelete.title}" has been successfully deleted.`,
        });
    } catch(error) {
        console.error("Failed to delete post", error);
        toast({
            variant: "destructive",
            title: "Deletion Failed",
            description: "Could not delete the post. Please try again.",
        });
    } finally {
        setPostToDelete(null);
    }
  };


  const handleCancelPrompt = () => {
      router.back();
  }
  
  if (isAuthenticated === undefined) {
    return null; // Or a loading spinner while checking auth status
  }

  if (!isAuthenticated) {
    return (
       <AlertDialog open={true}>
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
            <Button variant="outline" onClick={handleCancelPrompt}>{t('common.cancel')}</Button>
            <Button onClick={handlePasswordSubmit}>{t('common.continue')}</Button>
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
           <Link href="/dashboard/admin/create">
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4"/>
                    Create New Post
                </Button>
           </Link>
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
                      <Button variant="outline" size="sm" className="mr-2">{t('common.edit')}</Button>
                    </Link>
                    <Button variant="destructive" size="sm" onClick={() => handleDeleteClick(post)}>{t('common.delete')}</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {postToDelete && (
         <AlertDialog open={!!postToDelete} onOpenChange={() => setPostToDelete(null)}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the post titled "{postToDelete.title}".
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{t('common.cancel')}</AlertDialogCancel>
                <AlertDialogAction onClick={handleConfirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                    {t('common.delete')}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
