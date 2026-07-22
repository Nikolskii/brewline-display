import type { Order, OrderStatus } from '@brewline/api-types';

/** Раскладываем плоский список по колонкам-статусам (порядок внутри — как пришёл, по createdAt). */
export function groupByStatus(orders: Order[]): Record<OrderStatus, Order[]> {
  const groups: Record<OrderStatus, Order[]> = { new: [], preparing: [], ready: [] };
  for (const order of orders) groups[order.status].push(order);
  return groups;
}
