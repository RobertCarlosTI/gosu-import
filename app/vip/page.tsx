"use client";
import React from 'react';
import { useRouter } from "next/navigation";
import { Building2, Crown, ArrowRight, ShieldCheck, Zap, Star, ChevronDown } from 'lucide-react';

// --- 1. FUNCIÓN PRINCIPAL (La página) ---
export default function VipPage() {
    const router = useRouter();

    return (
        <main className="flex flex-col min-h-screen pt-24 overflow-x-hidden bg-[#0b1118] relative">

            {/* Fondo de Estrellas */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 opacity-30"
                    style={{
                        backgroundImage: `radial-gradient(1.5px 1.5px at 15% 15%, white, transparent),
                                radial-gradient(1px 1px at 25% 45%, white, transparent),
                                radial-gradient(2px 2px at 45% 75%, white, transparent),
                                radial-gradient(1.5px 1.5px at 65% 25%, white, transparent),
                                radial-gradient(1px 1px at 85% 35%, white, transparent),
                                radial-gradient(2px 2px at 95% 65%, white, transparent),
                                radial-gradient(1.2px 1.2px at 35% 85%, white, transparent)`,
                        backgroundSize: '400px 400px'
                    }}>
                </div>
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#22c55e]/5 rounded-full blur-[150px]"></div>
            </div>

            {/* CONTENIDO VIP (Hero) */}
            <section className="relative z-10 max-w-4xl mx-auto text-center px-4 pt-10 pb-16">
                <div className="w-20 h-20 bg-amber-500/10 border border-amber-500/20 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-8 shadow-[0_0_30px_rgba(245,158,11,0.2)]">
                    👑
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight italic uppercase">
                    La lealtad baja <span className="text-amber-400">tus costos</span>
                </h1>
                <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
                    En GOSU IMPORT valoramos tu confianza. Mantienes tu tarifa de $9/kg y reducimos drásticamente tu costo fijo de desaduanaje.
                </p>
            </section>

            {/* SECCIÓN DE NIVELES (CON LA TARIFA 9 + X) */}
            <section className="relative z-10 w-full max-w-7xl mx-auto px-4 pb-24 pt-10">
                
                {/* Recordatorio de tarifa normal */}
                <div className="text-center mb-16">
                    <p className="text-[#22c55e] text-sm font-black uppercase tracking-widest bg-[#22c55e]/10 inline-block px-5 py-2.5 rounded-full border border-[#22c55e]/20">
                        Tarifa normal sin VIP: $9/kg + $9 fijo
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch mb-32">
                    <VipTier 
                        name="Bronce" icon="⭐" range="0 - 200 kg" price="$9" customsFee="$7" iconColor="text-orange-400"
                        features={["Consolidación hasta 5 paquetes", "Soporte por WhatsApp", "Tracking en tiempo real"]}
                    />
                    <VipTier 
                        name="Plata" icon="🌟" range="200 - 400 kg" price="$9" customsFee="$5" iconColor="text-slate-300"
                        features={["Consolidación hasta 7 paquetes", "Atención prioritaria", "Tracking en tiempo real"]}
                    />
                    {/* EL NIVEL ESTRELLA 9+4 */}
                    <VipTier 
                        name="Oro" icon="👑" range="400 - 600 kg" price="$9" customsFee="$4" isFeatured={true} iconColor="text-[#22c55e]"
                        features={["Consolidación ilimitada", "Asesor personal asignado", "Prioridad en despachos"]}
                    />
                    <VipTier 
                        name="Platino" icon="💎" range="800 + kg" price="$9" 
                        features={["¡Desaduanaje GRATIS!", "Prioridad máxima en vuelos", "Atención 24/7"]}
                    />
                </div>

                {/* VIP CORPORATIVA */}
                <div className="relative group overflow-hidden bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-[3rem] p-8 md:p-14 shadow-2xl transition-all duration-500 hover:border-amber-500/30 mb-32">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-amber-500/5 to-transparent pointer-events-none" />
                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-10 md:gap-16">
                        <div className="relative shrink-0">
                            <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-amber-600 rounded-[2rem] flex items-center justify-center shadow-[0_0_50px_rgba(245,158,11,0.3)]">
                                <Building2 className="text-white w-12 h-12" />
                            </div>
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6 font-black uppercase text-[10px] text-amber-500 tracking-widest">
                                Para Empresas
                            </div>
                            <h2 className="text-white text-3xl md:text-5xl font-black mb-6 italic uppercase">Membresía VIP Corporativa</h2>
                            <p className="text-slate-400 text-lg mb-10 font-medium">Tarifas personalizadas, facturación mensual y atención dedicada para grandes volúmenes.</p>
                            <button className="bg-amber-500 text-slate-950 px-8 py-4 rounded-2xl font-black text-lg hover:bg-amber-400 transition-all flex items-center gap-3 mx-auto md:mx-0 italic uppercase">
                                Solicitar información <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* --- SECCIÓN DE PREGUNTAS FRECUENTES (FAQ) --- */}
                <div className="max-w-4xl mx-auto pt-20 pb-32">
                    <div className="text-center mb-16">
                        <h2 className="text-white text-3xl md:text-5xl font-black mb-4 italic uppercase tracking-tight">Preguntas frecuentes</h2>
                        <p className="text-slate-400 font-medium">Todo lo que necesitas saber sobre el Club VIP</p>
                    </div>

                    <div className="space-y-4">
                        <FaqItem 
                            question="¿El Club VIP tiene algún costo?" 
                            answer="No, el Club VIP es completamente gratuito. Simplemente al registrarte como cliente ya eres parte del club y tu tarifa se ajusta automáticamente según tu volumen mensual." 
                        />
                        <FaqItem 
                            question="¿Cómo se calcula mi volumen mensual?" 
                            answer="Sumamos todos los kilogramos de tus paquetes que fueron procesados durante el mes calendario. El nivel se actualiza al inicio de cada mes." 
                        />
                        <FaqItem 
                            question="¿Puedo bajar de nivel?" 
                            answer="Sí, tu nivel se ajusta mensualmente según tu actividad. Si un mes envías menos, tu tarifa de desaduanaje se ajustará al nivel correspondiente." 
                        />
                        <FaqItem 
                            question="¿Cuál es la diferencia con la VIP Corporativa?" 
                            answer="La Corporativa es para empresas con contratos, crédito y volúmenes muy altos. El Club VIP es automático para todos." 
                        />
                    </div>
                </div>

                {/* --- SECCIÓN FINAL --- */}
                <div className="flex flex-col items-center text-center">
                    {/* Título con estilo GOSU */}
                    <h2 className="text-white text-4xl md:text-5xl font-black mb-4 italic uppercase tracking-tighter">
                        ¿Listo para <span className="text-[#22c55e]">comenzar?</span>
                    </h2>
                    
                    {/* Subtexto limpio */}
                    <p className="text-slate-400 text-lg md:text-xl font-medium mb-10 max-w-xl leading-relaxed">
                        Regístrate gratis y comienza a disfrutar de todos los beneficios exclusivos del <span className="text-white">Club VIP</span>.
                    </p>

                    {/* Botón Estilo Moderno */}
                    <button 
                        onClick={() => router.push("/register")}
                        className="group relative flex items-center gap-3 bg-[#22c55e] text-[#0b1118] px-10 py-5 rounded-2xl font-black text-xl hover:bg-[#1ea950] transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_-12px_rgba(34,197,94,0.5)] uppercase italic"
                    >
                        Registrarse ahora
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                        
                        {/* Destello sutil alrededor del botón */}
                        <div className="absolute inset-0 rounded-2xl bg-[#22c55e]/20 blur-xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>

                    {/* Decoración inferior sutil */}
                    <div className="mt-16 w-24 h-1 bg-gradient-to-r from-transparent via-[#22c55e]/20 to-transparent rounded-full" />
                </div>
            </section>
        </main>
    );
}

