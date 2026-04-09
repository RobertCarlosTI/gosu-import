"use client";
import React from 'react';
import { useRouter } from "next/navigation";
import { MessageCircle, HelpCircle, ArrowRight, CheckCircle2 } from 'lucide-react';

const faqs = [
    {
        q: "¿Cuánto tiempo toma el envío?",
        a: "Nuestro servicio express tarda 3-7 días hábiles desde Miami hasta Lima. Para provincias, agregamos el tiempo de la agencia seleccionada."
    },
    {
        q: "¿Cómo funciona la tarifa de $12/kg?",
        a: "Cobramos por peso neto real, no volumétrico. Mínimo 1 kg ($12). No redondeamos: si pesa 1.25 kg, pagas $15."
    },
    {
        q: "¿Cuándo pago impuestos peruanos?",
        a: "Solo si el valor total supera $200 USD. Por eso ofrecemos consolidación gratuita de hasta 5 paquetes."
    },
    {
        q: "¿Por qué debo poner 'GOSU' antes de mi nombre?",
        a: "El código GOSU nos permite identificar tus paquetes más rápido y asignarlos a tu casillero sin errores."
    },
    {
        q: "¿Qué agencias usan para envíos a provincias?",
        a: "Trabajamos con Shalom, Olva y Marvisur. Puedes especificar tu agencia preferida al registrar tu envío."
    }
];

export default function Faq() {
    const router = useRouter();

    return (
        <section id="faq" className="relative z-10 w-full max-w-4xl mx-auto py-24 px-4 bg-transparent">
            
            {/* TÍTULO DE LA SECCIÓN */}
            <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#22c55e]/20 bg-[#22c55e]/5 text-[#22c55e] text-xs font-black uppercase tracking-widest mb-6">
                    <HelpCircle size={14} /> FAQ
                </div>
                <h2 className="text-white text-4xl md:text-6xl font-black mb-4 tracking-tighter italic uppercase">
                    Preguntas <span className="text-[#22c55e]">Frecuentes</span>
                </h2>
                <p className="text-slate-400 text-lg font-medium">Despeja tus dudas y empieza a importar como un pro</p>
            </div>

            {/* LISTA DE PREGUNTAS */}
            <div className="grid gap-4 mb-24">
                {faqs.map((faq, index) => (
                    <div 
                        key={index} 
                        className="group bg-[#1a2633]/30 backdrop-blur-md border border-white/5 p-6 md:p-8 rounded-[2rem] hover:border-[#22c55e]/30 transition-all duration-300 shadow-xl"
                    >
                        <h3 className="text-white text-xl font-bold mb-3 flex items-center gap-4 italic uppercase tracking-tight">
                            <span className="text-[#22c55e] text-2xl group-hover:scale-125 transition-transform duration-300 leading-none">?</span>
                            {faq.q}
                        </h3>
                        <p className="text-slate-400 text-sm md:text-base leading-relaxed font-medium pl-7">
                            {faq.a}
                        </p>
                    </div>
                ))}
            </div>

            {/* SECCIÓN FINAL: ¿LISTO PARA COMENZAR? */}
            <div className="relative overflow-hidden bg-[#0f172a]/60 backdrop-blur-xl border border-white/10 p-12 md:p-20 rounded-[3.5rem] text-center shadow-2xl">
                {/* Brillo verde de fondo */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-full bg-[#22c55e]/5 blur-[100px] pointer-events-none" />

                <div className="relative z-10">
                    <h2 className="text-white text-3xl md:text-6xl font-black mb-6 tracking-tighter italic uppercase">
                        ¿Listo para tu <span className="text-[#22c55e]">primera Impo?</span>
                    </h2>
                    
                    <p className="text-slate-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
                        Únete a más de <span className="text-white font-bold">200 importadores</span> que confían en <span className="text-white italic">GOSU IMPORT</span> cada mes.
                    </p>
                    
                    <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                        {/* Botón Principal GOSU */}
                        <button 
                            onClick={() => router.push("/register")}
                            className="w-full md:w-auto bg-[#22c55e] text-[#0b1118] px-10 py-5 rounded-2xl font-black text-xl hover:bg-[#1ea950] transition-all hover:scale-105 shadow-[0_0_40px_rgba(34,197,94,0.4)] active:scale-95 flex items-center justify-center gap-3 italic uppercase"
                        >
                            Obtener mi casillero gratis
                            <ArrowRight size={22} />
                        </button>
                        
                        {/* Botón de WhatsApp */}
                        <a 
                            href="https://wa.me/TUNUMERO" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 text-slate-300 font-black text-lg hover:text-white transition-colors uppercase italic group"
                        >
                            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-[#22c55e]/20 transition-colors">
                                <MessageCircle className="text-[#22c55e]" />
                            </div>
                            Hablar con un asesor
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}