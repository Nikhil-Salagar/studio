
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

// Extend the Window interface to include ResponsiveVoice
declare global {
  interface Window {
    responsiveVoice: {
      speak: (text: string, voice?: string, parameters?: any) => void;
      cancel: () => void;
      isPlaying: () => boolean;
      getVoices: () => { name: string }[];
    };
  }
}

export function useTTS() {
  const [isReading, setIsReading] = useState(false);
  const isComponentMounted = useRef(true);

  // This effect handles component unmounting to prevent state updates
  useEffect(() => {
    isComponentMounted.current = true;
    return () => {
      isComponentMounted.current = false;
      // Ensure any ongoing speech is stopped when the component unmounts
      if (typeof window !== 'undefined') {
        if (window.responsiveVoice) {
          window.responsiveVoice.cancel();
        }
        if (window.speechSynthesis) {
          window.speechSynthesis.cancel();
        }
      }
    };
  }, []);

  const detectLanguage = (text: string): string => {
    if (/[\u0900-\u097F]/.test(text)) return 'hi-IN'; // Devanagari for Hindi/Marathi
    if (/[\u0C80-\u0CFF]/.test(text)) return 'kn-IN'; // Kannada
    if (/[\u0B80-\u0BFF]/.test(text)) return 'ta-IN'; // Tamil
    if (/[\u0C00-\u0C7F]/.test(text)) return 'te-IN'; // Telugu
    if (/[\u0D00-\u0D7F]/.test(text)) return 'ml-IN'; // Malayalam
    return 'en-US';
  };

  const readAloud = useCallback((text: string) => {
    if (!text || typeof window === 'undefined') {
      return;
    }

    // Always cancel previous speech to avoid overlap
    if (window.responsiveVoice) {
      window.responsiveVoice.cancel();
    }
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }

    setIsReading(true);

    const lang = detectLanguage(text);
    const useResponsiveVoice = typeof window.responsiveVoice !== 'undefined' && typeof window.responsiveVoice.speak === 'function';

    const onEnd = () => {
      if (isComponentMounted.current) {
        setIsReading(false);
      }
    };
    
    // Strategy: Prioritize ResponsiveVoice for consistency, fallback to native
    if (useResponsiveVoice) {
      const voiceMap: { [key: string]: string } = {
        'hi-IN': 'Hindi Female',
        'kn-IN': 'Kannada Female',
        'ta-IN': 'Tamil Female',
        'te-IN': 'Telugu Female',
        'ml-IN': 'Malayalam Female',
        'mr-IN': 'Hindi Female', // Marathi uses Hindi voice
        'en-US': 'UK English Female',
      };
      const voiceName = voiceMap[lang] || 'UK English Female';
      
      // ResponsiveVoice takes a callback object as its 3rd parameter
      window.responsiveVoice.speak(text, voiceName, { onend: onEnd });
      
      // Fallback timer in case onend doesn't fire (some versions have issues)
      const speechDuration = (text.length / 10) * 1000 + 2000; // Estimate duration
      setTimeout(() => {
        if(isComponentMounted.current && window.responsiveVoice && !window.responsiveVoice.isPlaying()){
            onEnd();
        }
      }, speechDuration);

    } else if ('speechSynthesis' in window) {
      // Fallback to native browser TTS
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.volume = 1;
      
      // Let the browser choose the best available voice for the language
      // This is more robust than trying to find a specific voice which may not have loaded.
      const voices = window.speechSynthesis.getVoices();
      const voiceForLang = voices.find(v => v.lang === lang);
      if (voiceForLang) {
          utterance.voice = voiceForLang;
      }
      
      utterance.onend = onEnd;
      utterance.onerror = (event) => {
        // Don't log empty error objects.
        if(event.error && event.error !== 'interrupted') {
            console.error('SpeechSynthesis Error:', event.error);
        }
        onEnd(); // Ensure state resets on error
      };
      
      window.speechSynthesis.speak(utterance);
    } else {
        // If no TTS is available at all
        console.error('Text-to-Speech not supported on this browser.');
        setIsReading(false);
    }

  }, []);

  return { isReading, readAloud };
}
