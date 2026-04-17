"use client";
import React from 'react';
import { useRouter } from "next/navigation";
import { Calculator, ArrowRight, Scale, Box, Shield, Clock } from 'lucide-react';

const PricingCard = ({ icon: Icon, title, subtitle }: { icon: any, title: string, subtitle: string }) => (
    <div className="bg-[#1a2633]/30 backdrop-blur-md border border-white/5 p-6 rounded-[2rem] flex flex-col items-center text-center hover:border-[#22c55e]/40 transition-all duration-500 group shadow-lg">
        <div className="w-12 h-12 bg-[#22c55e]/10 rounded-2xl flex items-center justify-center mb-4 text-[#22c55e] group-hover:scale-110 transition-transform">
            <Icon size={24} />
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
                    Tarifa plana y <span className="text-[#22c55e]">transparente</span>
                </h2>
                
                {/* Gran destaque de Tarifa GOSU */}
                <div className="inline-flex flex-col items-center justify-center bg-[#0b1118]/50 px-12 py-10 rounded-[3rem] border border-[#22c55e]/20 max-w-xl mx-auto shadow-2xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[#22c55e]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative z-10 text-center">
                        <div className="flex items-start justify-center">
                            <span className="text-[#22c55e] text-3xl md:text-4xl font-black mt-2">$</span>
                            <span className="text-[#22c55e] text-7xl md:text-9xl font-black leading-none">12</span>
                        </div>
                        <span className="block text-white font-black uppercase tracking-[0.3em] text-sm md:text-base mt-4 italic">
                            Por Kilogramo Neto
                        </span>
                        <div className="h-1 w-12 bg-[#22c55e] mx-auto mt-4 rounded-full" />
                        <span className="block text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-4">
                            Sin comisiones ocultas • Sin desaduanaje extra
                        </span>
                    </div>
                </div>
                
                <p className="text-slate-400 text-lg md:text-xl mt-12 font-medium max-w-3xl mx-auto leading-relaxed">
                    Olvídate de las matemáticas complejas. Pagas exactamente por el peso real de tu carga, sin cargos fijos adicionales.
                </p>
            </div>

            {/* Grid de beneficios actualizados con Lucide */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                <PricingCard icon={Scale} title="Peso neto real" subtitle="Cero peso volumétrico" />
                <PricingCard icon={Box} title="Consolidación" subtitle="Agrupa tus compras gratis" />
                <PricingCard icon={Shield} title="Seguro incluido" subtitle="Tu carga protegida" />
                <PricingCard icon={Clock} title="Express 3-7 días" subtitle="Vía aérea prioritaria" />
            </div>

            {/* Ejemplo de cálculo GOSU */}
            <div className="max-w-3xl mx-auto bg-[#111827]/80 backdrop-blur-xl border border-[#22c55e]/30 p-10 md:p-14 rounded-[3rem] shadow-[0_0_50px_-12px_rgba(34,197,94,0.2)] text-center relative overflow-hidden">
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#22c55e]/10 rounded-full blur-3xl pointer-events-none"></div>
                
                <div className="flex items-center justify-center gap-3 mb-6 text-[#22c55e] font-black uppercase tracking-[0.3em] text-xs">
                    <Calculator size={18} /> Ejemplo de matemática gosu
                </div>
                
                <div className="text-white text-3xl md:text-5xl font-black mb-6 tracking-tight italic uppercase leading-tight">
                    Paquete de 1.5 kg = <span className="text-[#22c55e]">$18.00</span>
                </div>
                
                {/* Desglose simplificado */}
                <div className="bg-[#0b1118]/80 border border-white/5 rounded-2xl p-6 mb-10 max-w-sm mx-auto text-left font-mono text-base text-slate-400">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-xs uppercase tracking-wider">Peso Real:</span>
                        <span className="text-white font-bold">1.50 kg</span>
                    </div>
                    <div className="flex justify-between items-center mb-4 pb-4 border-b border-white/10">
                        <span className="text-xs uppercase tracking-wider">Tarifa Unica:</span>
                        <span className="text-white font-bold">$12.00</span>
                    </div>
                    <div className="flex justify-between items-center text-[#22c55e] font-black text-2xl pt-2">
                        <span className="italic">TOTAL:</span>
                        <span>$18.00</span>
                    </div>
                </div>

                {/* BOTÓN */}
                <button 
                    onClick={() => router.push("/calculadora")}
                    className="group relative inline-flex items-center justify-center gap-4 w-full md:w-auto bg-[#22c55e] text-[#0b1118] px-12 py-6 rounded-2xl font-black text-xl hover:bg-[#1ea950] transition-all hover:scale-105 active:scale-95 shadow-[0_15px_45px_rgba(34,197,94,0.4)] uppercase italic"
                >
                    Cotizar ahora
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </button>
            </div>
        </section>
    );
}