import React from 'react';

export default function VipClub() {
    return (
        <section className="relative z-10 w-full max-w-6xl mx-auto py-24 px-4 bg-transparent text-center">
            
            {/* Etiqueta Superior */}
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-amber-500/20 bg-amber-500/10 text-amber-400 text-sm font-medium mb-6">
                <span>👑</span> Programa exclusivo
            </div>

            {/* Títulos */}
            <h2 className="text-white text-3xl md:text-5xl font-bold mb-4 tracking-tight">
                Club VIP GOSU IMPORT
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-16">
                Tarifas exclusivas según tu nivel de cliente
            </p>

            {/* Grid de 4 Niveles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                
                {/* Bronce */}
                <div className="bg-[#1a2633]/40 backdrop-blur-md border border-white/5 p-8 rounded-[2rem] flex flex-col items-start text-left hover:border-white/20 transition-all duration-300">
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6 text-slate-400 text-xl">
                        ⭐
                    </div>
                    <h3 className="text-white text-xl font-bold mb-2">Bronce</h3>
                    <div className="text-white text-3xl font-black">$12<span className="text-lg text-slate-400 font-medium">/kg</span></div>
                </div>

                {/* Plata */}
                <div className="bg-[#1a2633]/40 backdrop-blur-md border border-white/5 p-8 rounded-[2rem] flex flex-col items-start text-left hover:border-white/20 transition-all duration-300">
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6 text-slate-300 text-xl">
                        🌟
                    </div>
                    <h3 className="text-white text-xl font-bold mb-2">Plata</h3>
                    <div className="text-white text-3xl font-black">$11<span className="text-lg text-slate-400 font-medium">/kg</span></div>
                </div>

                {/* Oro (Destacado en Verde GOSU) */}
                <div className="bg-[#111827]/80 backdrop-blur-xl border border-[#22c55e]/50 p-8 rounded-[2rem] flex flex-col items-start text-left shadow-[0_0_40px_-10px_rgba(34,197,94,0.3)] relative transform hover:-translate-y-2 transition-all duration-300 overflow-hidden">
                    {/* Brillo de fondo */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#22c55e]/10 blur-2xl rounded-full"></div>
                    
                    <div className="w-12 h-12 bg-[#22c55e]/20 rounded-2xl flex items-center justify-center mb-6 text-[#22c55e] text-2xl relative z-10">
                        👑
                    </div>
                    <h3 className="text-white text-xl font-bold mb-2 relative z-10">Oro</h3>
                    <div className="text-[#22c55e] text-4xl font-black mb-4 relative z-10">$10<span className="text-lg text-[#22c55e]/60 font-medium">/kg</span></div>
                    
                    <div className="bg-[#22c55e] text-[#0b1118] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider relative z-10">
                        Más popular
                    </div>
                </div>

                {/* Platino */}
                <div className="bg-[#1a2633]/40 backdrop-blur-md border border-white/5 p-8 rounded-[2rem] flex flex-col items-start text-left hover:border-white/20 transition-all duration-300">
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6 text-white text-xl">
                        ✨
                    </div>
                    <h3 className="text-white text-xl font-bold mb-2">Platino</h3>
                    <div className="text-white text-3xl font-black">$9<span className="text-lg text-slate-400 font-medium">/kg</span></div>
                </div>

            </div>

            {/* Enlace */}
            <button className="text-[#22c55e] font-medium hover:text-[#1ea950] transition-colors inline-flex items-center gap-2">
                Ver todos los beneficios <span>→</span>
            </button>

        </section>
    );
}