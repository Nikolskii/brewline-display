import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getOrdersSnapshot, subscribeToOrders } from '@/api/orders';

const ORDERS_KEY = ['orders'];

/**
 * Состояние экрана очереди:
 * - TanStack Query делает первичную загрузку снапшота (статусы loading/error);
 * - SSE присылает полные снапшоты при изменениях → кладём их прямо в кэш Query
 *   через setQueryData, и React перерисовывает табло.
 */
export function useOrderQueue() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ORDERS_KEY,
    queryFn: getOrdersSnapshot,
  });

  useEffect(() => {
    const unsubscribe = subscribeToOrders((orders) => {
      queryClient.setQueryData(ORDERS_KEY, orders);
    });
    return unsubscribe;
  }, [queryClient]);

  return {
    orders: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
  };
}
