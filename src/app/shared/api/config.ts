export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  SPIRITS_ENDPOINT: '/api/spirits',
  CAPTURE_ENDPOINT: '/api/spirits/capture',
} as const;
