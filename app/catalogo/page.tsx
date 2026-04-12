"use client";
import React from 'react';
import { Droplets, Smartphone, Loader2 } from 'lucide-react';
import { useCatalogo } from "../../src/presentation/hooks/useCatalogo";
import { ImportBanner } from "@/src/presentation/components/catalogo/ImportBanner";
import { ProductCard } from "@/src/presentation/components/catalogo/ProductCard";
import { CartBottomBar } from "@/src/presentation/components/catalogo/CartBottomBar";

export default function CatalogoPage() {
    const { 
        productos, carrito, config, timeLeft, loading, submitting, isClosed,
        totalItems, totalPrecio, canCheckout, minPerfumes, totalPerfumes,
        categoriaActiva, setCategoriaActiva, handleAdd, handleRemove, handleFinalizar 
    } = useCatalogo();

    if (loading) return (
        <div className="min-h-screen bg-[#070b12] flex items-center justify-center">
            <Loader2 className="animate-spin text-[#22c55e]" size={48} />
        </div>
    );

    return (
        <div className="min-h-screen bg-[#070b12] text-white pt-28 pb-32">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                {/* Error de isClosed solucionado aquí */}
                <ImportBanner config={config} timeLeft={timeLeft} isClosed={isClosed} />

                <div className="flex items-center gap-4 mb-6">
                    <button onClick={() => setCategoriaActiva('Perfumería')} className={`px-8 py-4 rounded-2xl font-black italic text-sm flex items-center gap-2 transition-all ${categoriaActiva === 'Perfumería' ? 'bg-[#22c55e] text-[#070b12]' : 'bg-white/5 text-slate-400'}`}>
                        <Droplets size={20} /> PERFUMERÍA
                    </button>
                    <button onClick={() => setCategoriaActiva('iPhone')} className={`px-8 py-4 rounded-2xl font-black italic text-sm flex items-center gap-2 transition-all ${categoriaActiva === 'iPhone' ? 'bg-[#22c55e] text-[#070b12]' : 'bg-white/5 text-slate-400'}`}>
                        <Smartphone size={20} /> IPHONE
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {productos.map((prod: any) => ( // Tipado 'any' solucionado
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

            {/* Error de propiedades faltantes solucionado aquí */}
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