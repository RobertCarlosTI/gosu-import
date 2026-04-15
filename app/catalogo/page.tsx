"use client";
import React, { useState, useEffect } from 'react';
import { Droplets, Smartphone, Loader2, Lock, ArrowRight, UserPlus } from 'lucide-react';
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

    // 🔐 Estado para controlar el acceso
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setIsAuthenticated(!!session);
        };
        checkAuth();
    }, []);

    // 1. Pantalla de Carga (Skeletor)
    if (loading || isAuthenticated === null) return (
        <div className="min-h-screen bg-[#070b12] flex items-center justify-center">
            <Loader2 className="animate-spin text-[#22c55e]" size={48} />
        </div>
    );

    // 2. Muro de Seguridad: Si el cliente NO está logueado
    if (!isAuthenticated) return (
        <div className="min-h-screen bg-[#070b12] flex flex-col items-center justify-center px-4 relative overflow-hidden">
            {/* Luces de fondo estilo "Gosu" */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#22c55e]/5 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#22c55e]/5 rounded-full blur-[120px] pointer-events-none"></div>
            
            <div className="relative z-10 bg-white/[0.03] border border-white/10 p-8 md:p-12 rounded-[3rem] max-w-md w-full text-center backdrop-blur-2xl shadow-2xl">
                <div className="w-20 h-20 bg-gradient-to-tr from-[#22c55e] to-emerald-400 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(34,197,94,0.2)] rotate-3">
                    <Lock className="text-[#070b12]" size={32} strokeWidth={2.5} />
                </div>
                
                <h1 className="text-3xl font-black text-white mb-4 leading-tight uppercase italic tracking-tighter">
                    Acceso Restringido
                </h1>
                
                <p className="text-slate-400 text-sm mb-10 leading-relaxed font-medium">
                    Nuestro catálogo de importación directa y precios exclusivos son solo para miembros registrados.
                </p>

                <div className="space-y-4">
                    {/* BOTÓN REGISTRO (Llamativo) */}
                    <Link 
                        href="/auth/register" 
                        className="flex items-center justify-center gap-3 w-full bg-[#22c55e] hover:bg-[#1ca850] text-[#070b12] font-black py-4 rounded-2xl transition-all uppercase tracking-widest text-xs group shadow-[0_10px_30px_rgba(34,197,94,0.15)] active:scale-95"
                    >
                        <UserPlus size={18} />
                        Unirse a la Comunidad
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                    
                    {/* BOTÓN LOGIN (Sutil) */}
                    <Link 
                        href="/auth/login" 
                        className="flex items-center justify-center w-full bg-white/5 hover:bg-white/10 text-white font-bold py-4 rounded-2xl transition-all uppercase tracking-widest text-[10px] border border-white/5 active:scale-95"
                    >
                        Ya soy socio, iniciar sesión
                    </Link>
                </div>
                
                <p className="mt-8 text-[9px] text-slate-600 uppercase tracking-[0.2em] font-bold">
                    Gosu Import • International Logistics
                </p>
            </div>
        </div>
    );

    // 3. Catálogo Real (Solo se renderiza si isAuthenticated es TRUE)
    return (
        <div className="min-h-screen bg-[#070b12] text-white pt-28 pb-32">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <ImportBanner config={config} timeLeft={timeLeft} isClosed={isClosed} />

                <div className="flex items-center gap-4 mb-6">
                    <button 
                        onClick={() => setCategoriaActiva('Perfumería')} 
                        className={`px-8 py-4 rounded-2xl font-black italic text-sm flex items-center gap-2 transition-all ${categoriaActiva === 'Perfumería' ? 'bg-[#22c55e] text-[#070b12]' : 'bg-white/5 text-slate-400'}`}
                    >
                        <Droplets size={20} /> PERFUMERÍA
                    </button>
                    <button 
                        onClick={() => setCategoriaActiva('iPhone')} 
                        className={`px-8 py-4 rounded-2xl font-black italic text-sm flex items-center gap-2 transition-all ${categoriaActiva === 'iPhone' ? 'bg-[#22c55e] text-[#070b12]' : 'bg-white/5 text-slate-400'}`}
                    >
                        <Smartphone size={20} /> IPHONE
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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