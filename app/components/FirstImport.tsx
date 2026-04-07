import React from 'react';

export default function FirstImport() {
    return (
        <section className="relative z-10 w-full max-w-6xl mx-auto py-24 px-4 bg-transparent">
            
            {/* Encabezado */}
            <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-[#111827]/80 text-slate-300 text-sm font-medium mb-6 shadow-lg">
                    <span className="text-[#22c55e]">📖</span> Guía completa
                </div>
                <h2 className="text-white text-3xl md:text-5xl font-bold mb-4 tracking-tight">Mi primera Impo</h2>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                    Todo lo que necesitas saber antes de importar a Perú de forma fácil y segura
                </p>
            </div>

            {/* Grid de 6 Tarjetas Completas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* 1. Límites */}
                <div className="bg-[#1a2633]/30 backdrop-blur-md border border-white/5 p-8 rounded-[2rem] hover:border-[#22c55e]/30 transition-all duration-300 flex flex-col h-full shadow-lg group">
                    <div className="w-12 h-12 bg-[#22c55e]/10 rounded-xl flex items-center justify-center mb-6 text-[#22c55e] font-bold text-xl group-hover:scale-110 transition-transform">
                        $
                    </div>
                    <h3 className="text-white text-xl font-bold mb-4">Límites sin impuestos</h3>
                    <ul className="space-y-3 mb-6 flex-grow text-sm">
                        <li className="flex items-start gap-2">
                            <span className="text-[#22c55e] mt-0.5">✓</span>
                            <span className="text-slate-300"><strong className="text-[#22c55e]">Hasta $200 USD</strong> = Sin impuestos peruanos</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-amber-400 mt-0.5">!</span>
                            <span className="text-slate-300"><strong className="text-amber-400">Más de $200</strong> = Paga IGV (18%) + arancel</span>
                        </li>
                    </ul>
                    <div className="bg-[#22c55e]/10 border border-[#22c55e]/20 rounded-xl p-4 text-xs text-[#22c55e] font-medium">
                        <strong>Tip:</strong> Consolidamos hasta 5 paquetes gratis mientras no superen $200 en total.
                    </div>
                </div>

                {/* 2. Documentos */}
                <div className="bg-[#1a2633]/30 backdrop-blur-md border border-white/5 p-8 rounded-[2rem] hover:border-[#22c55e]/30 transition-all duration-300 flex flex-col h-full shadow-lg group">
                    <div className="w-12 h-12 bg-[#22c55e]/10 rounded-xl flex items-center justify-center mb-6 text-[#22c55e] font-bold text-xl group-hover:scale-110 transition-transform">
                        📄
                    </div>
                    <h3 className="text-white text-xl font-bold mb-4">Documentos necesarios</h3>
                    <ul className="space-y-3 mb-6 flex-grow text-sm">
                        <li className="flex items-start gap-2">
                            <span className="text-[#22c55e] mt-0.5">✓</span>
                            <span className="text-slate-300"><strong className="text-white">DNI</strong> - Para la mayoría de productos</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-[#22c55e] mt-0.5">✓</span>
                            <span className="text-slate-300"><strong className="text-white">Factura/Invoice</strong> - Del producto comprado</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-[#22c55e] mt-0.5">✓</span>
                            <span className="text-slate-300"><strong className="text-white">Tracking</strong> - Número de seguimiento</span>
                        </li>
                    </ul>
                    <div className="bg-[#22c55e]/10 border border-[#22c55e]/20 rounded-xl p-4 text-xs text-[#22c55e] font-medium">
                        <strong>¡Especial!</strong> Perfumería a $12/kg sin necesidad de DNI.
                    </div>
                </div>

                {/* 3. Tiempo */}
                <div className="bg-[#1a2633]/30 backdrop-blur-md border border-white/5 p-8 rounded-[2rem] hover:border-[#22c55e]/30 transition-all duration-300 flex flex-col h-full shadow-lg group">
                    <div className="w-12 h-12 bg-[#22c55e]/10 rounded-xl flex items-center justify-center mb-6 text-[#22c55e] font-bold text-xl group-hover:scale-110 transition-transform">
                        🕒
                    </div>
                    <h3 className="text-white text-xl font-bold mb-4">Tiempo de envío</h3>
                    <div className="flex items-center gap-4 mb-6 flex-grow">
                        <div className="w-12 h-12 bg-[#0b1118] border border-white/5 rounded-xl flex items-center justify-center text-[#22c55e]">
                            ✈️
                        </div>
                        <div>
                            <div className="text-white font-bold">Express Aéreo</div>
                            <div className="text-[#22c55e] font-black text-lg">3-7 días hábiles</div>
                        </div>
                    </div>
                    <div className="bg-[#22c55e]/10 border border-[#22c55e]/20 rounded-xl p-4 text-xs text-[#22c55e] font-medium">
                        Desde que tu paquete sale de Miami hasta que llega a Lima.
                    </div>
                </div>

                {/* 4. Calculo */}
                <div className="bg-[#1a2633]/30 backdrop-blur-md border border-white/5 p-8 rounded-[2rem] hover:border-[#22c55e]/30 transition-all duration-300 flex flex-col h-full shadow-lg group">
                    <div className="w-12 h-12 bg-[#22c55e]/10 rounded-xl flex items-center justify-center mb-6 text-[#22c55e] font-bold text-xl group-hover:scale-110 transition-transform">
                        🧮
                    </div>
                    <h3 className="text-white text-xl font-bold mb-4">Cálculo de costos</h3>
                    <ul className="space-y-2 mb-6 flex-grow text-sm">
                        <li className="text-slate-300"><strong className="text-white">Tarifa:</strong> $12 por kg (peso neto)</li>
                        <li className="text-slate-300"><strong className="text-white">Mínimo:</strong> 1 kg ($12)</li>
                        <li className="text-slate-300"><strong className="text-white">Sin redondeo:</strong> Pagas el peso exacto</li>
                    </ul>
                    <div className="bg-[#0b1118] border border-white/5 rounded-xl p-4 text-xs text-slate-300">
                        <strong className="text-[#22c55e] block mb-2">Ejemplos:</strong>
                        <div className="space-y-1 font-mono">
                            <div>• 0.8 kg → $12 (mínimo)</div>
                            <div>• 1.25 kg → $15</div>
                            <div>• 2.5 kg → $30</div>
                        </div>
                    </div>
                </div>

                {/* 5. Consolidación */}
                <div className="bg-[#1a2633]/30 backdrop-blur-md border border-white/5 p-8 rounded-[2rem] hover:border-[#22c55e]/30 transition-all duration-300 flex flex-col h-full shadow-lg group">
                    <div className="w-12 h-12 bg-[#22c55e]/10 rounded-xl flex items-center justify-center mb-6 text-[#22c55e] font-bold text-xl group-hover:scale-110 transition-transform">
                        📦
                    </div>
                    <h3 className="text-white text-xl font-bold mb-4">Consolidación gratuita</h3>
                    <ul className="space-y-3 mb-6 flex-grow text-sm">
                        <li className="flex items-start gap-2">
                            <span className="text-[#22c55e] mt-0.5">✓</span>
                            <span className="text-slate-300">Hasta <strong className="text-white">5 paquetes</strong> en uno solo</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-[#22c55e] mt-0.5">✓</span>
                            <span className="text-slate-300">Valor total máximo: <strong className="text-white">$200 USD</strong></span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-[#22c55e] mt-0.5">✓</span>
                            <span className="text-slate-300">Ahorra en costos de envío</span>
                        </li>
                    </ul>
                </div>

                {/* 6. Provincias */}
                <div className="bg-[#1a2633]/30 backdrop-blur-md border border-white/5 p-8 rounded-[2rem] hover:border-[#22c55e]/30 transition-all duration-300 flex flex-col h-full shadow-lg group">
                    <div className="w-12 h-12 bg-[#22c55e]/10 rounded-xl flex items-center justify-center mb-6 text-[#22c55e] font-bold text-xl group-hover:scale-110 transition-transform">
                        🚚
                    </div>
                    <h3 className="text-white text-xl font-bold mb-4">Envíos a provincias</h3>
                    <p className="text-slate-300 text-sm mb-6 flex-grow">
                        Trabajamos con las mejores agencias de transporte:
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                        <span className="bg-[#0b1118] border border-white/10 px-4 py-1.5 rounded-full text-xs text-slate-300 font-medium">Shalom</span>
                        <span className="bg-[#0b1118] border border-white/10 px-4 py-1.5 rounded-full text-xs text-slate-300 font-medium">Olva</span>
                        <span className="bg-[#0b1118] border border-white/10 px-4 py-1.5 rounded-full text-xs text-slate-300 font-medium">Marvisur</span>
                    </div>
                </div>

            </div>
        </section>
    );
}