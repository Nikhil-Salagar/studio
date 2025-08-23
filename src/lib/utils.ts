import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getGoogleDriveImageUrl(url: string): string {
  if (!url || !url.includes('drive.google.com')) {
    return url;
  }
  
  try {
    // Standard share link format: https://drive.google.com/file/d/FILE_ID/view?usp=sharing
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/');
    const fileIdIndex = pathParts.indexOf('d');
    
    if (fileIdIndex !== -1 && pathParts.length > fileIdIndex + 1) {
      const fileId = pathParts[fileIdIndex + 1];
      // This is the direct content link format
      return `https://drive.google.com/uc?export=view&id=${fileId}`;
    }
  } catch (error) {
    console.error("Invalid URL for Google Drive conversion", error);
    return url;
  }

  // Return original URL if format is not recognized
  return url;
}
