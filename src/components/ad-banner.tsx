'use client';

import React, { useEffect, useRef } from 'react';

// Replace with your own AdSense client and slot IDs
const AD_CLIENT = 'ca-pub-4466755146994652';
const AD_SLOT = '7440904456';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export function AdBanner() {
  const insRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    // Check if the ad has already been loaded.
    // Google's script will add child elements to the <ins> tag.
    if (insRef.current && insRef.current.children.length === 0) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.error('Ad push error:', err);
      }
    }
  }, []);

  return (
    <div className="min-h-[100px] w-full flex justify-center items-center bg-muted/50 my-6 rounded-lg">
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{ display: 'block', width: '100%' }}
        data-ad-client={AD_CLIENT}
        data-ad-slot={AD_SLOT}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}
