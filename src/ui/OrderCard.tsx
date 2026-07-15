import type { Order, OrderStatus } from '@/types';
import styles from './OrderCard.module.scss';

/** «Латте», «Капучино ×2», несколько позиций — через запятую. */
function formatItems(order: Order): string {
  return order.items.map((i) => (i.quantity > 1 ? `${i.name} ×${i.quantity}` : i.name)).join(', ');
}

interface Props {
  order: Order;
  status: OrderStatus;
}

export function OrderCard({ order, status }: Props) {
  return (
    <div className={`${styles.card} ${styles[status]}`}>
      <div className={styles.number}>{String(order.number).padStart(3, '0')}</div>
      <div className={styles.details}>
        <div className={styles.items}>{formatItems(order)}</div>
        {status === 'ready' && <div className={styles.pickup}>заберите на баре</div>}
      </div>
    </div>
  );
}