// --- 2. SUB-COMPONENTES (Van AFUERA de la función principal) ---

const FaqItem = ({ question, answer }: { question: string, answer: string }) => (
    <div className="bg-[#1a2633]/40 backdrop-blur-md border border-white/5 p-8 rounded-[2rem] hover:border-[#22c55e]/20 transition-all duration-300">
        <h3 className="text-[#22c55e] text-xl font-bold mb-3 flex items-center gap-3 italic">
            <span className="w-2 h-2 bg-[#22c55e] rounded-full shrink-0"></span>
            {question}
        </h3>
        <p className="text-slate-400 leading-relaxed font-medium pl-5">
            {answer}
        </p>
    </div>
);

// NUEVO VIP TIER ADAPTADO PARA $9 + DESADUANAJE
const VipTier = ({ 
    name, icon, range, price, customsFee, features, isFeatured = false, iconColor 
}: any) => (
    <div className={`relative flex flex-col p-6 lg:p-8 rounded-[2.5rem] border transition-all duration-500 group ${
        isFeatured 
        ? 'bg-[#111827] border-[#22c55e] shadow-[0_0_50px_-12px_rgba(34,197,94,0.3)] scale-105 z-20' 
        : 'bg-[#1a2633]/40 backdrop-blur-md border-white/5 hover:border-white/20 z-10'
    }`}>
        
        {isFeatured && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#22c55e] text-[#0b1118] text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest shadow-xl">
                MÁS POPULAR
            </div>
        )}

        <div className="flex flex-col items-center text-center mb-6">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4 bg-white/5 border border-white/10 ${iconColor} group-hover:scale-110 transition-transform`}>
                {icon}
            </div>
            <h3 className="text-white text-2xl font-bold uppercase italic tracking-tighter">{name}</h3>
        </div>

        <div className={`rounded-2xl p-3 mb-6 text-center ${isFeatured ? 'bg-[#22c55e]/10' : 'bg-white/5'}`}>
            <span className="text-slate-500 text-[9px] font-bold uppercase block mb-1">Volumen mensual</span>
            <span className="text-white text-base font-black tracking-tight">{range}</span>
        </div>

        {/* ESTRUCTURA VISUAL: 9 POR KG + X FIJO */}
        <div className="text-center mb-8 border-b border-white/5 pb-6 flex-grow">
            <div className="flex justify-center items-center gap-2 mb-2">
                <div className="text-right">
                    <span className="text-3xl font-black text-white">{price}</span>
                    <span className="text-[9px] text-slate-400 block font-bold uppercase tracking-widest">Por kg</span>
                </div>
                <span className="text-2xl font-black text-[#22c55e]">+</span>
                <div className="text-left">
                    <span className="text-3xl font-black text-white">{customsFee}</span>
                    <span className="text-[9px] text-slate-400 block font-bold uppercase tracking-widest">Fijo</span>
                </div>
            </div>
            <p className="text-[#22c55e] text-[9px] font-black uppercase tracking-widest bg-[#22c55e]/10 inline-block px-3 py-1 rounded-full mt-2">
                {customsFee === '$0' ? 'Cero Desaduanaje' : 'Ahorro en Trámite'}
            </p>
        </div>

        <ul className="space-y-4 flex-grow">
            {features.map((feature: string, i: number) => (
                <li key={i} className="flex items-start gap-3">
                    <ShieldCheck className="text-[#22c55e] w-4 h-4 shrink-0 mt-0.5" />
                    <span className="text-slate-300 text-[13px] font-medium leading-tight">{feature}</span>
                </li>
            ))}
        </ul>
    </div>
);