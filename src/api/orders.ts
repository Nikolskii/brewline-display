import type { Order } from '@brewline/api-types';

import { API_URL,apiGet } from './client';

/** Снапшот активной очереди (GET /orders). */
export function getOrdersSnapshot(): Promise<Order[]> {
  return apiGet<Order[]>('/orders');
}

/**
 * Подписка на SSE-поток снапшотов очереди (GET /orders/stream).
 * Сервер шлёт событие `snapshot` с полным массивом Order при каждом изменении.
 * Возвращает функцию отписки (закрывает соединение).
 */
export function subscribeToOrders(onSnapshot: (orders: Order[]) => void): () => void {
  const source = new EventSource(`${API_URL}/orders/stream`);

  source.addEventListener('snapshot', (event) => {
    const orders = JSON.parse((event as MessageEvent).data) as Order[];
    onSnapshot(orders);
  });

  return () => source.close();
}
