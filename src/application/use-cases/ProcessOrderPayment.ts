import { orderRepository } from "@/src/infrastructure/database/orderRepository";
import { whatsappService } from "@/src/infrastructure/services/whatsappService";

export const processOrderPayment = async (orderId: string, formData: any, detalles: any) => {
    try {
        // 1. Validar que el ID existe
        if (!orderId) throw new Error("No se encontró ID de orden");

        // 2. Finalizar en DB
        const ordenFinalizada = await orderRepository.finalizeOrder(orderId, {
            nombre_cliente: formData.nombre,
            telefono: formData.telefono,
            direccion: formData.direccion || null,
            distrito: formData.distrito || null,
            dni: formData.dni || null,
            sucursal_shalom: formData.sucursal || null,
            tipo_envio: formData.tipo_envio,
            costo_envio: formData.costo_envio,
            inversion_total: formData.inversion_total,
            metodo_pago: formData.metodo_pago,
            estado_pago: 'Pendiente WhatsApp'
        });

        // 3. Notificar por WhatsApp
        if (ordenFinalizada) {
            await whatsappService.sendOrderNotification(ordenFinalizada, detalles);
        }

        return ordenFinalizada;
    } catch (error) {
        console.error("Error en Caso de Uso:", error);
        throw error;
    }
};