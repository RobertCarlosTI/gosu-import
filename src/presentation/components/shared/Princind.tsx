"use client";
import React from 'react';
import { useRouter } from "next/navigation";
import { Calculator, ArrowRight } from 'lucide-react';

const PricingCard = ({ icon, title, subtitle }: { icon: string, title: string, subtitle: string }) => (
    <div className="bg-[#1a2633]/30 backdrop-blur-md border border-white/5 p-6 rounded-[2rem] flex flex-col items-center text-center hover:border-[#22c55e]/40 transition-all duration-500 group shadow-lg">
        <div className="w-12 h-12 bg-[#22c55e]/10 rounded-2xl flex items-center justify-center mb-4 text-[#22c55e] group-hover:scale-110 transition-transform">
            {icon === 'balance' && <span className="text-2xl">⚖️</span>}
            {icon === 'box' && <span className="text-2xl">📦</span>}
            {icon === 'shield' && <span className="text-2xl">🛡️</span>}
            {icon === 'clock' && <span className="text-2xl">🕒</span>}
        </div>
        <h4 className="text-white font-bold text-lg mb-1">{title}</h4>
        <p className="text-slate-400 text-sm font-medium">{subtitle}</p>
    </div>
);

export default function Pricing() {
    const router = useRouter();

    return (
        <section className="relative z-10 w-full max-w-6xl mx-auto py-24 px-4 bg-transparent">
            {/* Título de Tarifas */}
            <div className="text-center mb-16">
                <h2 className="text-white text-3xl md:text-5xl font-black mb-6 tracking-tight italic uppercase">
                    Tarifa clara y <span className="text-[#22c55e]">competitiva</span>
                </h2>
                
                {/* Nueva estructura de precio GOSU */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 bg-[#0b1118]/50 p-8 rounded-3xl border border-white/5 max-w-3xl mx-auto shadow-xl">
                    <div className="text-center">
                        <span className="text-[#22c55e] text-5xl md:text-7xl font-black">$9</span>
                        <span className="block text-slate-400 font-bold uppercase tracking-widest text-xs mt-2">Por Kilogramo</span>
                    </div>
                    <div className="text-slate-500 text-4xl font-black hidden md:block">+</div>
                    <div className="text-center">
                        <span className="text-white text-5xl md:text-7xl font-black">$9</span>
                        <span className="block text-slate-400 font-bold uppercase tracking-widest text-xs mt-2">Desaduanaje fijo</span>
                    </div>
                </div>
                
                <p className="text-slate-400 text-lg md:text-xl mt-8 font-medium max-w-3xl mx-auto leading-relaxed">
                    Pagas exactamente por lo que pesa tu paquete. Cero peso volumétrico oculto.
                </p>
            </div>

            {/* Grid de 4 beneficios */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                <PricingCard icon="balance" title="Peso neto real" subtitle="Cobro exacto sin redondeos" />
                <PricingCard icon="box" title="Consolidación" subtitle="Junta tus paquetes" />
                <PricingCard icon="shield" title="Trámite seguro" subtitle="Aduanas sin estrés" />
                <PricingCard icon="clock" title="Express 3-7 días" subtitle="Desde Miami a Lima" />
            </div>

            {/* Calculadora visual actualizada con la nueva tarifa */}
            <div className="max-w-3xl mx-auto bg-[#111827]/80 backdrop-blur-xl border border-[#22c55e]/30 p-10 md:p-14 rounded-[3rem] shadow-[0_0_50px_-12px_rgba(34,197,94,0.2)] text-center relative overflow-hidden">
                {/* Brillo de fondo verde */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#22c55e]/10 rounded-full blur-3xl pointer-events-none"></div>
                
                <div className="flex items-center justify-center gap-3 mb-6 text-[#22c55e] font-black uppercase tracking-[0.3em] text-xs">
                    <Calculator size={18} /> Ejemplo de cálculo real
                </div>
                
                <div className="text-white text-3xl md:text-5xl font-black mb-6 tracking-tight italic uppercase">
                    Paquete de 1.25 kg = <span className="text-[#22c55e]">$20.25</span>
                </div>
                
                {/* Desglose de la nueva matemática */}
                <div className="bg-[#0b1118]/80 border border-white/5 rounded-2xl p-5 mb-10 max-w-lg mx-auto text-left font-mono text-sm md:text-base text-slate-400">
                    <div className="flex justify-between mb-2">
                        <span>Peso (1.25 kg × $9):</span>
                        <span className="text-white">$11.25</span>
                    </div>
                    <div className="flex justify-between mb-2 pb-2 border-b border-white/10">
                        <span>Desaduanaje fijo:</span>
                        <span className="text-white">$9.00</span>
                    </div>
                    <div className="flex justify-between text-[#22c55e] font-bold text-lg pt-1">
                        <span>Total GOSU:</span>
                        <span>$20.25</span>
                    </div>
                </div>

                {/* BOTÓN PARA IR A LA CALCULADORA */}
                <button 
                    onClick={() => router.push("/calculadora")}
                    className="group relative inline-flex items-center justify-center gap-3 w-full md:w-auto bg-[#22c55e] text-[#0b1118] px-10 py-5 rounded-2xl font-black text-lg hover:bg-[#1ea950] transition-all hover:scale-105 active:scale-95 shadow-[0_10px_40px_rgba(34,197,94,0.3)] uppercase italic"
                >
                    Ir a la Calculadora
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </section>
    );
}