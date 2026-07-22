import type { Order } from '@brewline/api-types';

/** «Латте», «Капучино ×2», несколько позиций — через запятую. */
export function formatItems(order: Order): string {
  return order.items.map((i) => (i.quantity > 1 ? `${i.name} ×${i.quantity}` : i.name)).join(', ');
}
