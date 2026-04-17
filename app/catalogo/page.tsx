"use client";
import React, { useState, useEffect } from 'react';
import { Droplets, Smartphone, Loader2, Lock, ArrowRight, UserPlus, Sparkles, ShieldCheck } from 'lucide-react';
import { useCatalogo } from "../../src/presentation/hooks/useCatalogo";
import { ImportBanner } from "@/src/presentation/components/catalogo/ImportBanner";
import { ProductCard } from "@/src/presentation/components/catalogo/ProductCard";
import { CartBottomBar } from "@/src/presentation/components/catalogo/CartBottomBar";
import { supabase } from '@/src/infrastructure/database/supabaseClient';
import Link from 'next/link';

export default function CatalogoPage() {
    const { 
        productos, carrito, config, timeLeft, loading, submitting, isClosed,
        totalItems, totalPrecio, canCheckout, minPerfumes, totalPerfumes,
        categoriaActiva, setCategoriaActiva, handleAdd, handleRemove, handleFinalizar 
    } = useCatalogo();

    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setIsAuthenticated(!!session);
        };
        checkAuth();
    }, []);

    if (loading || isAuthenticated === null) return (
        <div className="min-h-screen bg-[#070b12] flex flex-col items-center justify-center gap-4">
            <Loader2 className="animate-spin text-[#22c55e]" size={48} />
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] italic">Cargando Inventario GOSU...</span>
        </div>
    );

    if (!isAuthenticated) return (
        <div className="min-h-screen bg-[#070b12] flex flex-col items-center justify-center px-4 relative overflow-hidden">
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#22c55e]/5 rounded-full blur-[150px] pointer-events-none"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#22c55e]/5 rounded-full blur-[150px] pointer-events-none"></div>
            
            <div className="relative z-10 bg-[#111827]/40 border border-white/10 p-10 md:p-14 rounded-[4rem] max-w-lg w-full text-center backdrop-blur-3xl shadow-2xl">
                <div className="relative w-24 h-24 mx-auto mb-10">
                    <div className="absolute inset-0 bg-[#22c55e] blur-2xl opacity-20 animate-pulse"></div>
                    <div className="relative w-full h-full bg-gradient-to-tr from-[#22c55e] to-emerald-400 rounded-[2.5rem] flex items-center justify-center shadow-2xl rotate-6 group-hover:rotate-0 transition-transform duration-500">
                        <Lock className="text-[#070b12]" size={36} strokeWidth={2.5} />
                    </div>
                </div>
                
                <h1 className="text-4xl font-black text-white mb-6 leading-none uppercase italic tracking-tighter">
                    Catálogo <br /> <span className="text-[#22c55e]">Exclusivo</span>
                </h1>
                
                <p className="text-slate-400 text-base mb-12 leading-relaxed font-medium">
                    Precios de importación directa de Miami. <br />
                    <span className="text-white">Inicia sesión para ver el stock en tiempo real.</span>
                </p>

                <div className="space-y-5">
                    <Link 
                        href="/auth/register" 
                        className="flex items-center justify-center gap-3 w-full bg-[#22c55e] hover:bg-[#1ca850] text-[#070b12] font-black py-5 rounded-[2rem] transition-all uppercase tracking-widest text-xs shadow-[0_20px_40px_rgba(34,197,94,0.2)] hover:scale-[1.02] active:scale-95"
                    >
                        <UserPlus size={20} /> Crear mi cuenta gratis
                    </Link>
                    
                    <Link 
                        href="/auth/login" 
                        className="flex items-center justify-center w-full bg-white/5 hover:bg-white/10 text-white font-black py-5 rounded-[2rem] transition-all uppercase tracking-widest text-[10px] border border-white/10 hover:border-white/20 active:scale-95"
                    >
                        Acceder como Socio
                    </Link>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#070b12] text-white pt-28 pb-32 relative">
            {/* Luces de ambiente sutiles en el fondo del catálogo */}
            <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-[#22c55e]/5 rounded-full blur-[150px] pointer-events-none"></div>

            <div className="max-w-[1440px] mx-auto px-6 md:px-12">
                <ImportBanner config={config} timeLeft={timeLeft} isClosed={isClosed} />

                {/* SELECTOR DE CATEGORÍAS TIPO TABS */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 mt-12">
                    <div className="flex items-center gap-3">
                        <div className="p-1 bg-white/5 rounded-2xl flex gap-2 border border-white/5">
                            <button 
                                onClick={() => setCategoriaActiva('Perfumería')} 
                                className={`px-8 py-4 rounded-xl font-black italic text-xs flex items-center gap-2.5 transition-all ${categoriaActiva === 'Perfumería' ? 'bg-[#22c55e] text-[#070b12] shadow-lg shadow-[#22c55e]/20' : 'text-slate-500 hover:text-white'}`}
                            >
                                <Droplets size={16} /> PERFUMERÍA
                            </button>
                            <button 
                                onClick={() => setCategoriaActiva('iPhone')} 
                                className={`px-8 py-4 rounded-xl font-black italic text-xs flex items-center gap-2.5 transition-all ${categoriaActiva === 'iPhone' ? 'bg-[#22c55e] text-[#070b12] shadow-lg shadow-[#22c55e]/20' : 'text-slate-500 hover:text-white'}`}
                            >
                                <Smartphone size={16} /> IPHONE
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 px-4 py-2 bg-[#22c55e]/10 rounded-full border border-[#22c55e]/20 self-start md:self-auto">
                        <ShieldCheck size={14} className="text-[#22c55e]" />
                        <span className="text-[#22c55e] text-[9px] font-black uppercase tracking-widest italic">
                            Tarifa Plana GOSU: $12.00/KG
                        </span>
                    </div>
                </div>

                {/* GRID DE PRODUCTOS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {productos.map((prod: any) => (
                        <ProductCard 
                            key={prod.id} 
                            product={prod} 
                            qty={carrito[prod.id] || 0} 
                            onAdd={handleAdd} 
                            onRemove={handleRemove} 
                        />
                    ))}
                </div>

                {/* Mensaje de stock si está vacío */}
                {productos.length === 0 && (
                    <div className="py-32 text-center border-2 border-dashed border-white/5 rounded-[4rem]">
                        <p className="text-slate-500 font-black uppercase italic tracking-widest">Agotado temporalmente en esta categoría</p>
                    </div>
                )}
            </div>

            <CartBottomBar 
                totalItems={totalItems}
                totalPrecio={totalPrecio}
                canCheckout={canCheckout}
                minPerfumes={minPerfumes}
                currentPerfumes={totalPerfumes}
                submitting={submitting}
                onCheckout={handleFinalizar}
            />
        </div>
    );
}