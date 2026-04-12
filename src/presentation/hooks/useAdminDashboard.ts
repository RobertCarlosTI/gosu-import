import { useState, useEffect } from 'react';
import { adminRepository } from '@/src/infrastructure/database/adminRepository';

export const useAdminDashboard = () => {
    const [stats, setStats] = useState({
        totalVentas: 0,
        pedidosPendientes: 0,
        pedidosCompletados: 0,
        clientesActivos: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const orders = await adminRepository.getAllOrders();
                
                const total = orders.reduce((acc, curr) => acc + Number(curr.inversion_total), 0);
                const pendientes = orders.filter(o => o.estado_pago !== 'Completado').length;
                const completados = orders.filter(o => o.estado_pago === 'Completado').length;
                
                // Contar clientes únicos
                const clientesUnicos = new Set(orders.map(o => o.user_id)).size;

                setStats({
                    totalVentas: total,
                    pedidosPendientes: pendientes,
                    pedidosCompletados: completados,
                    clientesActivos: clientesUnicos
                });
            } catch (error) {
                console.error("Error en Dashboard:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    return { stats, loading };
};