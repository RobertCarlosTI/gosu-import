// src/infrastructure/services/whatsappService.ts

export const whatsappService = {
    /**
     * Envía el mensaje de pedido formateado a WhatsApp
     * @param order - Objeto con los datos del pedido (ID, cliente, dirección, etc)
     * @param items - Lista de productos seleccionados
     */
    sendOrderNotification(order: any, items: any[]) {
        const TELEFONO_WHATSAPP = '51926383191'; 
        
        // 1. Extraer ID corto
        const idCorto = order.id.substring(0, 6).toUpperCase();

        // 2. Determinar textos de envío
        const metodoPagoTexto = order.metodo_pago === 'yape_plin' ? 'Yape / Plin' : 'Transferencia Bancaria';
        
        const ubicacionTexto = order.tipo_envio === 'motorizado' 
            ? `${order.distrito}, Lima Metropolitana` 
            : `Provincia`;
            
        const direccionTexto = order.tipo_envio === 'motorizado' 
            ? order.direccion 
            : `Agencia Shalom: ${order.sucursal_shalom} (DNI: ${order.dni})`;

        // 3. Formatear lista de productos con el estilo solicitado
        const productosTexto = items.map(item => 
            `* ${item.perfumes?.name || item.nombre_perfume} x ${item.cantidad}`
        ).join('\n');

        // 4. Armar el mensaje final exacto
        const mensaje = `NUEVO PEDIDO GOSU #${idCorto}
Cliente: ${order.nombre_cliente}
Método de Pago: ${metodoPagoTexto}
Dirección: ${direccionTexto}
Ubicación: ${ubicacionTexto}
--------------------------
${productosTexto}
--------------------------
TOTAL: S/ ${order.inversion_total.toFixed(2)}
Por favor, confírmeme mi pedido.`;

        // 5. Ejecutar la redirección
        const url = `https://wa.me/${TELEFONO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
        window.open(url, '_blank');
    }
};