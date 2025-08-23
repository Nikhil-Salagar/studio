
"use client";

import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/page-header';
import { ArrowLeft, Edit } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { blogPosts, type BlogPost } from '@/app/blog/posts';
import { notFound, useParams, useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { getGoogleDriveImageUrl } from '@/lib/utils';

const STORAGE_KEY = 'blogPostsData';

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const { slug } = params;
  const { toast } = useToast();
  
  const [post, setPost] = useState<BlogPost | undefined>(undefined);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    try {
      const storedData = localStorage.getItem(STORAGE_KEY);
      const allPosts = storedData ? JSON.parse(storedData) : blogPosts;
      const currentPost = allPosts.find((p: BlogPost) => p.slug === slug);
      
      if (currentPost) {
        setPost(currentPost);
        setTitle(currentPost.title);
        setDescription(currentPost.description);
        setImageUrl(currentPost.imageUrl || '');
      } else {
        // Fallback for when localStorage is empty or post not found
        const staticPost = blogPosts.find(p => p.slug === slug);
        if (staticPost) {
          setPost(staticPost);
          setTitle(staticPost.title);
          setDescription(staticPost.description);
          setImageUrl(staticPost.imageUrl || '');
        } else {
          notFound();
        }
      }
    } catch (error) {
      console.error("Failed to parse blog post data from localStorage", error);
      const staticPost = blogPosts.find(p => p.slug === slug);
      if (staticPost) {
        setPost(staticPost);
        setTitle(staticPost.title);
        setDescription(staticPost.description);
        setImageUrl(staticPost.imageUrl || '');
      } else {
        notFound();
      }
    }
  }, [slug]);
  
  if (!post) {
    // Render a loading state or nothing while the effect runs.
    return null;
  }
  
  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawUrl = e.target.value;
    const directUrl = getGoogleDriveImageUrl(rawUrl);
    setImageUrl(directUrl);
  };

  const handleSaveChanges = () => {
    try {
        const storedData = localStorage.getItem(STORAGE_KEY);
        // Initialize with static data if localStorage is empty
        const allPosts = storedData ? JSON.parse(storedData) : [...blogPosts];

        const updatedPosts = allPosts.map((p: BlogPost) => 
            p.slug === slug 
            ? { ...p, title, description, imageUrl: getGoogleDriveImageUrl(imageUrl) }
            : p
        );

        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPosts));

        toast({
            title: "Changes Saved!",
            description: "Your blog post has been updated.",
        });
        router.push('/dashboard/admin');

    } catch(error) {
        console.error("Failed to save changes", error);
        toast({
            variant: "destructive",
            title: "Save Failed",
            description: "Could not save your changes. Please try again.",
        });
    }
  };

  return (
    <div>
      <div className="mb-4">
        <Button variant="outline" onClick={() => router.push('/dashboard/admin')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Admin Panel
        </Button>
      </div>

      <PageHeader
        title="Edit Post"
        description={`You are currently editing "${post.title}"`}
        icon={Edit}
      />
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Post Content</CardTitle>
          <CardDescription>Update the details for your blog post.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Post Title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Post Description</Label>
            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={4}/>
          </div>
          
          <Separator />

          <div>
              <h3 className="text-lg font-medium">Post Image</h3>
              <p className="text-sm text-muted-foreground">Paste an image URL. Google Drive links will be converted automatically.</p>
           </div>
          
           <div className="space-y-4">
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input 
                  id="imageUrl" 
                  value={imageUrl} 
                  onChange={(e) => setImageUrl(e.target.value)}
                  onBlur={handleImageUrlChange}
                  placeholder="https://example.com/image.png or a Google Drive link"
                />
                
                {imageUrl && (
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden border bg-muted">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          src={imageUrl} 
                          alt="Image Preview" 
                          style={{width: '100%', height: '100%', objectFit: 'cover'}}
                          onError={(e) => (e.currentTarget.style.display = 'none')}
                        />
                    </div>
                )}
            </div>
          
          <Separator />

          <div className="flex justify-end">
            <Button onClick={handleSaveChanges}>Save Changes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
