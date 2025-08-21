import { PageHeader } from '@/components/page-header';
import { Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AppLogo } from '@/components/app-logo';
import Image from 'next/image';

export default function AboutUsPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <PageHeader
        title="About Us"
        description="Learn more about our mission to empower farmers through technology."
        icon={Info}
      />
      <Card>
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <AppLogo />
          </div>
          <CardTitle className="font-headline text-3xl">Our Mission</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-lg text-foreground/80 leading-relaxed">
           <div className="relative w-full h-64 rounded-lg overflow-hidden border mb-6">
              <Image src="https://placehold.co/800x300.png" alt="Farm landscape" layout="fill" objectFit="cover" data-ai-hint="farm landscape" />
            </div>
          <p>
            Welcome to NS Agri AI, your trusted partner in modern agriculture. Our mission is to bridge the gap between traditional farming practices and cutting-edge technology, providing farmers with the tools and insights they need to thrive in a changing world.
          </p>
          <p>
            We believe that by harnessing the power of Artificial Intelligence, we can help farmers increase crop yields, reduce waste, and make more informed decisions. From suggesting the best crops for your soil to detecting plant diseases with a simple photo, our platform is designed to be your all-in-one digital assistant.
          </p>
           <p>
            Our team is composed of passionate agronomists, data scientists, and software engineers dedicated to building a sustainable and prosperous future for agriculture. We are committed to continuous innovation and to supporting the hardworking farmers who feed our communities.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
