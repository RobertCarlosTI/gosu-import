import { supabase } from '../database/supabaseClient';
import { Order, OrderItem } from '@/src/domain/entities/Order';

export const SupabaseOrderRepository = {
    async getLatestOrder(userId: string): Promise<Order | null> {
        const { data: ordenes } = await supabase
            .from('ordenes_perfumes')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false })
            .limit(1);

        if (!ordenes || ordenes.length === 0) return null;

        const orden = ordenes[0];
        const { data: detalles } = await supabase
            .from('detalle_orden_perfumes')
            .select('*, perfumes(*)')
            .eq('orden_id', orden.id);

        const items: OrderItem[] = (detalles || []).map(d => ({
            id: d.id,
            perfumeId: d.perfumes?.id,
            name: d.perfumes?.name || d.nombre_perfume,
            brand: d.perfumes?.brand,
            image: d.perfumes?.image,
            price: d.perfumes?.price || 108,
            quantity: d.cantidad
        }));

        return {
            id: orden.id,
            userId: orden.user_id,
            status: orden.estado,
            paymentStatus: orden.estado_pago,
            total: orden.inversion_total,
            shippingType: orden.tipo_envio,
            shippingCost: orden.costo_envio,
            address: orden.direccion,
            district: orden.distrito,
            isFinalized: orden.finalizada,
            createdAt: orden.created_at,
            items
        };
    },

    async deleteOrderItem(itemId: string): Promise<void> {
        await supabase.from('detalle_orden_perfumes').delete().eq('id', itemId);
    },

    async deleteOrder(orderId: string): Promise<void> {
        await supabase.from('ordenes_perfumes').delete().eq('id', orderId);
    }
};