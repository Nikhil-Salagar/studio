import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getGoogleDriveImageUrl(url: string): string {
  if (!url || !url.includes('drive.google.com/file/d/')) {
    return url;
  }
  
  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/');
    // The part after /d/ is the file ID
    const fileIdIndex = pathParts.findIndex(part => part === 'd');
    
    if (fileIdIndex !== -1 && pathParts.length > fileIdIndex + 1) {
      const fileId = pathParts[fileIdIndex + 1];
      // Construct the direct content link
      return `https://drive.google.com/uc?export=view&id=${fileId}`;
    }
  } catch (error) {
    console.error("Invalid URL provided for Google Drive conversion:", error);
    // If URL parsing fails, return the original URL
    return url;
  }

  // Return original URL if the format is not recognized
  return url;
}
