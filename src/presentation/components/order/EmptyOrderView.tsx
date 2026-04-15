import React from 'react';
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export const EmptyOrderView = () => {
    return (
        <div className="min-h-screen bg-[#0b0f1a] flex flex-col items-center justify-center p-6 text-center pt-20">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10">
                <ShoppingBag size={40} className="text-slate-700" />
            </div>
            <h1 className="text-3xl font-black uppercase tracking-tighter italic text-white">Tu orden está vacía</h1>
            <p className="text-slate-500 mt-2 mb-8 max-w-xs">Explora nuestro catálogo y selecciona las mejores fragancias para importar.</p>
            <Link href="/catalogo" className="bg-amber-400 text-black font-black px-10 py-4 rounded-xl uppercase italic text-sm hover:scale-105 transition-transform shadow-[0_10px_30px_rgba(251,191,36,0.2)]">
                Ver Catálogo
            </Link>
        </div>
    );
};