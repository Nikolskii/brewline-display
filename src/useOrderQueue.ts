import { useQuery } from '@tanstack/react-query';
import { getOrdersSnapshot } from '@/api/orders';

/**
 * Состояние экрана очереди. Пока — только первичная загрузка снапшота (I11).
 * В I13 сюда добавится подписка на SSE (обновление кэша через queryClient.setQueryData).
 */
export function useOrderQueue() {
  const query = useQuery({
    queryKey: ['orders'],
    queryFn: getOrdersSnapshot,
  });

  return {
    orders: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
  };
}
