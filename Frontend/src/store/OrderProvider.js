import { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const OrdersContext = createContext();

export function useOrders() {
	return useContext(OrdersContext);
}

export function OrderProvider({ children }) {
	const [orders, setOrders] = useLocalStorage('order', {});

	return <OrdersContext.Provider value={[orders, setOrders]}>{children}</OrdersContext.Provider>;
}
