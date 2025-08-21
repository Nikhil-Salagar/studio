"use client";

import { PageHeader } from '@/components/page-header';
import { Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export default function ContactUsPage() {
    const { toast } = useToast();
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const message = formData.get('message') as string;
        
        if (name && email && message) {
            window.location.href = `mailto:support@nsagriai.com?subject=Contact from ${name}&body=${message}`;
            toast({
                title: "Email Client Opened",
                description: "Please send the email from your mail client.",
            });
        } else {
             toast({
                variant: "destructive",
                title: "Missing Information",
                description: "Please fill out all fields.",
            });
        }

    };

  return (
    <div className="container mx-auto max-w-2xl py-12 px-4">
      <PageHeader
        title="Contact Us"
        description="We'd love to hear from you. Reach out with any questions or feedback."
        icon={Mail}
      />
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Send us a Message</CardTitle>
          <CardDescription>
            Fill out the form below and we will get back to you as soon as possible.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" placeholder="John Doe" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" name="email" type="email" placeholder="you@example.com" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Your Message</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Please describe your issue or feedback..."
                rows={6}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Send Message
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
