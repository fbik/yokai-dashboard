export const THREAT_LEVELS = {
  low: { 
    label: 'Low', 
    color: '#10B981', 
    bgColor: '#D1FAE5',
    description: 'Минимальная угроза' 
  },
  medium: { 
    label: 'Medium', 
    color: '#F59E0B', 
    bgColor: '#FEF3C7',
    description: 'Средняя угроза' 
  },
  high: { 
    label: 'High', 
    color: '#EF4444', 
    bgColor: '#FEE2E2',
    description: 'Высокая угроза' 
  },
  critical: { 
    label: 'Critical', 
    color: '#7C3AED', 
    bgColor: '#EDE9FE',
    description: 'Критическая угроза' 
  },
} as const;

export const SPIRIT_NAMES = [
  'Kitsune', 'Oni', 'Tengu', 'Kappa', 'Yuki-onna',
  'Jorogumo', 'Nurikabe', 'Rokurokubi', 'Ubume', 'Zashiki-warashi'
] as const;

export const TOKYO_LOCATIONS = [
  'Shibuya', 'Shinjuku', 'Ginza', 'Akihabara', 'Harajuku',
  'Roppongi', 'Asakusa', 'Ueno', 'Ikebukuro', 'Odaiba'
] as const;

export const INITIAL_SPIRIT_COUNT = 10;
