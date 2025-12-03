import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { spiritKeys } from '../api/queries';
import { Spirit } from '@/app/entities/spirit/model/types';

// Простая имитация real-time обновлений через setInterval
// Позже можно заменить на настоящий SSE
export const useSpiritUpdates = () => {
  const queryClient = useQueryClient();
  
  useEffect(() => {
    const interval = setInterval(() => {
      queryClient.setQueryData<Spirit[]>(spiritKeys.lists(), (old = []) => {
        if (!old || old.length === 0) return old;
        
        const randomIndex = Math.floor(Math.random() * old.length);
        const threatLevels = ['low', 'medium', 'high', 'critical'] as const;
        const newThreatLevel = threatLevels[Math.floor(Math.random() * threatLevels.length)];
        
        return old.map((spirit, index) => 
          index === randomIndex
            ? { 
                ...spirit, 
                threatLevel: newThreatLevel,
                lastUpdated: new Date() 
              }
            : spirit
        );
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, [queryClient]);
  
  return null;
};
