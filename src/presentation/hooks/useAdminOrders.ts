import { useState, useEffect } from 'react';
import { adminRepository } from '@/src/infrastructure/database/adminRepository';

export const useAdminOrders = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const loadOrders = async () => {
        try {
            setLoading(true);
            const data = await adminRepository.getAllOrders();
            setOrders(data || []);
        } catch (error) {
            console.error("Error cargando órdenes:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadOrders();
    }, []);

    const handleUpdateStatus = async (orderId: string, status: string) => {
        try {
            await adminRepository.updateOrderStatus(orderId, status);
            await loadOrders(); 
        } catch (error) {
            alert("No se pudo actualizar el estado de la orden.");
        }
    };

    // NUEVA FUNCIÓN: Eliminar Orden con confirmación
    const handleDeleteOrder = async (orderId: string) => {
        const confirmar = window.confirm("¿Estás seguro de eliminar este pedido? Esta acción no se puede deshacer.");
        if (!confirmar) return;

        try {
            await adminRepository.deleteOrder(orderId);
            await loadOrders(); // Recargamos la tabla
        } catch (error: any) {
            // AHORA SÍ SABREMOS QUÉ PASA
            console.error("ERROR REAL AL ELIMINAR:", error);
            alert(`No se pudo eliminar. Supabase dice: ${error.message}`);
        }
    };
    return { orders, loading, handleUpdateStatus, handleDeleteOrder, refresh: loadOrders };
};