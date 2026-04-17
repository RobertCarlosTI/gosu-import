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
        a: "Solo si el valor total supera $200 USD. Por eso ofrecemos consolidación desde 1 usd por articulo."
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
        </section>
    );
}