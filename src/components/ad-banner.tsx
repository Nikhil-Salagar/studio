'use client';

import React, { useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

const AdBanner = () => {
  const adRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) {
        return;
    }
    
    try {
      if (adRef.current && adRef.current.firstChild) {
        // ad already loaded
        return;
      }
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      initialized.current = true;
    } catch (err) {
      console.error(err);
    }
  }, []);

  const publisherId = process.env.NEXT_PUBLIC_ADMOB_PUBLISHER_ID;

  if (!publisherId) {
    return null;
  }

  return (
    <Card className="shadow-lg w-full bg-muted/40 border-dashed">
        <CardContent className="p-2">
            <div ref={adRef}>
                <ins
                    className="adsbygoogle"
                    style={{ display: 'block' }}
                    data-ad-client={`ca-${publisherId}`}
                    data-ad-slot="7440904456"
                    data-ad-format="auto"
                    data-full-width-responsive="true"
                ></ins>
            </div>
        </CardContent>
    </Card>
  );
};

export default AdBanner;
