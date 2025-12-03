import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/app/shared/api/client';
import { Spirit } from '@/app/entities/spirit/model/types';

export const spiritKeys = {
  all: ['spirits'] as const,
  lists: () => [...spiritKeys.all, 'list'] as const,
};

export const useSpirits = () => {
  return useQuery({
    queryKey: spiritKeys.lists(),
    queryFn: async (): Promise<Spirit[]> => {
      const { data } = await apiClient.get('/api/spirits');
      return data.map((spirit: any) => ({
        ...spirit,
        lastUpdated: new Date(spirit.lastUpdated),
      }));
    },
    staleTime: 0,
  });
};

export const useCaptureSpirit = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (spiritId: string) => {
      // 30% вероятность ошибки
      if (Math.random() < 0.3) {
        throw new Error('Failed to capture spirit. Please try again.');
      }
      
      const { data } = await apiClient.post('/api/spirits/capture', { spiritId });
      return data;
    },
    onMutate: async (spiritId: string) => {
      await queryClient.cancelQueries({ queryKey: spiritKeys.lists() });
      
      const previousSpirits = queryClient.getQueryData<Spirit[]>(spiritKeys.lists());
      
      queryClient.setQueryData<Spirit[]>(spiritKeys.lists(), (old = []) =>
        old.map(spirit =>
          spirit.id === spiritId
            ? { ...spirit, status: 'captured' as const }
            : spirit
        )
      );
      
      return { previousSpirits };
    },
    onError: (error, spiritId, context) => {
      if (context?.previousSpirits) {
        queryClient.setQueryData(spiritKeys.lists(), context.previousSpirits);
      }
      throw error;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: spiritKeys.lists() });
    },
  });
};
