import React from 'react';

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
        a: "El código GOSU nos permite identificar tus paquetes más rápido y asignarlos a tu casillero en nuestro almacén de Miami sin errores."
    },
    {
        q: "¿Qué agencias usan para envíos a provincias?",
        a: "Trabajamos con Shalom, Olva y Marvisur. Puedes especificar tu agencia preferida al registrar tu envío en la plataforma."
    }
];

export default function Faq() {
    return (
        <section className="relative z-10 w-full max-w-3xl mx-auto py-24 px-4 bg-transparent">
            
            <div className="text-center mb-12">
                <h2 className="text-white text-3xl md:text-4xl font-bold tracking-tight">
                    Preguntas Frecuentes
                </h2>
            </div>

            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div 
                        key={index} 
                        className="bg-[#1a2633]/40 backdrop-blur-md border border-white/5 p-6 rounded-2xl hover:border-white/10 transition-colors"
                    >
                        <h3 className="text-white text-lg font-bold mb-2">
                            {faq.q}
                        </h3>
                        <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                            {faq.a}
                        </p>
                    </div>
                ))}
            </div>
            <section className="relative z-10 w-full max-w-4xl mx-auto px-4 pb-32 pt-10 text-center">
            
            <h2 className="text-white text-3xl md:text-5xl font-bold mb-4 tracking-tight">
                ¿Listo para tu primera Impo?
            </h2>
            
            <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
                Únete a más de 200 importadores que confían en GOSU Courier cada mes
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                {/* Botón Principal Blanco */}
                <button className="bg-white text-[#0b1118] px-8 py-3.7 rounded-2xl font-bold hover:bg-cyan-50 transition-all shadow-lg hover:scale-105 flex items-center gap-2">
                    Obtener mi casillero gratis <span>→</span>
                </button>
                
                {/* Botón de WhatsApp Transparente */}
                <button className="text-slate-300 font-medium hover:text-white transition-colors flex items-center gap-2">
                    <span className="text-xl">📞</span> Contactar por WhatsApp
                </button>
            </div>

        </section>

        </section>
    );
}