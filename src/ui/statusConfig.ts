import type { OrderStatus } from '@/types';

/** Порядок колонок на табло (слева направо). */
export const COLUMN_ORDER: readonly OrderStatus[] = ['new', 'preparing', 'ready'];

/** Русские надписи статусов (презентация; в контракте — англ. коды). */
export const STATUS_LABEL: Record<OrderStatus, string> = {
  new: 'Новый',
  preparing: 'Готовится',
  ready: 'Готов',
};

/** Максимум карточек в колонке; остальные сворачиваются в «+N». */
export const COLUMN_LIMIT = 4;
