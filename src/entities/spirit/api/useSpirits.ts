'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { spiritApi } from './spiritApi';
import { Spirit, SpiritCaptureRequest } from '../model/types';
import { toast } from 'react-hot-toast';

export const useSpirits = () => {
  return useQuery({
    queryKey: ['spirits'],
    queryFn: () => spiritApi.getAll(),
    refetchInterval: 10000, // Обновлять каждые 10 секунд
  });
};

export const useCaptureSpirit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: SpiritCaptureRequest) => spiritApi.capture(request),
    onSuccess: () => {
      toast.success('Отряд отправлен на зачистку!');
      queryClient.invalidateQueries({ queryKey: ['spirits'] });
    },
    onError: (error) => {
      toast.error(`Ошибка отправки отряда: ${error.message}`);
    },
  });
};

export const useUpdateSpiritStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: Spirit['status'] }) =>
      spiritApi.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['spirits'] });
    },
  });
};
