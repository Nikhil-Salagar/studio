'use client';

import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

const AdBanner = () => {
  const pathname = usePathname();
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    if (adRef.current && adRef.current.getAttribute('data-ad-status') === 'unfilled') {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        // Immediately mark the ad as filled to prevent re-pushes
        adRef.current.setAttribute('data-ad-status', 'filled');
      } catch (err) {
        console.error('Ad push error:', err);
      }
    }
  }, [pathname]);

  const publisherId = "ca-pub-4466755146994652";
  const adSlotId = "7440904456";

  return (
    <Card className="shadow-lg w-full bg-muted/40 border-dashed min-h-[100px] flex items-center justify-center">
      <CardContent className="p-2 w-full">
        <div className="w-full text-center">
          <ins
            ref={adRef}
            key={pathname} // Re-mount component on path change
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client={publisherId}
            data-ad-slot={adSlotId}
            data-ad-format="auto"
            data-full-width-responsive="true"
            data-ad-status="unfilled" // Start as unfilled
          ></ins>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdBanner;
