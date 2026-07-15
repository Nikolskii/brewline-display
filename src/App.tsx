import { useOrderQueue } from '@/useOrderQueue';
import { OrderBoard } from '@/ui/OrderBoard/OrderBoard';
import styles from './App.module.scss';

function App() {
  const { orders, isLoading, isError } = useOrderQueue();

  if (isLoading) return <div className={styles.state}>Загрузка табло…</div>;
  if (isError) return <div className={styles.state}>Не удалось загрузить очередь</div>;

  return <OrderBoard orders={orders} />;
}

export default App;
