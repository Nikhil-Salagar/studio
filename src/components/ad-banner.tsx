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
    // Check if the ad container is already filled
    if (adRef.current && adRef.current.innerHTML === '' && adRef.current.getAttribute('data-ad-status') !== 'filled') {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        // Mark the ad slot as filled to prevent re-initialization
        if(adRef.current) {
            adRef.current.setAttribute('data-ad-status', 'filled');
        }
      } catch (err) {
        console.error('Ad push error:', err);
      }
    }
  }, [pathname]);

  return (
    <div ref={adRef} key={pathname}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={AD_CLIENT}
        data-ad-slot={AD_SLOT}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}
