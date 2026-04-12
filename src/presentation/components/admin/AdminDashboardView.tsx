"use client";
import React from 'react';
import { useAdminDashboard } from "@/src/presentation/hooks/useAdminDashboard";
import { DollarSign, ShoppingBag, CheckCircle, Users, Loader2 } from 'lucide-react';

export const AdminDashboardView = () => {
    const { stats, loading } = useAdminDashboard();

    if (loading) return (
        <div className="flex items-center justify-center p-20">
            <Loader2 className="animate-spin text-amber-400" size={32} />
        </div>
    );

    const cards = [
        { label: 'Ventas Totales', value: `S/ ${Number(stats.totalVentas).toFixed(2)}`, icon: DollarSign, color: 'text-green-400', bg: 'bg-green-400/10' },
        { label: 'Pendientes', value: stats.pedidosPendientes, icon: ShoppingBag, color: 'text-amber-400', bg: 'bg-amber-400/10' },
        { label: 'Completados', value: stats.pedidosCompletados, icon: CheckCircle, color: 'text-blue-400', bg: 'bg-blue-400/10' },
        { label: 'Clientes VIP', value: stats.clientesActivos, icon: Users, color: 'text-purple-400', bg: 'bg-purple-400/10' },
    ];

    return (
        <div className="animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card, i) => (
                    <div key={i} className="bg-[#161b22] border border-white/5 p-8 rounded-[2rem] shadow-2xl">
                        <div className={`w-12 h-12 ${card.bg} ${card.color} rounded-2xl flex items-center justify-center mb-6`}>
                            <card.icon size={24} />
                        </div>
                        <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">{card.label}</p>
                        <p className="text-3xl font-black italic text-white tracking-tighter">{card.value}</p>
                    </div>
                ))}
            </div>

            <div className="mt-8 bg-[#161b22] rounded-[2.5rem] p-10 border border-white/5">
                <h3 className="text-xl font-black uppercase italic mb-4">Estado de Importaciones</h3>
                <p className="text-slate-500 text-sm font-bold uppercase italic tracking-widest">Gosu Import Logistics - Resumen Operativo</p>
                <div className="h-32 mt-6 bg-black/20 rounded-3xl border border-dashed border-white/10 flex items-center justify-center italic text-slate-700 font-bold uppercase text-xs">
                    Gráficos de rendimiento en desarrollo...
                </div>
            </div>
        </div>
    );
};