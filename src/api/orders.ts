import { apiGet } from './client';
import type { Order } from '@/types';

/** Снапшот активной очереди (GET /orders). */
export function getOrdersSnapshot(): Promise<Order[]> {
  return apiGet<Order[]>('/orders');
}
