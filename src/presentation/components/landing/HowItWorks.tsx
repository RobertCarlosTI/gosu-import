"use client";

import React from 'react';
import { useRouter } from "next/navigation"; 

const importSteps = [
    { step: "PASO 1", title: "Regístrate gratis", desc: "Obtén tu casillero personal en Miami con el código GOSU. Es gratis y toma solo 2 minutos.", badge: "Casillero gratuito", icon: "👤" },
    { step: "PASO 2", title: "Compra en USA", desc: "Compra en Amazon, eBay, o cualquier tienda de USA. Ahorra el 7% de impuestos estatales usando nuestra dirección.", badge: "Sin impuestos USA", icon: "🛒" },
    { step: "PASO 3", title: "Recibimos tu paquete", desc: "Tus compras llegan a Miami. Consolidamos tus paquetedes desde 1 USD .", badge: "Consolidación gratis", icon: "🏢" },
    { step: "PASO 4", title: "Tarifa Plana $12/KG", desc: "Despachamos a Perú con un costo fijo de $12 por kilogramo neto. Sin cargos por volumen ni comisiones ocultas.", badge: "$12 por Kilogramo", icon: "⚖️" },
    { step: "PASO 5", title: "Rastrea tu pedido", desc: "Sigue el estado de tu paquete en tiempo real desde nuestra plataforma. Te notificamos cuando esté listo para entrega.", badge: "Tracking en vivo", icon: "📍" },
    { step: "PASO 6", title: "Recibe en 3 - 7 días habiles", desc: "Recoge en Lima o te enviamos a provincia por Shalom u Olva. ¡Paga solo por el peso real que importaste!", badge: "Entrega express", icon: "✅" }
];

export default function HowItWorks() {
    const router = useRouter();

    const handleNavigation = () => {
        router.push("/register");
    };

    return (
        <section id="proceso" className="relative z-10 w-full max-w-6xl mx-auto py-24 px-4 bg-transparent">
            {/* Título de la sección */}
            <div className="text-center mb-20">
                <h2 className="text-white text-3xl md:text-5xl font-extrabold mb-4 tracking-tight uppercase italic">
                    ¿Cómo funciona <span className="text-[#22c55e]">GOSU</span>?
                </h2>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto font-medium">
                    Importa de USA a Perú con nuestra tarifa plana de <span className="text-white font-bold">$12 por kg</span>
                </p>
            </div>
            
            {/* Línea de Tiempo */}
            <div className="relative max-w-4xl mx-auto">
                <div className="absolute left-[39px] md:left-1/2 top-4 bottom-4 w-[2px] bg-[#22c55e]/30 transform md:-translate-x-1/2"></div>
                
                {importSteps.map((step, index) => {
                    const isEven = index % 2 === 0;
                    return (
                        <div key={index} className="relative flex items-start md:items-center justify-between w-full mb-12">
                            <div className="absolute left-[39px] md:left-1/2 w-4 h-4 rounded-full bg-[#22c55e] transform -translate-x-1/2 mt-6 md:mt-0 border-[3px] border-[#0b1118] z-10 shadow-[0_0_12px_rgba(34,197,94,0.8)]"></div>
                            
                            <div className={`w-full flex ${isEven ? 'md:justify-start' : 'md:justify-end'} ml-[80px] md:ml-0`}>
                                <div className="w-full md:w-[calc(50%-3rem)]">
                                    <div className="bg-[#1a2633]/30 backdrop-blur-md border border-white/5 p-6 md:p-8 rounded-[2.5rem] hover:border-[#22c55e]/40 transition-all duration-500 shadow-lg text-left group">
                                        <div className="flex items-center justify-between mb-4">
                                            <div>
                                                <span className="text-[#22c55e] text-xs font-bold uppercase tracking-wider">{step.step}</span>
                                                <h3 className="text-white text-xl font-bold mt-1 uppercase italic tracking-tighter">{step.title}</h3>
                                            </div>
                                            <div className="w-10 h-10 bg-[#22c55e]/10 rounded-xl flex items-center justify-center text-[#22c55e] text-xl border border-[#22c55e]/20 group-hover:scale-110 transition-transform">{step.icon}</div>
                                        </div>
                                        <p className="text-slate-400 text-sm leading-relaxed mb-6 font-medium">{step.desc}</p>
                                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-slate-300 text-xs font-bold">
                                            <span className="text-[#22c55e]">✓</span> {step.badge}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Caja de llamado a la acción (CTA) Final */}
            <div className="relative z-20 w-full max-w-4xl mx-auto px-4 pb-32 pt-10">
                <div className="bg-[#0f172a]/60 backdrop-blur-xl border border-white/10 p-10 md:p-16 rounded-[3rem] text-center shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3/4 h-1/2 bg-[#22c55e]/10 blur-[80px] pointer-events-none"></div>
                    
                    <h2 className="text-white text-3xl md:text-5xl font-black mb-4 relative z-10 italic uppercase tracking-tighter">
                        ¿Listo para ahorrar?
                    </h2>
                    <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto relative z-10 font-medium leading-relaxed">
                        Únete a GOSU y aprovecha el flete de <span className="text-white font-bold">$12 el kilo</span>. Sin costos sorpresa, solo peso real.
                    </p>
                    
                    <div className="relative z-50 flex justify-center">
                        <button 
                            type="button"
                            onClick={handleNavigation}
                            className="cursor-pointer bg-[#22c55e] text-[#0b1118] px-12 py-5 rounded-2xl font-black text-xl hover:bg-[#1ea950] transition-all hover:scale-105 shadow-[0_0_40px_rgba(34,197,94,0.4)] active:scale-95 uppercase italic select-none"
                        >
                            Crear mi casillero gratis →
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}