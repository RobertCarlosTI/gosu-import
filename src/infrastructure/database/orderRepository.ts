import { supabase } from "./supabaseClient";

export const orderRepository = {
    async getActiveOrder(userId: string) {
        const { data, error } = await supabase
            .from('ordenes_perfumes')
            .select('*, detalle_orden_perfumes(*, perfumes(*))')
            .eq('user_id', userId)
            .eq('finalizada', false)
            .order('created_at', { ascending: false }) // Trae la última creada
            .limit(1)
            .maybeSingle(); 

        if (error) throw error;
        return data;
    },

    async getShippingRates() {
        const { data, error } = await supabase.from('tarifas_envio').select('*');
        if (error) return [];
        return data;
    },

    async finalizeOrder(orderId: string, updateData: any) {
        // Blindamos el update para que solo afecte a la fila específica
        const { data, error } = await supabase
            .from('ordenes_perfumes')
            .update({ ...updateData, finalizada: true })
            .eq('id', orderId)
            .select()
            .maybeSingle(); // Cambiado de single a maybeSingle para evitar crash

        if (error) throw error;
        return data;
    }
};