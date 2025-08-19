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
  const publisherId = "4466755146994652";
  const adSlotId = "7440904456";
  const adRef = useRef<HTMLModElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Only try to load an ad if the ad slot is currently unfilled
    if (adRef.current && adRef.current.getAttribute('data-ad-status') === 'unfilled') {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        // Mark the ad slot as filled so we don't try to fill it again
        adRef.current.setAttribute('data-ad-status', 'filled');
      } catch (err) {
        console.error('Ad push error:', err);
      }
    }
  }, [pathname]); // Rerun this effect if the path changes

  return (
    <Card className="shadow-lg w-full bg-muted/40 border-dashed min-h-[100px] flex items-center justify-center">
      <CardContent className="p-2 w-full">
        <div className="w-full text-center">
          <ins
            key={pathname} // Use the path as a key to force re-mounting on navigation
            ref={adRef}
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client={`ca-pub-${publisherId}`}
            data-ad-slot={adSlotId}
            data-ad-format="auto"
            data-full-width-responsive="true"
            data-ad-status="unfilled" // Start with an unfilled status
          ></ins>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdBanner;
