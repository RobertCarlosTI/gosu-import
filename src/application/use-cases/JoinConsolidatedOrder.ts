import { supabase } from "@/src/infrastructure/database/supabaseClient";

export const joinConsolidatedOrder = async (userId: string, cartData: any) => {
    const { totalPerfumes, totalPrecio, perfumesEnCarrito } = cartData;

    // Buscamos si ya existe una orden activa (limpiando duplicados mentalmente)
    const { data: ordenExistente } = await supabase
        .from('ordenes_perfumes')
        .select('id')
        .eq('user_id', userId)
        .eq('finalizada', false)
        .order('created_at', { ascending: false })
        .maybeSingle();

    let ordenId = ordenExistente?.id;

    if (!ordenId) {
        const { data: nuevaOrden, error } = await supabase.from('ordenes_perfumes').insert({
            user_id: userId,
            total_unidades: totalPerfumes,
            inversion_total: totalPrecio,
            estado_pago: 'Pendiente de Comprobante',
            finalizada: false
        }).select().single();
        if (error) throw error;
        ordenId = nuevaOrden.id;
    } else {
        await supabase.from('ordenes_perfumes').update({
            total_unidades: totalPerfumes,
            inversion_total: totalPrecio
        }).eq('id', ordenId);
    }

    // Limpiar y actualizar detalles
    await supabase.from('detalle_orden_perfumes').delete().eq('orden_id', ordenId);
    
    const detalles = perfumesEnCarrito.map((p: any) => ({
        orden_id: ordenId,
        perfume_id: p.id,
        nombre_perfume: p.name,
        cantidad: p.cantidad
    }));

    const { error: errD } = await supabase.from('detalle_orden_perfumes').insert(detalles);
    if (errD) throw errD;

    return ordenId;
};