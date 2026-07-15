import type { components } from './generated/openapi';

// Эргономичные псевдонимы поверх сгенерированных типов контракта —
// чтобы не писать components['schemas']['Order'] по всему коду.
export type Order = components['schemas']['Order'];
export type OrderStatus = components['schemas']['OrderStatus'];
export type OrderItem = components['schemas']['OrderItem'];
export type OrderSource = components['schemas']['OrderSource'];
