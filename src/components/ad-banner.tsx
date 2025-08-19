'use client';

import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

// Replace with your own AdSense client and slot IDs
const AD_CLIENT = 'ca-pub-4466755146994652';
const AD_SLOT = '7440904456';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export function AdBanner() {
  const adRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (adRef.current && adRef.current.innerHTML === '') {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.error('Ad push error:', err);
      }
    }
  }, [pathname]);

  return (
    <div className="min-h-[100px] w-full flex justify-center items-center bg-muted/50 my-6 rounded-lg">
        <div ref={adRef} key={pathname} className="w-full h-full">
            <ins
                className="adsbygoogle"
                style={{ display: 'block', width: '100%', height: '100px' }}
                data-ad-client={AD_CLIENT}
                data-ad-slot={AD_SLOT}
                data-ad-format="auto"
                data-full-width-responsive="true"
            ></ins>
        </div>
    </div>
  );
}
