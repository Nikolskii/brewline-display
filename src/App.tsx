import './App.css';
import { useOrderQueue } from '@/useOrderQueue';

function App() {
  const { orders, isLoading, isError } = useOrderQueue();

  return (
    <main className="app">
      <h1>Brewline — очередь заказов</h1>

      {isLoading && <p className="placeholder">Загрузка…</p>}
      {isError && <p className="placeholder">Не удалось загрузить очередь</p>}

      {!isLoading && !isError && (
        <ul>
          {orders.map((order) => (
            <li key={order.orderId}>
              #{order.number} — {order.status} ({order.items.map((i) => i.name).join(', ')})
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default App;
