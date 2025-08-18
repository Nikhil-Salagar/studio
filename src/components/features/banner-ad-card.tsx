'use client';

import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

export function BannerAdCard() {
  return (
    <Card className="shadow-lg w-full">
      <CardContent className="p-0">
        <div className="relative aspect-video w-full">
          <Image
            src="https://placehold.co/800x200.png"
            alt="Advertisement"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
            data-ai-hint="advertisement banner"
          />
        </div>
      </CardContent>
    </Card>
  );
}
