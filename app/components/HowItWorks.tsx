import React from 'react';

const importSteps = [
    { step: "PASO 1", title: "Regístrate gratis", desc: "Obtén tu casillero personal en Miami con el código GOSU. Es gratis y toma solo 2 minutos.", badge: "Casillero gratuito", icon: "👤" },
    { step: "PASO 2", title: "Compra en USA", desc: "Compra en Amazon, eBay, Shein, o cualquier tienda de Estados Unidos. Ahorra el 7% de impuestos estatales.", badge: "Sin impuestos USA", icon: "🛒" },
    { step: "PASO 3", title: "Recibimos tu paquete", desc: "Tu compra llega a nuestro almacén en Miami. Consolidamos hasta 5 paquetes gratis si no superan $200.", badge: "Consolidación gratis", icon: "🏢" },
    { step: "PASO 4", title: "Envío express", desc: "Despachamos tu paquete por vía aérea a Perú. Nos encargamos de todo el proceso de importación y aduanas.", badge: "Sin trámites", icon: "✈️" },
    { step: "PASO 5", title: "Rastrea tu pedido", desc: "Sigue el estado de tu paquete en tiempo real desde nuestra plataforma. Te notificamos en cada etapa.", badge: "Tracking en vivo", icon: "📍" },
    { step: "PASO 6", title: "Recibe en 3 - 7 días", desc: "Recoge en Lima (zona Plaza Norte) o te enviamos a provincia por Shalom, Olva, Marvisur u otra agencia.", badge: "Entrega garantizada", icon: "✅" }
];

export default function HowItWorks() {
    return (
        <section className="relative z-10 w-full max-w-6xl mx-auto py-24 px-4 bg-transparent">
            {/* Título */}
            <div className="text-center mb-20">
                <h2 className="text-white text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">¿Cómo funciona?</h2>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto">Seis pasos simples para importar tus productos favoritos desde Estados Unidos</p>
            </div>
            
            {/* Línea de Tiempo */}
            <div className="relative max-w-4xl mx-auto">
                {/* Línea vertical en verde oscuro */}
                <div className="absolute left-[39px] md:left-1/2 top-4 bottom-4 w-[2px] bg-[#22c55e]/30 transform md:-translate-x-1/2"></div>
                
                {importSteps.map((step, index) => {
                    const isEven = index % 2 === 0;
                    return (
                        <div key={index} className="relative flex items-start md:items-center justify-between w-full mb-12">
                            {/* Puntos de la línea de tiempo en verde brillante */}
                            <div className="absolute left-[39px] md:left-1/2 w-4 h-4 rounded-full bg-[#22c55e] transform -translate-x-1/2 mt-6 md:mt-0 border-[3px] border-[#0b1118] z-10 shadow-[0_0_12px_rgba(34,197,94,0.8)]"></div>
                            
                            <div className={`w-full flex ${isEven ? 'md:justify-start' : 'md:justify-end'} ml-[80px] md:ml-0`}>
                                <div className="w-full md:w-[calc(50%-3rem)]">
                                    <div className="bg-[#1a2633]/30 backdrop-blur-md border border-white/5 p-6 md:p-8 rounded-[2rem] hover:border-[#22c55e]/40 transition-all duration-500 shadow-lg text-left">
                                        <div className="flex items-center justify-between mb-4">
                                            <div>
                                                <span className="text-[#22c55e] text-xs font-bold uppercase tracking-wider">{step.step}</span>
                                                <h3 className="text-white text-xl font-bold mt-1">{step.title}</h3>
                                            </div>
                                            <div className="w-10 h-10 bg-[#22c55e]/10 rounded-xl flex items-center justify-center text-[#22c55e] text-xl border border-[#22c55e]/20">{step.icon}</div>
                                        </div>
                                        <p className="text-slate-400 text-sm leading-relaxed mb-6">{step.desc}</p>
                                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-slate-300 text-xs font-medium">
                                            <span className="text-[#22c55e]">✓</span> {step.badge}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Mini CTA al final de la línea de tiempo */}
            <section className="relative z-10 w-full max-w-4xl mx-auto px-4 pb-32 pt-10">
                <div className="bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 p-10 md:p-16 rounded-[3rem] text-center shadow-2xl relative overflow-hidden">
                    {/* Brillo de fondo en verde */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3/4 h-1/2 bg-[#22c55e]/10 blur-[80px]"></div>
                    <h2 className="text-white text-3xl md:text-4xl font-bold mb-4 relative z-10">¿Listo para empezar?</h2>
                    <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto relative z-10">
                        Regístrate gratis y obtén tu casillero personal en Miami. Empieza a importar hoy mismo con GOSU IMPORT.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10">
                        <button className="bg-[#22c55e] text-[#0b1118] px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#1ea950] transition-all hover:scale-105 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                            Crear mi casillero gratis →
                        </button>
                    </div>
                </div>
            </section>
        </section>
    );
}