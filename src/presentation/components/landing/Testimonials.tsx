import React from 'react';

export default function Testimonials() {
    return (
        <section className="relative z-10 w-full max-w-6xl mx-auto py-24 px-4 bg-transparent">
            
            {/* Encabezado */}
            <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 mb-4">
                    <img src="https://flagcdn.com/w20/pe.png" alt="Perú" className="w-5 h-auto rounded-sm" />
                    <span className="text-slate-400 text-sm font-medium">Clientes en todo el Perú</span>
                </div>
                <h2 className="text-white text-3xl md:text-5xl font-bold mb-4 tracking-tight">
                    Lo que dicen nuestros clientes
                </h2>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                    Más de 500 importadores confían en nosotros cada mes
                </p>
            </div>

            {/* Grid de 3 Testimonios */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Cliente 1 */}
                <div className="bg-[#1a2633]/40 backdrop-blur-md border border-white/5 p-8 rounded-[2rem] flex flex-col justify-between hover:border-white/10 transition-colors">
                    <div>
                        <div className="text-[#22c55e] text-lg mb-4 tracking-widest">
                            ★★★★★
                        </div>
                        <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-8">
                           <span>Servicio excepcional. Mis paquetes llegaron en solo 4 días. La tarifa de $12/kg con peso neto real es la mejor del mercado.</span> 
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-slate-300 font-bold text-sm">
                            M
                        </div>
                        <div>
                            <div className="text-white font-bold text-sm">María González</div>
                            <div className="text-slate-500 text-xs flex items-center gap-1">
                                <span>📍</span> Lima
                            </div>
                        </div>
                    </div>
                </div>

                {/* Cliente 2 */}
                <div className="bg-[#1a2633]/40 backdrop-blur-md border border-white/5 p-8 rounded-[2rem] flex flex-col justify-between hover:border-white/10 transition-colors">
                    <div>
                        <div className="text-[#22c55e] text-lg mb-4 tracking-widest">
                            ★★★★★
                        </div>
                        <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-8">
                           <span>Llevo 6 meses importando con GOSU Courier. El código GOSU facilita todo. Mis paquetes siempre llegan rápido y seguros.</span> 
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-slate-300 font-bold text-sm">
                            C
                        </div>
                        <div>
                            <div className="text-white font-bold text-sm">Carlos Ramirez</div>
                            <div className="text-slate-500 text-xs flex items-center gap-1">
                                <span>📍</span> Arequipa
                            </div>
                        </div>
                    </div>
                </div>

                {/* Cliente 3 */}
                <div className="bg-[#1a2633]/40 backdrop-blur-md border border-white/5 p-8 rounded-[2rem] flex flex-col justify-between hover:border-white/10 transition-colors">
                    <div>
                        <div className="text-[#22c55e] text-lg mb-4 tracking-widest">
                            ★★★★★
                        </div>
                        <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-8">
                            <span> Excelente atención por WhatsApp. Me asesoraron sobre qué productos podía importar. Los envíos a Cusco llegan perfectos.</span>
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-slate-300 font-bold text-sm">
                            A
                        </div>
                        <div>
                            <div className="text-white font-bold text-sm">Ana Flores</div>
                            <div className="text-slate-500 text-xs flex items-center gap-1">
                                <span>📍</span> Cusco
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </section>
    );
}