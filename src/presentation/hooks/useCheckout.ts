import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/src/infrastructure/database/supabaseClient';
import { orderRepository } from '@/src/infrastructure/database/orderRepository';
import { whatsappService } from '@/src/infrastructure/services/whatsappService';

export const useCheckout = () => {
    const router = useRouter();
    const [ordenActiva, setOrdenActiva] = useState<any>(null);
    const [tarifasEnvio, setTarifasEnvio] = useState<any[]>([]);
    const [tipoEnvio, setTipoEnvio] = useState<'motorizado' | 'shalom'>('motorizado');
    const [metodoPago, setMetodoPago] = useState('yape_plin'); 
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        nombre: '', telefono: '', direccion: '', distrito: '', dni: '', sucursal: ''
    });

    useEffect(() => {
        const init = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                if (!session) return router.push('/login');

                // Traemos los datos de la infraestructura (Hexagonal)
                const [orden, tarifas] = await Promise.all([
                    orderRepository.getActiveOrder(session.user.id),
                    orderRepository.getShippingRates()
                ]);

                if (orden) {
                    setOrdenActiva(orden);
                }
                setTarifasEnvio(tarifas || []);
            } catch (error: any) {
                // Evitamos el [object Object] imprimiendo solo el mensaje
                console.error("Error inicializando checkout:", error.message || error);
            } finally {
                setLoading(false);
            }
        };
        init();
    }, [router]);

    // --- LÓGICA DE NEGOCIO REACTIVA ---
    // Se recalcula automáticamente cuando cambian los datos del formulario o la orden
    const { costoEnvio, subtotal, totalPagar } = useMemo(() => {
        // Buscamos la tarifa que coincida con el distrito seleccionado
        const tarifa = tarifasEnvio.find(
            t => t.distrito.toLowerCase() === formData.distrito.toLowerCase()
        );

        const sub = Number(ordenActiva?.inversion_total || 0);
        const envio = (tipoEnvio === 'motorizado' && tarifa) ? Number(tarifa.precio) : 0;
        const total = sub + envio;

        return { 
            costoEnvio: envio, 
            subtotal: sub, 
            totalPagar: total 
        };
    }, [tarifasEnvio, formData.distrito, tipoEnvio, ordenActiva]);

    const handleFinalizarCompra = async () => {
        // 1. FILTRO DE SEGURIDAD: Evita que el código colapse si no hay orden
        if (!ordenActiva || !ordenActiva.id) {
            return alert("Tu carrito está vacío o la orden ya fue procesada. Agrega productos desde el catálogo.");
        }

        if (!formData.nombre || !formData.telefono) {
            return alert("Por favor, completa Nombre y Teléfono.");
        }
        
        try {
            setLoading(true);
            
            // 2. Finalizar en base de datos
            const ordenFinalizada = await orderRepository.finalizeOrder(ordenActiva.id, {
                inversion_total: totalPagar,
                estado_pago: 'Pendiente WhatsApp',
                nombre_cliente: formData.nombre,
                telefono: formData.telefono,
                tipo_envio: tipoEnvio,
                direccion: formData.direccion,
                distrito: formData.distrito,
                dni: formData.dni,
                sucursal_shalom: formData.sucursal,
                costo_envio: costoEnvio,
                metodo_pago: metodoPago
            });

            // 3. Notificación de WhatsApp
            if (ordenFinalizada) {
                whatsappService.sendOrderNotification(ordenFinalizada, ordenActiva.detalle_orden_perfumes);
            }

            // 4. Redirección al éxito
            router.push('/mi-orden');
            
        } catch (error: any) {
            // AQUÍ IMPRIMIMOS EL ERROR REAL PARA SABER QUÉ BLOQUEA LA COMPRA
            console.error("ERROR REAL DE SUPABASE:", error);
            alert(`Error al procesar: ${error.message || "Problema de permisos en la base de datos (RLS)."}`);
        } finally {
            setLoading(false);
        }
    };

    return {
        ordenActiva,
        tarifasEnvio,
        tipoEnvio,
        setTipoEnvio,
        metodoPago,
        setMetodoPago,
        formData,
        setFormData,
        costoEnvio,
        subtotal,     // <--- Exportado para el resumen
        totalPagar,
        handleFinalizarCompra,
        loading
    };
};