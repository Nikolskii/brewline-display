// Транспортный слой: единственное место, знающее адрес backend и как ходить по HTTP.
// По умолчанию '' → относительные пути (в dev их форвардит Vite-proxy, один origin).
// В проде VITE_API_URL укажет реальный адрес backend.
const API_URL = import.meta.env.VITE_API_URL ?? '';

export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`);
  if (!res.ok) {
    throw new Error(`GET ${path} → HTTP ${res.status}`);
  }
  return (await res.json()) as T;
}

export { API_URL };
