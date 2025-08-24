
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import en from './locales/en';
import hi from './locales/hi';
import kn from './locales/kn';
import mr from './locales/mr';
import ta from './locales/ta';
import te from './locales/te';
import ml from './locales/ml';

const translations: { [key: string]: any } = {
  English: en,
  Hindi: hi,
  Kannada: kn,
  Marathi: mr,
  Tamil: ta,
  Telugu: te,
  Malayalam: ml,
};

const LANGUAGE_STORAGE_KEY = 'appLanguage';

type LanguageContextType = {
  language: string;
  setLanguage: (language: string) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState('English');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    try {
      const storedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (storedLanguage && translations[storedLanguage]) {
        setLanguageState(storedLanguage);
      }
    } catch (error) {
      console.error("Failed to read language from localStorage", error);
    }
    setIsMounted(true);
  }, []);

  const setLanguage = (lang: string) => {
    if (translations[lang]) {
      setLanguageState(lang);
      try {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
      } catch (error) {
        console.error("Failed to save language to localStorage", error);
      }
    }
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let result = translations[language];
    try {
      for (const k of keys) {
        result = result[k];
      }
      if (typeof result === 'string') {
        return result;
      }
    } catch (e) {
        // Fallback to English if translation is missing
        let fallbackResult = translations['English'];
         try {
            for (const k of keys) {
                fallbackResult = fallbackResult[k];
            }
            if(typeof fallbackResult === 'string') return fallbackResult;
        } catch (fallbackError) {
            return key; // return the key if fallback also fails
        }
    }
    return key;
  };

  if (!isMounted) {
    return null; // Avoid rendering children until language is determined to prevent hydration mismatch
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
