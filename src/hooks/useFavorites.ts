import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { updateFavorites, getFavorites } from '@/api';
import useBoundStore from '@/store/useBoundStore';

let abortControllers: AbortController[] = [];

const useFavorites = () => {
  const queryKey: string[] = ['favorites'];
  const queryClient = useQueryClient();
  const jwt = useBoundStore((state) => state.jwt);
  const { rehydrate } = useBoundStore.persist;

  const {
    data = [],
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey,
    queryFn: () => getFavorites(jwt),
    select: (rawData: { data: number[] }): number[] => {
      return rawData.data;
    },
    enabled: !!jwt,
    staleTime: 1000 * 60 * 5,
  });

  const updateMutation = useMutation({
    mutationFn: async ({ ids }: { ids: number[] }) => {
      abortControllers.forEach((controller) => controller.abort());
      abortControllers = [];

      const abortController = new AbortController();
      abortControllers.push(abortController);

      const response = await updateFavorites(jwt, ids, abortController.signal);

      abortControllers = abortControllers.filter((controller) => controller !== abortController);

      return response;
    },

    onMutate: async ({ ids }) => {
      await queryClient.cancelQueries({ queryKey });

      const previousIds = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, { data: ids });

      return { previousIds, ids };
    },

    onError: (err, _variables, context) => {
      if (err.name !== 'CanceledError') {
        queryClient.setQueryData(queryKey, context?.previousIds);
      }
    },

    onSuccess: (updatedData) => {
      queryClient.setQueryData(queryKey, updatedData);
    },
  });

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        rehydrate();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [rehydrate]);

  return {
    data,
    isLoading,
    isFetching,
    error,
    updateFavorites: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    updateError:
      updateMutation.error && updateMutation.error.name !== 'CanceledError'
        ? updateMutation.error
        : null,
  };
};

export default useFavorites;
