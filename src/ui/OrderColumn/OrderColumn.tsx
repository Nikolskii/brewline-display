import type { Order, OrderStatus } from '@/types';
import { STATUS_LABEL, COLUMN_LIMIT } from '@/ui/statusConfig';
import { OrderCard } from '@/ui/OrderCard/OrderCard';
import styles from './OrderColumn.module.scss';

interface Props {
  status: OrderStatus;
  orders: Order[];
}

export function OrderColumn({ status, orders }: Props) {
  const visible = orders.slice(0, COLUMN_LIMIT);
  const overflow = orders.length - visible.length;

  return (
    <section className={`${styles.column} ${styles[status]}`}>
      <header className={styles.head}>
        <span className={styles.dot} />
        <span className={styles.label}>{STATUS_LABEL[status]}</span>
        <span className={styles.count}>{orders.length}</span>
      </header>

      {visible.map((order) => (
        <OrderCard key={order.orderId} order={order} status={status} />
      ))}

      {overflow > 0 && (
        <div className={styles.overflow}>
          <span className={styles.overflowNum}>+{overflow}</span>
          <span className={styles.overflowText}>ещё в очереди</span>
        </div>
      )}
    </section>
  );
}
