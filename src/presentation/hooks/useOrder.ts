import { useState, useEffect } from 'react';
import { SupabaseOrderRepository } from '@/src/infrastructure/repositories/SupabaseOrderRepository';
import { Order } from '@/src/domain/entities/Order';
import { supabase } from '@/src/infrastructure/database/supabaseClient';

export const useOrder = () => {
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);

    const loadOrderData = async () => {
        setLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
            const data = await SupabaseOrderRepository.getLatestOrder(session.user.id);
            setOrder(data);
        }
        setLoading(false);
    };

    useEffect(() => {
        loadOrderData();
    }, []);

    const subtotal = order?.items.reduce((acc, item) => acc + (item.price * item.quantity), 0) || 0;

    const removeItem = async (itemId: string) => {
        if (!order) return;
        await SupabaseOrderRepository.deleteOrderItem(itemId);
        
        if (order.items.length === 1) {
            await SupabaseOrderRepository.deleteOrder(order.id);
            setOrder(null);
        } else {
            loadOrderData();
        }
    };

    return { order, loading, subtotal, removeItem, reload: loadOrderData };
};