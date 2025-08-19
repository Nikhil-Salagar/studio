'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { Card } from './ui/card';

// Replace with your real IDs in production
const AD_CLIENT = 'ca-pub-3940256099942544';
const AD_SLOT = '1234567890';

export function AdBanner() {
  const adRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('Ad push error:', err);
    }
  }, [pathname]);

  return (
    <Card ref={adRef} className="w-full h-auto min-h-24 flex justify-center items-center my-4 p-2">
      <ins
        key={pathname}
        className="adsbygoogle"
        style={{ display: 'block', width: '100%' }}
        data-ad-client={AD_CLIENT}
        data-ad-slot={AD_SLOT}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </Card>
  );
}
