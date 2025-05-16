import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Utility to safely embed Google Docs, Sheets, etc.
export function createGoogleEmbedUrl(docId: string, docType: 'document' | 'spreadsheet' | 'presentation'): string {
  const baseUrl = 'https://docs.google.com';
  
  switch (docType) {
    case 'document':
      return `${baseUrl}/document/d/${docId}/preview`;
    case 'spreadsheet':
      return `${baseUrl}/spreadsheets/d/${docId}/preview`;
    case 'presentation':
      return `${baseUrl}/presentation/d/${docId}/embed`;
    default:
      return `${baseUrl}/document/d/${docId}/preview`;
  }
}

// Format date for display 
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
}
