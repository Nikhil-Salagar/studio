'use client';

import React, { useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

const AdBanner = () => {
  const adRef = useRef<HTMLModElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) {
      return;
    }
    try {
      if(adRef.current && adRef.current.children.length === 0) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        initialized.current = true;
      }
    } catch (err) {
      console.error('Ad push error:', err);
    }
  }, []);

  const publisherId = "ca-pub-4466755146994652";
  const adSlotId = "7440904456";

  return (
    <Card className="shadow-lg w-full bg-muted/40 border-dashed min-h-[100px] flex items-center justify-center">
      <CardContent className="p-2 w-full">
        <div className="w-full text-center">
          <ins
            ref={adRef}
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client={publisherId}
            data-ad-slot={adSlotId}
            data-ad-format="auto"
            data-full-width-responsive="true"
          ></ins>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdBanner;