import { supabase } from "./supabaseClient";

export const adminRepository = {
    // Gestión de Productos
    async getFullInventory() {
        const [p, i] = await Promise.all([
            supabase.from('perfumes').select('*').order('created_at', { ascending: false }),
            supabase.from('iphones').select('*').order('created_at', { ascending: false })
        ]);
        return [
            ...(p.data || []).map(prod => ({ ...prod, tablaOriginal: 'perfumes' })),
            ...(i.data || []).map(prod => ({ ...prod, tablaOriginal: 'iphones' }))
        ];
    },

    async getAllOrders() {
        const { data, error } = await supabase
            .from('ordenes_perfumes')
            .select(`
                *,
                detalle_orden_perfumes (
                    *,
                    perfumes (*)
                )
            `)
            // 👇 COMENTA ESTA LÍNEA TEMPORALMENTE 👇
            // .eq('finalizada', true) 
            .order('created_at', { ascending: false });

        if (error) {
            console.error("Error cargando órdenes:", error.message);
            throw error;
        }
        return data || [];
    },
    async getAdminStats() {
        const { data, error } = await supabase
            .from('ordenes_perfumes')
            .select('inversion_total, created_at')
            .eq('finalizada', true);
            
        if (error) throw error;
        return data;
    },
    async updateOrderStatus(orderId: string, status: string) {
        const { data, error } = await supabase
            .from('ordenes_perfumes')
            .update({ estado_pago: status })
            .eq('id', orderId)
            .select()
            .maybeSingle(); // Cambiado de .single() para evitar crasheos

        if (error) {
            console.error("Error actualizando estado:", error.message);
            throw error;
        }
        return data;
    },
    async deleteOrder(orderId: string) {
        // 1. PRIMERO: Borramos los perfumes asociados a esta orden
        // Nota: Asegúrate de que tu columna se llame 'orden_id' o cámbiala por el nombre correcto
        const { error: errorDetalles } = await supabase
            .from('detalle_orden_perfumes')
            .delete()
            .eq('orden_id', orderId); // Revisa si en tu BD se llama orden_id u ordenes_perfumes_id

        if (errorDetalles) {
            console.error("Error borrando detalles:", errorDetalles.message);
            throw errorDetalles;
        }

        // 2. SEGUNDO: Ahora sí, borramos la orden principal
        const { error: errorOrden } = await supabase
            .from('ordenes_perfumes')
            .delete()
            .eq('id', orderId);

        if (errorOrden) {
            console.error("Error eliminando la orden principal:", errorOrden.message);
            throw errorOrden;
        }
        
        return true;
    },
    async updateProduct(id: string, tabla: string, newPrice: number, isAvailable: boolean) {
        const { error } = await supabase
            .from(tabla)
            .update({ 
                price: newPrice, // <--- ¡AQUÍ ESTABA EL ERROR! Debe ser 'price', no 'precio'
                stock: isAvailable ? 100 : 0 
            })
            .eq('id', id);

        if (error) {
            console.error("Error real de Supabase:", error.message);
            throw error;
        }
        return true;
    },
    
    async deleteProduct(id: string, table: string) {
        return await supabase.from(table).delete().eq('id', id);
    },

    // Gestión de Usuarios
    async getAllUsers() {
        const { data } = await supabase.from('profiles').select('*').order('email');
        return data || [];
    },

    async updateUserRole(userId: string, role: string) {
        return await supabase.from('profiles').update({ role }).eq('id', userId);
    },

    // Configuración de Importación
    async getImportConfig() {
        // Usamos maybeSingle para que si la tabla está vacía no explote
        return await supabase.from('import_config').select('*').maybeSingle();
    },

    async updateImportConfig(config: any) {
        return await supabase.from('import_config').update(config).eq('id', 1);
    }
};