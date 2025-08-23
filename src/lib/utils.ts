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
    const urlObj = new URL(url);
    // Standard share link format: /file/d/FILE_ID/view
    const pathParts = urlObj.pathname.split('/');
    const fileIdIndex = pathParts.indexOf('d');
    
    if (fileIdIndex !== -1 && pathParts.length > fileIdIndex + 1) {
      const fileId = pathParts[fileIdIndex + 1];
      return `https://drive.google.com/uc?export=view&id=${fileId}`;
    }
  } catch (error) {
    console.error("Invalid URL for Google Drive conversion", error);
    return url;
  }

  return url;
}
