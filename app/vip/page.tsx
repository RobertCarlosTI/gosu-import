"use client";
import React from 'react';
// Usamos @/ para que Next.js sepa que debe empezar a buscar desde la raíz del proyecto
import VipClub from '@/app/components/VipClub';
import Cta from '@/app/components/Cta';

export default function VipPage() {
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

            {/* CONTENIDO VIP */}
            <section className="relative z-10 max-w-4xl mx-auto text-center px-4 pt-10 pb-16">
                <div className="w-20 h-20 bg-amber-500/10 border border-amber-500/20 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-8 shadow-[0_0_30px_rgba(245,158,11,0.2)]">
                    👑
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
                    La lealtad tiene su <span className="text-amber-400">recompensa</span>
                </h1>
                <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                    En GOSU IMPORT valoramos tu confianza. Mientras más importes con nosotros, mejores tarifas y beneficios exclusivos desbloquearás.
                </p>
            </section>

            {/* SECCIÓN DE BENEFICIOS ADICIONALES */}
            <section className="relative z-10 w-full max-w-6xl mx-auto px-4 pb-24 pt-20">
                <div className="mb-24">
                    <h2 className="text-white text-3xl md:text-5xl text-center font-bold mb-16 tracking-tight">
                        ¿Cómo funciona el Club VIP?
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {/* Paso 1 */}
                        <div className="flex flex-col items-center group">
                            <div className="w-20 h-20 bg-[#22c55e]/10 rounded-[2rem] flex items-center justify-center mb-6 text-[#22c55e] border border-[#22c55e]/20 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_30px_rgba(34,197,94,0.1)]">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52V4.5m0 0c0-1.105-.895-2-2-2s-2 .895-2 2v.47m3-.52c.767.108 1.53.235 2.285.38.55.105.965.587.965 1.147V18a2.25 2.25 0 0 1-2.25 2.25c-.246 0-.488-.04-.716-.114m0 0a11.956 11.956 0 0 1-2.022-.853M3 5.49c.99-.203 1.99-.377 3-.52m0 0V4.5m0 0c0-1.105.895-2 2-2s2 .895 2 2v.47m-3-.52A48.556 48.556 0 0 1 3 5.49c-.55.105-.965.587-.965 1.147V18a2.25 2.25 0 0 0 2.25 2.25c.246 0 .488-.04.716-.114m0 0c.732-.238 1.41-.525 2.022-.853" />
                                </svg>
                            </div>
                            <h3 className="text-white text-xl font-bold mb-4">Medimos tu volumen</h3>
                            <p className="text-slate-400 text-4sm leading-relaxed max-w-[280px] text-center ">
                                Calculamos el total de kilogramos que envías durante cada mes calendario.
                            </p>
                        </div>

                        {/* Paso 2 */}
                        <div className="flex flex-col items-center group">
                            <div className="w-20 h-20 bg-[#22c55e]/10 rounded-[2rem] flex items-center justify-center mb-6 text-[#22c55e] border border-[#22c55e]/20 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_30px_rgba(34,197,94,0.1)]">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.281-2.281 5.94" />
                                </svg>
                            </div>
                            <h3 className="text-white text-xl font-bold mb-4">Subes de nivel</h3>
                            <p className="text-slate-400 text-4sm leading-relaxed max-w-[280px] text-center ">
                                Al alcanzar ciertos umbrales de volumen, automáticamente accedes a mejores tarifas.
                            </p>
                        </div>

                        {/* Paso 3 */}
                        <div className="flex flex-col items-center group">
                            <div className="w-20 h-20 bg-[#22c55e]/10 rounded-[2rem] flex items-center justify-center mb-6 text-[#22c55e] border border-[#22c55e]/20 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_30px_rgba(34,197,94,0.1)]">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                                </svg>
                            </div>
                            <h3 className="text-white text-xl font-bold mb-4">Disfrutas beneficios</h3>
                            <p className="text-slate-400 text-4os leading-relaxed max-w-[480px] text-center">
                                Cada nivel incluye beneficios adicionales como consolidación, atención prioritaria y más.
                            </p>
                        </div>
                    </div>
                </div>
                <section className="relative z-10 w-full max-w-7xl mx-auto py-24 px-4 bg-transparent">
            
            {/* Títulos Principales */}
            <div className="text-center mb-16">
                <h2 className="text-white text-3xl md:text-5xl font-black mb-4 tracking-tight">Niveles del Club VIP</h2>
                <p className="text-slate-400 text-lg font-medium">Tu tarifa depende del volumen mensual que manejes</p>
            </div>

            {/* Grid de 4 Niveles */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
                
                <VipTier 
                    name="Bronce" icon="⭐" range="0 - 99 kg" price="$12" lbPrice="$8" iconColor="text-orange-400"
                    features={["Consolidación hasta 5 paquetes", "Soporte por WhatsApp", "Tracking en tiempo real", "Notificaciones de estado"]}
                />

                <VipTier 
                    name="Plata" icon="🌟" range="100 - 499 kg" price="$11" lbPrice="$7.5" iconColor="text-slate-300"
                    features={["Consolidación hasta 7 paquetes", "Atención prioritaria", "Tracking en tiempo real", "Soporte extendido"]}
                />

                <VipTier 
                    name="Oro" icon="👑" range="500 - 999 kg" price="$10" lbPrice="$7" isFeatured={true} iconColor="text-[#22c55e]"
                    features={["Consolidación ilimitada", "Asesor personal asignado", "Prioridad en despachos", "Línea directa de soporte"]}
                />

                <VipTier 
                    name="Platino" icon="💎" range="1,000+ kg" price="$9" lbPrice="$6.5" iconColor="text-cyan-400"
                    features={["Línea directa con gerencia", "Prioridad máxima en vuelos", "Tarifas negociables por volumen", "Atención 24/7"]}
                />

            </div>

            {/* Botón de Acción */}
            <div className="mt-20 text-center">
                <button className="bg-[#22c55e] text-[#0b1118] px-12 py-4 rounded-2xl font-black text-lg hover:bg-[#1ea950] transition-all shadow-[0_10px_40px_rgba(34,197,94,0.3)] hover:scale-105 active:scale-95 flex items-center gap-3 mx-auto">
                    Ingresar al Club VIP <span>→</span>
                </button>
            </div>

        </section>
            </section>
            


        </main>
    );
}
const VipTier = ({ 
    name, icon, range, price, lbPrice, features, isFeatured = false, iconColor 
}: { 
    name: string, icon: string, range: string, price: string, lbPrice: string, features: string[], isFeatured?: boolean, iconColor: string 
}) => (
    <div className={`relative flex flex-col p-8 rounded-[2.5rem] border transition-all duration-500 group ${
        isFeatured 
        ? 'bg-[#111827] border-[#22c55e] shadow-[0_0_50px_-12px_rgba(34,197,94,0.3)] scale-105 z-20' 
        : 'bg-[#1a2633]/40 backdrop-blur-md border-white/5 hover:border-white/20 z-10'
    }`}>
        
        {isFeatured && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#22c55e] text-[#0b1118] text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest shadow-xl">
                MÁS POPULAR
            </div>
        )}

        {/* Cabecera de la tarjeta */}
        <div className="flex flex-col items-center text-center mb-6">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4 bg-white/5 border border-white/10 ${iconColor} group-hover:scale-110 transition-transform`}>
                {icon}
            </div>
            <h3 className="text-white text-2xl font-bold">{name}</h3>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">
                {name === 'Bronce' ? 'Tarifa Estándar' : name === 'Plata' ? 'Cliente Frecuente' : name === 'Oro' ? 'Cliente VIP' : 'Cliente Corporativo'}
            </p>
        </div>

        {/* Rango de Volumen */}
        <div className={`rounded-2xl p-4 mb-6 text-center ${isFeatured ? 'bg-[#22c55e]/10' : 'bg-white/5'}`}>
            <span className="text-slate-500 text-[10px] font-bold uppercase block mb-1">Volumen mensual</span>
            <span className="text-white text-lg font-black tracking-tight">{range}</span>
        </div>

        {/* Precio */}
        <div className="text-center mb-8 border-b border-white/5 pb-8 flex-grow">
            <div className="flex items-baseline justify-center gap-1 text-white">
                <span className="text-5xl font-black tracking-tighter">{price}</span>
                <span className="text-sm font-bold opacity-60">/kg</span>
            </div>
            <p className="text-slate-500 text-xs mt-1 font-mono italic">({lbPrice}/lb)</p>
        </div>

        {/* Beneficios */}
        <ul className="space-y-4 mb-2 flex-grow">
            {features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] mt-0.5 shrink-0 ${isFeatured ? 'border-[#22c55e] text-[#22c55e]' : 'border-slate-700 text-slate-500'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3 h-3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                    </div>
                    <span className="text-slate-300 text-[13px] leading-tight font-medium">
                        {feature}
                    </span>
                </li>
            ))}
        </ul>
        
    </div>
    
);
