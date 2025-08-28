
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
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const isComponentMounted = useRef(true);

  // Language detection function
  const detectLanguage = (text: string) => {
    if (/[\u0900-\u097F]/.test(text)) return 'hi-IN'; // Devanagari (Hindi, Marathi)
    if (/[\u0C80-\u0CFF]/.test(text)) return 'kn-IN'; // Kannada
    if (/[\u0B80-\u0BFF]/.test(text)) return 'ta-IN'; // Tamil
    if (/[\u0C00-\u0C7F]/.test(text)) return 'te-IN'; // Telugu
    if (/[\u0D00-\u0D7F]/.test(text)) return 'ml-IN'; // Malayalam
    return 'en-US'; // Default to English
  };

  // Maps our language code to ResponsiveVoice's voice name
  const getResponsiveVoiceName = (lang: string) => {
    const voiceMap: { [key: string]: string } = {
      'hi-IN': 'Hindi Female',
      'kn-IN': 'Kannada Female',
      'ta-IN': 'Tamil Female',
      'te-IN': 'Telugu Female',
      'ml-IN': 'Malayalam Female',
      'en-US': 'UK English Female', 
    };
    // Marathi uses Hindi voice
    if (lang === 'mr-IN') return 'Hindi Female';
    return voiceMap[lang] || 'UK English Female';
  };

  useEffect(() => {
    isComponentMounted.current = true;
    const handleVoicesChanged = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      if (isComponentMounted.current) {
        setVoices(availableVoices);
      }
    };

    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.addEventListener('voiceschanged', handleVoicesChanged);
      handleVoicesChanged();
    }

    return () => {
      isComponentMounted.current = false;
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged);
        window.speechSynthesis.cancel();
      }
      if (typeof window !== 'undefined' && window.responsiveVoice) {
        window.responsiveVoice.cancel();
      }
    };
  }, []);


  const readAloud = useCallback((text: string) => {
    if (!text || typeof window === 'undefined') {
      return;
    }

    // Cancel any previous speech from both engines
    window.speechSynthesis.cancel();
    if (window.responsiveVoice) {
      window.responsiveVoice.cancel();
    }

    setIsReading(true);

    const lang = detectLanguage(text);
    const currentVoices = window.speechSynthesis.getVoices();
    const nativeVoice = currentVoices.find(v => v.lang === lang);

    // Try native TTS first if a voice is available
    if (nativeVoice) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = nativeVoice;
      utterance.lang = lang;
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.volume = 1;

      utterance.onend = () => {
        if (isComponentMounted.current) {
            setIsReading(false);
        }
      };
      
      utterance.onerror = (event) => {
        console.error('Native SpeechSynthesis Error:', event);
        // If native fails, fallback to ResponsiveVoice
        if (window.responsiveVoice) {
          console.log('Falling back to ResponsiveVoice.');
          const responsiveVoiceName = getResponsiveVoiceName(lang);
          window.responsiveVoice.speak(text, responsiveVoiceName, {
            onend: () => {
                if (isComponentMounted.current) {
                    setIsReading(false);
                }
            }
          });
        } else {
            if (isComponentMounted.current) {
                setIsReading(false);
            }
        }
      };
      window.speechSynthesis.speak(utterance);
    } 
    // Fallback to ResponsiveVoice if native voice not found or if the library is available
    else if (window.responsiveVoice) {
      console.log('Using ResponsiveVoice as primary.');
      const responsiveVoiceName = getResponsiveVoiceName(lang);
      window.responsiveVoice.speak(text, responsiveVoiceName, {
        onend: () => {
            if (isComponentMounted.current) {
                setIsReading(false);
            }
        }
      });
    } else {
        // No TTS engine available
        console.warn('No TTS engine available.');
        setIsReading(false);
    }
  }, []);

  return { isReading, readAloud };
}
