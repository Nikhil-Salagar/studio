
"use client";

import { useState, useRef } from 'react';
import { PageHeader } from '@/components/page-header';
import { ArrowLeft, Edit, Upload } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { blogPosts } from '@/app/blog/posts';
import { notFound, useParams, useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const { slug } = params;
  const post = blogPosts.find((p) => p.slug === slug);
  const { toast } = useToast();

  const [title, setTitle] = useState(post?.title || '');
  const [description, setDescription] = useState(post?.description || '');
  
  // In a real app, these would come from the post data
  const [image1, setImage1] = useState<string | null>('https://placehold.co/800x400.png');
  const [image2, setImage2] = useState<string | null>('https://placehold.co/800x400.png');

  const fileInputRef1 = useRef<HTMLInputElement>(null);
  const fileInputRef2 = useRef<HTMLInputElement>(null);

  if (!post) {
    notFound();
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, setImage: React.Dispatch<React.SetStateAction<string | null>>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = () => {
    // In a real application, you would make an API call here to save the changes.
    // For this demo, we'll just show a success message.
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
          <CardDescription>Update the title and description for your blog post.</CardDescription>
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
              <h3 className="text-lg font-medium">Article Images</h3>
              <p className="text-sm text-muted-foreground">Change the images associated with this article.</p>
           </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
                <Label>Image 1</Label>
                <div className="relative w-full aspect-video rounded-lg overflow-hidden border">
                    {image1 ? (
                        <Image src={image1} alt="Article image 1" layout="fill" objectFit="cover" />
                    ) : (
                        <div className="bg-muted w-full h-full flex items-center justify-center">
                            <span className="text-muted-foreground">No Image</span>
                        </div>
                    )}
                </div>
                <input 
                    type="file" 
                    ref={fileInputRef1} 
                    className="hidden" 
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, setImage1)}
                />
                <Button variant="outline" onClick={() => fileInputRef1.current?.click()}>
                    <Upload className="mr-2 h-4 w-4"/>
                    Upload from Gallery
                </Button>
            </div>
            <div className="space-y-4">
                <Label>Image 2</Label>
                <div className="relative w-full aspect-video rounded-lg overflow-hidden border">
                    {image2 ? (
                        <Image src={image2} alt="Article image 2" layout="fill" objectFit="cover" />
                    ) : (
                         <div className="bg-muted w-full h-full flex items-center justify-center">
                            <span className="text-muted-foreground">No Image</span>
                        </div>
                    )}
                </div>
                <input 
                    type="file" 
                    ref={fileInputRef2} 
                    className="hidden" 
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, setImage2)}
                />
                <Button variant="outline" onClick={() => fileInputRef2.current?.click()}>
                    <Upload className="mr-2 h-4 w-4"/>
                    Upload from Gallery
                </Button>
            </div>
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
