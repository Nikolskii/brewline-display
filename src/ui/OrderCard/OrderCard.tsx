import type { Order, OrderStatus } from '@/types';
import { formatItems } from './formatItems';
import styles from './OrderCard.module.scss';

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
