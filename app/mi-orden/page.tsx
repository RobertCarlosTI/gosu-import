"use client";
import React from 'react';
import { useOrder } from "@/src/presentation/hooks/useOrder";

// 🚩 CORRECCIÓN DE IMPORTS
import { OrderItemComponent } from "@/src/presentation/components/order/OrderItemComponent";
import { OrderSummary } from "@/src/presentation/components/order/OrderSummary";
import { EmptyOrderView } from "@/src/presentation/components/order/EmptyOrderView";

import { Package, Loader2, Clock, CheckCircle2 } from 'lucide-react';

export default function MiOrdenPage() {
    const { order, loading, subtotal, removeItem } = useOrder();

    if (loading) return (
        <div className="min-h-screen bg-[#0b0f1a] flex items-center justify-center">
            <Loader2 className="animate-spin text-amber-400" size={48} />
        </div>
    );

    // 🚩 AHORA EmptyOrderView ya está importado correctamente
    if (!order || order.items.length === 0) return <EmptyOrderView />;

    const isCart = !order.isFinalized;
    const shortId = order.id.substring(0, 6).toUpperCase();

    return (
        <div className="min-h-screen bg-[#0b0f1a] text-white pt-32 pb-20 selection:bg-amber-400/30">
            <div className="max-w-6xl mx-auto px-6">
                
                {/* Header dinámico */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <div>
                        <span className="text-amber-400 font-bold uppercase text-[10px] tracking-[0.3em] block mb-2">
                            {isCart ? 'Paso 1: Revisa tu selección' : 'Seguimiento de Inversión'}
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic">
                            {isCart ? 'MI CARRITO' : `ORDEN #${shortId}`}
                        </h1>
                    </div>

                    {!isCart && (
                        <div className="flex items-center gap-4 bg-[#161b22] border border-white/10 px-6 py-4 rounded-2xl">
                            <div className="text-right">
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Estado</p>
                                <p className={`font-black uppercase italic text-[11px] ${order.paymentStatus === 'Confirmado' ? 'text-green-500' : 'text-amber-400'}`}>
                                    {order.paymentStatus || 'Pendiente WhatsApp'}
                                </p>
                            </div>
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${order.paymentStatus === 'Confirmado' ? 'bg-green-500/20 text-green-500' : 'bg-amber-400/20 text-amber-400'}`}>
                                {order.paymentStatus === 'Confirmado' ? <CheckCircle2 size={28} /> : <Clock size={28} />}
                            </div>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Lista de Fragancias */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="bg-[#161b22]/50 border border-white/5 rounded-[2rem] overflow-hidden">
                            <div className="p-8 border-b border-white/5 bg-white/[0.02] flex justify-between items-center">
                                <h2 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                                    <Package size={18} className="text-amber-400" /> Detalle de Fragancias
                                </h2>
                                <span className="text-[10px] bg-white/10 px-3 py-1 rounded-full font-bold text-slate-400">
                                    {order.items.length} Items
                                </span>
                            </div>

                            <div className="divide-y divide-white/5">
                                {order.items.map((item) => (
                                    <OrderItemComponent 
                                        key={item.id} 
                                        item={item} 
                                        isCart={isCart} 
                                        onDelete={removeItem} 
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Resumen Económico */}
                    <div className="lg:col-span-5">
                        <OrderSummary 
                            order={order} 
                            subtotal={subtotal} 
                            isCart={isCart} 
                            shortId={shortId} 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}