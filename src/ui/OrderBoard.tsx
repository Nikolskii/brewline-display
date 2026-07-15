import type { Order, OrderStatus } from '@/types';
import { COLUMN_ORDER, STATUS_LABEL } from '@/statusConfig';
import { OrderColumn } from './OrderColumn';
import styles from './OrderBoard.module.scss';

interface Props {
  orders: Order[];
}

/** Раскладываем плоский список по колонкам-статусам (порядок внутри — как пришёл, по createdAt). */
function groupByStatus(orders: Order[]): Record<OrderStatus, Order[]> {
  const groups: Record<OrderStatus, Order[]> = { new: [], preparing: [], ready: [] };
  for (const order of orders) groups[order.status].push(order);
  return groups;
}

export function OrderBoard({ orders }: Props) {
  const groups = groupByStatus(orders);

  return (
    <div className={styles.board}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <span className={styles.logo}>Brewline</span>
          <span className={styles.subtitle}>Табло заказов · зал</span>
        </div>
        <div className={styles.legend}>
          {COLUMN_ORDER.map((status) => (
            <span key={status} className={styles.legendItem}>
              <span className={`${styles.legendDot} ${styles[status]}`} />
              {STATUS_LABEL[status]}
            </span>
          ))}
        </div>
      </header>

      <div className={styles.columns}>
        {COLUMN_ORDER.map((status) => (
          <OrderColumn key={status} status={status} orders={groups[status]} />
        ))}
      </div>
    </div>
  );
}
