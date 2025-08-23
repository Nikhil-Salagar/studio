
"use client";

import { useState } from 'react';
import { PageHeader } from '@/components/page-header';
import { ArrowLeft, Edit } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { blogPosts } from '@/app/blog/posts';
import { notFound, useParams, useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { getGoogleDriveImageUrl } from '@/lib/utils';

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const { slug } = params;
  const post = blogPosts.find((p) => p.slug === slug);
  const { toast } = useToast();

  const [title, setTitle] = useState(post?.title || '');
  const [description, setDescription] = useState(post?.description || '');
  const [imageUrl, setImageUrl] = useState(post?.imageUrl || '');
  
  if (!post) {
    notFound();
  }
  
  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const directUrl = getGoogleDriveImageUrl(e.target.value);
    setImageUrl(directUrl);
  };

  const handleSaveChanges = () => {
    // In a real application, you would make an API call here to save the changes.
    console.log({
        title,
        description,
        imageUrl,
    });
    toast({
      title: "Changes Saved!",
      description: "Your blog post has been updated (simulation).",
    });
    router.push('/dashboard/admin');
  };

  return (
    <div>
      <div className="mb-4">
        <Button variant="outline" onClick={() => router.back()}>
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
                  onChange={handleImageUrlChange}
                  placeholder="https://example.com/image.png or a Google Drive link"
                />
                
                {imageUrl && (
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden border bg-muted">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          src={imageUrl} 
                          alt="Image Preview" 
                          style={{width: '100%', height: '100%', objectFit: 'cover'}}
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
