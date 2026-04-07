import React from 'react';

export default function OurWork() {
    return (
        <section className="relative z-10 w-full max-w-6xl mx-auto py-24 px-4 bg-transparent text-center">
            {/* Etiqueta superior */}
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-[#1a2633]/50 text-slate-300 text-sm font-medium mb-6">
                <span className="text-[#22c55e]">📦</span> +500 entregas exitosas
            </div>
            
            <h2 className="text-white text-3xl md:text-5xl font-bold mb-4 tracking-tight">Nuestro Trabajo</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-16">Miles de clientes satisfechos reciben sus paquetes cada semana. Mira cómo trabajamos.</p>

            {/* SECCIÓN VIDEOS */}
            <div className="text-left mb-12">
                <div className="flex items-center gap-3 mb-6">
                    {/* El rojo se mantiene aquí porque es el estándar para videos (tipo YouTube) */}
                    <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center text-red-400">▶</div>
                    <h3 className="text-white text-2xl font-bold">Videos de Entregas</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="bg-[#111827]/60 border border-white/5 rounded-3xl aspect-[4/3] flex flex-col items-center justify-center cursor-pointer hover:border-white/20 transition-all group backdrop-blur-sm">
                            <div className="w-14 h-14 bg-red-500/20 rounded-full flex items-center justify-center text-red-400 group-hover:bg-red-500/40 group-hover:scale-110 transition-all">▶</div>
                            <span className="text-slate-400 mt-4 text-sm font-medium">Video próximamente</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* SECCIÓN FOTOS */}
            <div className="text-left mb-16">
                <div className="flex items-center gap-3 mb-6">
                    {/* Actualizado al verde GOSU */}
                    <div className="w-10 h-10 bg-[#22c55e]/20 rounded-xl flex items-center justify-center text-[#22c55e]">📦</div>
                    <h3 className="text-white text-2xl font-bold">Fotos de Paquetes</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 group cursor-pointer">
                        <img src="https://images.unsplash.com/photo-1580674285054-bed31e145f59?q=80&w=500&auto=format&fit=crop" alt="Entrega exitosa" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100" />
                    </div>
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="bg-[#111827]/40 border border-white/5 rounded-2xl aspect-[4/5] flex items-center justify-center">
                            <span className="text-slate-600 text-sm">Más fotos pronto</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}