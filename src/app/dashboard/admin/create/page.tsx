
"use client";

import { useState } from 'react';
import { PageHeader } from '@/components/page-header';
import { ArrowLeft, Edit, PlusCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { blogPosts, type BlogPost } from '@/app/blog/posts';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { getGoogleDriveImageUrl } from '@/lib/utils';
import Image from 'next/image';

const STORAGE_KEY = 'blogPostsData';

export default function CreatePostPage() {
  const router = useRouter();
  const { toast } = useToast();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageUrl2, setImageUrl2] = useState('');

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // remove special chars
      .replace(/\s+/g, '-')           // replace spaces with -
      .replace(/-+/g, '-');          // replace multiple - with single -
  };
  
  const handleCreatePost = () => {
    if (!title) {
        toast({
            variant: "destructive",
            title: "Title is required",
            description: "Please enter a title for your blog post.",
        });
        return;
    }

    try {
        const storedData = localStorage.getItem(STORAGE_KEY);
        const allPosts: BlogPost[] = storedData ? JSON.parse(storedData) : [...blogPosts];

        const newSlug = generateSlug(title);
        
        // Check for duplicate slugs
        if (allPosts.some(p => p.slug === newSlug)) {
             toast({
                variant: "destructive",
                title: "Title already exists",
                description: "A post with this title already exists. Please choose a different title.",
            });
            return;
        }

        const newPost: BlogPost = {
            slug: newSlug,
            title,
            description,
            imageUrl,
            imageUrl2
        };

        const updatedPosts = [newPost, ...allPosts];

        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPosts));

        toast({
            title: "Post Created!",
            description: "Your new blog post has been saved.",
        });
        router.push('/dashboard/admin');

    } catch(error) {
        console.error("Failed to create post", error);
        toast({
            variant: "destructive",
            title: "Creation Failed",
            description: "Could not create your post. Please try again.",
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
        title="Create New Post"
        description="Fill in the details for your new blog article."
        icon={PlusCircle}
      />
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Post Content</CardTitle>
          <CardDescription>Enter the details for your new blog post.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Post Title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Post Description (for preview cards)</Label>
            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={4}/>
          </div>
          
          <Separator />

          <div>
              <h3 className="text-lg font-medium">Post Images</h3>
              <p className="text-sm text-muted-foreground">Paste image URLs. Google Drive links will be converted automatically.</p>
           </div>
          
           <div className="space-y-4">
                <Label htmlFor="imageUrl">Image URL 1 (Main Image)</Label>
                <Input 
                  id="imageUrl" 
                  value={imageUrl} 
                  onChange={(e) => setImageUrl(e.target.value)}
                  onBlur={(e) => setImageUrl(getGoogleDriveImageUrl(e.target.value))}
                  placeholder="https://example.com/image.png or a Google Drive link"
                />
                
                {imageUrl && (
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden border bg-muted">
                        <Image 
                          src={imageUrl} 
                          alt="Image Preview 1" 
                          layout="fill"
                          objectFit="cover"
                          unoptimized
                          onError={(e) => (e.currentTarget.style.display = 'none')}
                        />
                    </div>
                )}
            </div>

            <div className="space-y-4">
                <Label htmlFor="imageUrl2">Image URL 2 (Body Image)</Label>
                <Input 
                  id="imageUrl2" 
                  value={imageUrl2} 
                  onChange={(e) => setImageUrl2(e.target.value)}
                  onBlur={(e) => setImageUrl2(getGoogleDriveImageUrl(e.target.value))}
                  placeholder="https://example.com/image.png or a Google Drive link"
                />
                
                {imageUrl2 && (
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden border bg-muted">
                        <Image 
                          src={imageUrl2} 
                          alt="Image Preview 2" 
                          layout="fill"
                          objectFit="cover"
                          unoptimized
                          onError={(e) => (e.currentTarget.style.display = 'none')}
                        />
                    </div>
                )}
            </div>
          
          <Separator />

          <div className="flex justify-end">
            <Button onClick={handleCreatePost}>Create Post</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
