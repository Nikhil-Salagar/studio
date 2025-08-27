
'use client';

import { useState, useEffect, useCallback } from 'react';

export function useTTS() {
  const [isReading, setIsReading] = useState(false);

  // Function to detect language from text using Unicode ranges
  const detectLanguage = (text: string) => {
    if (/[\u0900-\u097F]/.test(text)) return 'hi-IN'; // Devanagari (Hindi, Marathi)
    if (/[\u0C80-\u0CFF]/.test(text)) return 'kn-IN'; // Kannada
    if (/[\u0B80-\u0BFF]/.test(text)) return 'ta-IN'; // Tamil
    if (/[\u0C00-\u0C7F]/.test(text)) return 'te-IN'; // Telugu
    if (/[\u0D00-\u0D7F]/.test(text)) return 'ml-IN'; // Malayalam
    return 'en-US'; // Default to English
  };

  const readAloud = useCallback((text: string) => {
    if (!text || typeof window === 'undefined' || !window.speechSynthesis) {
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const lang = detectLanguage(text);
    
    // Find a suitable voice
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(v => v.lang === lang);
    if (voice) {
      utterance.voice = voice;
    }
    
    utterance.lang = lang;
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => {
      setIsReading(true);
    };

    utterance.onend = () => {
      setIsReading(false);
    };
    
    utterance.onerror = () => {
        setIsReading(false);
    }

    window.speechSynthesis.speak(utterance);
  }, []);

  // Ensure voices are loaded
  useEffect(() => {
    const handleVoicesChanged = () => {
      // Re-check voices when they are loaded.
    };
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.addEventListener('voiceschanged', handleVoicesChanged);
      // Trigger loading voices
      window.speechSynthesis.getVoices();
    }
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged);
      }
    };
  }, []);

  return { isReading, readAloud };
}
