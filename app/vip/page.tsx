"use client";
import React from 'react';
import { useRouter } from "next/navigation";
import { Building2, ArrowRight } from 'lucide-react';
import { getVipTiers } from '@/src/application/use-cases/GetVipTiers';
import { VipTierCard } from '@/src/presentation/components/vip/VipTierCard';

export default function VipPage() {
    const router = useRouter();
    const tiers = getVipTiers();

    return (
        <main className="flex flex-col min-h-screen pt-24 overflow-x-hidden bg-[#0b1118] relative">
            {/* Fondo de Estrellas */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 opacity-30" style={{ backgroundImage: `radial-gradient(1.5px 1.5px at 15% 15%, white, transparent), radial-gradient(1px 1px at 25% 45%, white, transparent), radial-gradient(2px 2px at 45% 75%, white, transparent)`, backgroundSize: '400px 400px' }}></div>
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#22c55e]/5 rounded-full blur-[150px]"></div>
            </div>

            {/* Hero VIP - Actualizado a la nueva lógica de negocio */}
            <section className="relative z-10 max-w-4xl mx-auto text-center px-4 pt-10 pb-16">
                <div className="w-20 h-20 bg-amber-500/10 border border-amber-500/20 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-8 shadow-[0_0_30px_rgba(245,158,11,0.2)]">👑</div>
                <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight italic uppercase">
                    Cuanto más traes, <span className="text-[#22c55e]">menos pagas</span>
                </h1>
                <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
                    Únete al Club VIP de GOSU IMPORT. Iniciamos con la tarifa plana de <span className="text-white font-bold">$12.00/kg</span> y reducimos tu costo de envío hasta los <span className="text-[#22c55e] font-bold">$9.50/kg</span> según tu volumen mensual.
                </p>
            </section>

            {/* Grid de Tiers - Diseño Limpio */}
            <section className="relative z-10 w-full max-w-7xl mx-auto px-4 pb-24 pt-10">
                <div className="text-center mb-16">
                    <p className="text-[#22c55e] text-sm font-black uppercase tracking-widest bg-[#22c55e]/10 inline-block px-6 py-3 rounded-full border border-[#22c55e]/20">
                        Tarifa Estándar: $12.00 / Kilogramo Neto
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch mb-32">
                    {tiers.map(tier => (
                        <VipTierCard key={tier.id} tier={tier} />
                    ))}
                </div>

                {/* Sección Corporativa */}
                <div className="relative group overflow-hidden bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-[3rem] p-8 md:p-14 shadow-2xl transition-all duration-500 hover:border-amber-500/30 mb-32 text-center md:text-left">
                     <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-amber-500/5 to-transparent pointer-events-none" />
                     <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                        <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-amber-600 rounded-[2rem] flex items-center justify-center shadow-[0_0_50px_rgba(245,158,11,0.3)]">
                            <Building2 className="text-white w-12 h-12" />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-white text-3xl md:text-5xl font-black italic uppercase mb-4">Membresía VIP Corporativa</h2>
                            <p className="text-slate-400 text-lg mb-8 font-medium">Tarifas personalizadas, facturación y atención dedicada para clientes con grandes volúmenes de importación.</p>
                            <button className="bg-amber-500 text-slate-950 px-8 py-4 rounded-2xl font-black text-lg hover:bg-amber-400 transition-all flex items-center gap-3 mx-auto md:mx-0 italic uppercase">
                                Solicitar información <ArrowRight size={20} />
                            </button>
                        </div>
                     </div>
                </div>

                {/* Call to Action Final */}
                <div className="flex flex-col items-center text-center">
                    <h2 className="text-white text-4xl md:text-5xl font-black mb-4 italic uppercase tracking-tighter">
                        ¿Listo para <span className="text-[#22c55e]">comenzar?</span>
                    </h2>
                    <p className="text-slate-400 text-lg md:text-xl font-medium mb-10 max-w-xl">
                        Regístrate hoy y empieza a acumular kilogramos para subir de nivel.
                    </p>
                    <button 
                        onClick={() => router.push("/register")}
                        className="group relative flex items-center gap-3 bg-[#22c55e] text-[#0b1118] px-12 py-6 rounded-2xl font-black text-xl hover:bg-[#1ea950] transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_-12px_rgba(34,197,94,0.5)] uppercase italic"
                    >
                        Obtener mi casillero gratis
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                    </button>
                </div>
                
            </section>
        </main>
    );
}