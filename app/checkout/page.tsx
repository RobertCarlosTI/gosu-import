"use client";
import React from 'react';
import { Lock, Loader2, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useCheckout } from "@/src/presentation/hooks/useCheckout";
import { ShippingForm } from "@/src/presentation/components/checkout/ShippingForm";
import { OrderSummaryCard } from "@/src/presentation/components/checkout/OrderSummaryCard";

export default function CheckoutPage() {
    const { 
        ordenActiva, tarifasEnvio, tipoEnvio, setTipoEnvio,
        metodoPago, setMetodoPago, formData, setFormData,
        costoEnvio, totalPagar, handleFinalizarCompra, loading 
    } = useCheckout();

    if (loading) return (
        <div className="min-h-screen bg-[#0b0f1a] flex items-center justify-center">
            <Loader2 className="animate-spin text-amber-400" size={48} />
        </div>
    );

    return (
        <div className="min-h-screen bg-[#0b0f1a] text-white font-sans pt-32 pb-20">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                <div className="mb-10 border-b border-white/10 pb-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/catalogo" className="p-2 hover:bg-white/5 rounded-full">
                            <ChevronLeft size={24} />
                        </Link>
                        <h1 className="text-4xl font-black uppercase tracking-tighter italic">Checkout Seguro</h1>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 font-bold uppercase text-[10px] tracking-widest">
                        <Lock size={14} /> Transacción Encriptada
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-7 xl:col-span-8 space-y-10">
                        <ShippingForm 
                            tipoEnvio={tipoEnvio} 
                            setTipoEnvio={setTipoEnvio} 
                            formData={formData} 
                            setFormData={setFormData} 
                            tarifasEnvio={tarifasEnvio} 
                        />

                        {/* Sección de Pago */}
                        <div className="space-y-4 pt-6 border-t border-white/5">
                            <h2 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-amber-400 text-black flex items-center justify-center text-sm">2</div>
                                Método de Pago
                            </h2>
                            <div className="border border-white/10 rounded-2xl overflow-hidden bg-[#15171a]">
                                <div onClick={() => setMetodoPago('yape_plin')} className={`p-6 cursor-pointer flex items-center gap-4 ${metodoPago === 'yape_plin' ? 'bg-[#1c2026]' : ''}`}>
                                    <div className={`w-5 h-5 rounded-full border-2 ${metodoPago === 'yape_plin' ? 'border-amber-400 flex items-center justify-center' : 'border-slate-500'}`}>
                                        {metodoPago === 'yape_plin' && <div className="w-2.5 h-2.5 bg-amber-400 rounded-full" />}
                                    </div>
                                    <span className="font-bold">Yape / Plin</span>
                                </div>
                                <div onClick={() => setMetodoPago('transferencia')} className={`p-6 cursor-pointer flex items-center gap-4 border-t border-white/5 ${metodoPago === 'transferencia' ? 'bg-[#1c2026]' : ''}`}>
                                    <div className={`w-5 h-5 rounded-full border-2 ${metodoPago === 'transferencia' ? 'border-amber-400 flex items-center justify-center' : 'border-slate-500'}`}>
                                        {metodoPago === 'transferencia' && <div className="w-2.5 h-2.5 bg-amber-400 rounded-full" />}
                                    </div>
                                    <span className="font-bold">Transferencia Bancaria</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-5 xl:col-span-4">
                        <OrderSummaryCard 
                            items={ordenActiva?.detalle_orden_perfumes || []}
                            subtotal={ordenActiva?.inversion_total || 0}
                            costoEnvio={costoEnvio}
                            total={totalPagar}
                            tipoEnvio={tipoEnvio}
                            onFinalize={handleFinalizarCompra}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}