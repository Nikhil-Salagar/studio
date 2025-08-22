import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster"
import './globals.css';
import Script from 'next/script';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://ns-agri-ai.com'), // Replace with your actual domain
  title: {
    default: 'NS Agri AI | AI-Powered Farming Assistant',
    template: `%s | NS Agri AI`,
  },
  description: 'Empowering farmers with AI-driven insights for crop suggestions, disease detection, fertilizer planning, and financial guidance. Your trusted partner in modern agriculture.',
  keywords: ['NS Agri AI', 'agriculture', 'farming', 'ai farming', 'crop suggestion', 'plant disease detection', 'fertilizer planner', 'agritech', 'smart farming', 'modern agriculture'],
  authors: [{ name: 'NS Agri AI Team' }],
  creator: 'NS Agri AI',
  publisher: 'NS Agri AI',
  openGraph: {
    title: 'NS Agri AI | AI-Powered Farming Assistant',
    description: 'Empowering farmers with AI-driven insights for crop suggestions, disease detection, fertilizer planning, and financial guidance.',
    url: 'https://ns-agri-ai.com', // Replace with your actual domain
    siteName: 'NS Agri AI',
    images: [
      {
        url: '/og-image.png', // Replace with a path to your OG image
        width: 1200,
        height: 630,
        alt: 'NS Agri AI empowering modern agriculture',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NS Agri AI | AI-Powered Farming Assistant',
    description: 'Empowering farmers with AI-driven insights for crop suggestions, disease detection, fertilizer planning, and financial guidance.',
    images: ['/twitter-image.png'], // Replace with a path to your Twitter image
    creator: '@NSAgriAI', // Replace with your Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="1Yl4uy433Wa-iDOR8cQQamYRcTNEG9Do3n4yNxHo6j0" />
        <meta name="google-adsense-account" content="" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
     crossOrigin="anonymous"></script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen">
        <main className="flex-grow">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
