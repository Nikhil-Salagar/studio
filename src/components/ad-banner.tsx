'use client';

import React, { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

const AdBanner = () => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
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
            <ins
                className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client={`ca-${publisherId}`}
                data-ad-slot="YOUR_AD_SLOT_ID" // TODO: Replace with your ad slot ID
                data-ad-format="auto"
                data-full-width-responsive="true"
            ></ins>
        </CardContent>
    </Card>
  );
};

export default AdBanner;
