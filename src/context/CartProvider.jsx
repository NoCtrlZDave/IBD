import { useEffect, useMemo, useState, useCallback } from 'react';
import { CartContext } from './cart-context.js';

const STORAGE_KEY = 'ibd-cart';

function loadCart() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

export function CartProvider({ children }) {
    const [items, setItems] = useState(loadCart);
    const [toast, setToast] = useState(null);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }, [items]);

    useEffect(() => {
        if (!toast) return undefined;
        const timer = setTimeout(() => setToast(null), 3000);
        return () => clearTimeout(timer);
    }, [toast]);

    const addItem = useCallback((product, size = 'M', quantity = 1) => {
        setItems((prev) => {
            const key = `${product.id}-${size}`;
            const existing = prev.find((item) => item.key === key);
            if (existing) {
                return prev.map((item) =>
                    item.key === key
                        ? { ...item, quantity: item.quantity + quantity }
                        : item,
                );
            }
            return [
                ...prev,
                {
                    key,
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    imageAlt: product.imageAlt,
                    category: product.category,
                    size,
                    quantity,
                },
            ];
        });
        setToast({ name: product.name, size });
    }, []);

    const removeItem = useCallback((key) => {
        setItems((prev) => prev.filter((item) => item.key !== key));
    }, []);

    const updateQuantity = useCallback((key, quantity) => {
        if (quantity < 1) return;
        setItems((prev) =>
            prev.map((item) => (item.key === key ? { ...item, quantity } : item)),
        );
    }, []);

    const clearCart = useCallback(() => setItems([]), []);

    const dismissToast = useCallback(() => setToast(null), []);

    const { count, subtotal } = useMemo(() => {
        const countValue = items.reduce((sum, item) => sum + item.quantity, 0);
        const subtotalValue = items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0,
        );
        return { count: countValue, subtotal: subtotalValue };
    }, [items]);

    const value = useMemo(
        () => ({
            items,
            count,
            subtotal,
            toast,
            addItem,
            removeItem,
            updateQuantity,
            clearCart,
            dismissToast,
        }),
        [items, count, subtotal, toast, addItem, removeItem, updateQuantity, clearCart, dismissToast],
    );

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartProvider;
