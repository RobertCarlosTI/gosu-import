import React from 'react';
import { VipTier } from '@/src/domain/entities/VipTier';
import { ChevronRight, Zap } from 'lucide-react';

export const VipTierCard = ({ tier }: { tier: VipTier }) => (
    <div className={`relative flex flex-col p-8 md:p-10 rounded-[3.5rem] border transition-all duration-700 group overflow-hidden ${
        tier.isFeatured 
        ? 'bg-[#111827] border-[#22c55e]/50 shadow-[0_0_80px_-15px_rgba(34,197,94,0.2)] scale-105 z-20' 
        : 'bg-[#1a2633]/20 backdrop-blur-xl border-white/5 hover:border-[#22c55e]/30 z-10'
    }`}>
        
        {/* Luces de ambiente dinámicas */}
        <div className={`absolute -top-20 -right-20 w-48 h-48 rounded-full blur-[100px] transition-opacity duration-700 ${
            tier.isFeatured ? 'bg-[#22c55e]/15 opacity-100' : 'bg-[#22c55e]/5 opacity-0 group-hover:opacity-100'
        }`} />

        {tier.isFeatured && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#22c55e] to-[#1ea950] text-[#0b1118] text-[11px] font-black px-8 py-2 rounded-b-3xl uppercase tracking-[0.2em] shadow-lg shadow-[#22c55e]/20 z-30">
                MÁS RENTABLE
            </div>
        )}

        <div className="flex flex-col items-center text-center mb-8 relative z-10">
            {/* Contenedor de Icono Premium */}
            <div className={`w-24 h-24 rounded-[2.5rem] flex items-center justify-center text-5xl mb-6 relative transition-all duration-700 ${
                tier.isFeatured ? 'bg-gradient-to-br from-[#22c55e]/20 to-transparent' : 'bg-white/5'
            } group-hover:scale-110 group-hover:rotate-6`}>
                <span className="relative z-10 drop-shadow-2xl">{tier.icon}</span>
                {/* Glow del icono */}
                <div className={`absolute inset-0 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-40 transition-opacity bg-[#22c55e]`} />
            </div>

            <h3 className="text-white text-4xl font-black uppercase italic tracking-tighter mb-5 leading-none group-hover:text-[#22c55e] transition-colors">
                {tier.name}
            </h3>
            
            {/* BADGE DE VOLUMEN (DISEÑO CAPSULA) */}
            <div className="inline-flex flex-col items-center px-8 py-3 rounded-[2rem] bg-black/40 border border-white/10 backdrop-blur-md shadow-inner">
                <span className="text-[#22c55e] text-[10px] font-black uppercase tracking-[0.3em] mb-1 italic">
                    Mínimo kg al mes
                </span>
                <span className="text-white text-xl font-black tracking-tight">
                    {tier.range}
                </span>
            </div>
        </div>

        {/* ÁREA DE TARIFA (CENTRO DE ATENCIÓN) */}
        <div className="relative py-10 my-4 border-y border-white/5 group-hover:border-[#22c55e]/20 transition-colors duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#22c55e]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <span className="text-slate-500 text-[11px] font-black uppercase block mb-3 tracking-[0.5em] text-center opacity-70">
                TARIFA GOSU
            </span>
            
            <div className="flex items-center justify-center relative z-10">
                <span className="text-8xl font-black text-white leading-none tracking-tighter group-hover:scale-105 transition-transform duration-500">
                    {tier.pricePerKg.split('.')[0]}
                </span>
                <div className="flex flex-col items-start ml-1">
                    <span className="text-3xl font-black text-white leading-none">.{tier.pricePerKg.split('.')[1] || '00'}</span>
                    <span className="text-[#22c55e] text-2xl font-black italic mt-1">/KG</span>
                </div>
            </div>
        </div>

        {/* FOOTER - CTA INVISIBLE */}
        <div className="mt-8 flex flex-col items-center gap-5 relative z-10">
            <div className="flex items-center gap-3 text-slate-400 group-hover:text-white transition-all duration-300">
                <div className="w-8 h-[1px] bg-white/10 group-hover:bg-[#22c55e]/50 transition-colors" />
                <span className="text-[11px] font-black uppercase tracking-widest italic opacity-60 group-hover:opacity-100">
                    Peso Neto Real
                </span>
                <div className="w-8 h-[1px] bg-white/10 group-hover:bg-[#22c55e]/50 transition-colors" />
            </div>
            
            {/* Barra de progreso decorativa */}
            <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                <div className={`h-full bg-gradient-to-r from-[#22c55e] to-emerald-400 transition-all duration-1000 ease-out ${
                    tier.isFeatured ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
            </div>
        </div>

        {/* Brillo de borde interno (Inner Glow) */}
        <div className="absolute inset-0 rounded-[3.5rem] border border-white/5 pointer-events-none group-hover:border-[#22c55e]/20 transition-colors" />
    </div>
);