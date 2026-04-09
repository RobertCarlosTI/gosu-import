"use client";
import React from 'react';
import { Package, DollarSign, FileText, Timer, Calculator, Truck, PlaneTakeoff } from 'lucide-react';

export default function FirstImport() {
    return (
        <section id='guia' className="relative z-10 w-full max-w-6xl mx-auto py-24 px-4 bg-transparent">
            
            {/* Encabezado con estilo GOSU */}
            <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-[#111827]/80 text-slate-300 text-sm font-medium mb-6 shadow-lg">
                    <span className="text-[#22c55e]">📖</span> Guía completa
                </div>
                <h2 className="text-white text-3xl md:text-5xl font-black mb-4 tracking-tight uppercase italic">
                    Mi primera Impo
                </h2>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto font-medium">
                    Todo lo que necesitas saber antes de importar a Perú de forma fácil y segura
                </p>
            </div>

            {/* Grid de 6 Tarjetas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* 1. Límites */}
                <div className="bg-[#1a2633]/30 backdrop-blur-md border border-white/5 p-8 rounded-[2.5rem] hover:border-[#22c55e]/30 transition-all duration-300 flex flex-col h-full shadow-lg group">
                    <div className="w-12 h-12 bg-[#22c55e]/10 rounded-xl flex items-center justify-center mb-6 text-[#22c55e] font-bold text-xl group-hover:scale-110 transition-transform">
                        <DollarSign size={24} />
                    </div>
                    <h3 className="text-white text-xl font-bold mb-4 uppercase italic">Límites sin impuestos</h3>
                    <ul className="space-y-3 mb-6 flex-grow text-sm font-medium">
                        <li className="flex items-start gap-2">
                            <span className="text-[#22c55e] mt-0.5">✓</span>
                            <span className="text-slate-300"><strong className="text-[#22c55e]">Hasta $200 USD</strong> = Sin impuestos</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-amber-400 mt-0.5">!</span>
                            <span className="text-slate-300"><strong className="text-amber-400">Más de $200</strong> = Paga IGV (18%)</span>
                        </li>
                    </ul>
                    <div className="bg-[#22c55e]/10 border border-[#22c55e]/20 rounded-xl p-4 text-[11px] text-[#22c55e] font-bold italic">
                        TIP: Consolidamos hasta 5 paquetes gratis si no superan los $200.
                    </div>
                </div>

                {/* 2. Documentos */}
                <div className="bg-[#1a2633]/30 backdrop-blur-md border border-white/5 p-8 rounded-[2.5rem] hover:border-[#22c55e]/30 transition-all duration-300 flex flex-col h-full shadow-lg group">
                    <div className="w-12 h-12 bg-[#22c55e]/10 rounded-xl flex items-center justify-center mb-6 text-[#22c55e] font-bold text-xl group-hover:scale-110 transition-transform">
                        <FileText size={24} />
                    </div>
                    <h3 className="text-white text-xl font-bold mb-4 uppercase italic">Documentos necesarios</h3>
                    <ul className="space-y-3 mb-6 flex-grow text-sm font-medium">
                        <li className="flex items-start gap-2">
                            <span className="text-[#22c55e] mt-0.5">✓</span>
                            <span className="text-slate-300"><strong className="text-white">DNI / RUC</strong> - Para desaduanaje</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-[#22c55e] mt-0.5">✓</span>
                            <span className="text-slate-300"><strong className="text-white">Invoice</strong> - Tu comprobante de compra</span>
                        </li>
                    </ul>
                    <div className="bg-[#22c55e]/10 border border-[#22c55e]/20 rounded-xl p-4 text-[11px] text-[#22c55e] font-bold">
                        IMPORTANTE: Perfumería se maneja sin necesidad de DNI.
                    </div>
                </div>

                {/* 3. Tiempo (NUEVO ENFOQUE VIAJEROS) */}
                <div className="bg-[#1a2633]/30 backdrop-blur-md border border-white/5 p-8 rounded-[2.5rem] hover:border-[#22c55e]/30 transition-all duration-300 flex flex-col h-full shadow-lg group relative overflow-hidden border-l-2 border-l-[#22c55e]/50">
                    <div className="w-12 h-12 bg-[#22c55e]/10 rounded-xl flex items-center justify-center mb-6 text-[#22c55e] font-bold text-xl group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(34,197,94,0.2)]">
                        <PlaneTakeoff size={24} />
                    </div>
                    <div>
                        <span className="text-[#22c55e] text-[9px] font-black uppercase tracking-[0.2em] bg-[#22c55e]/10 px-2 py-0.5 rounded-full border border-[#22c55e]/20">Servicio Premium</span>
                        <h3 className="text-white text-xl font-bold mt-2 mb-4 uppercase italic">Importación vía Viajero</h3>
                    </div>
                    <ul className="space-y-3 mb-6 flex-grow text-sm font-medium">
                        <li className="flex items-start gap-2">
                            <span className="text-[#22c55e]">⚡</span>
                            <span className="text-slate-300">Entrega récord: <strong className="text-white">3 a 5 días</strong></span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-[#22c55e]">⚡</span>
                            <span className="text-slate-300">Sin trámites de aduana pesados</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-[#22c55e]">⚡</span>
                            <span className="text-slate-300">Ideal para <strong className="text-white italic">iPhones y Lujo</strong></span>
                        </li>
                    </ul>
                </div>

                {/* 4. Cálculo */}
                <div className="bg-[#1a2633]/30 backdrop-blur-md border border-white/5 p-8 rounded-[2.5rem] hover:border-[#22c55e]/30 transition-all duration-300 flex flex-col h-full shadow-lg group">
                    <div className="w-12 h-12 bg-[#22c55e]/10 rounded-xl flex items-center justify-center mb-6 text-[#22c55e] font-bold text-xl group-hover:scale-110 transition-transform">
                        <Calculator size={24} />
                    </div>
                    <h3 className="text-white text-xl font-bold mb-4 uppercase italic">Cálculo de costos</h3>
                    <ul className="space-y-2 mb-6 flex-grow text-sm font-medium">
                        <li className="text-slate-300"><strong className="text-white">Tarifa:</strong> $12 por kg (peso neto)</li>
                        <li className="text-slate-300"><strong className="text-white">Mínimo:</strong> 1 kg ($12)</li>
                    </ul>
                    <div className="bg-[#0b1118] border border-white/5 rounded-xl p-4 text-[10px] text-slate-400 font-mono">
                        <div className="text-[#22c55e] font-black mb-1 uppercase tracking-tighter">Ejemplo real:</div>
                        • 1.50 kg x $12 = $18 USD <br />
                        • Pagas por lo que pesa, sin redondeos.
                    </div>
                </div>

                {/* 5. Tiempo Estándar */}
                <div className="bg-[#1a2633]/30 backdrop-blur-md border border-white/5 p-8 rounded-[2.5rem] hover:border-[#22c55e]/30 transition-all duration-300 flex flex-col h-full shadow-lg group">
                    <div className="w-12 h-12 bg-[#22c55e]/10 rounded-xl flex items-center justify-center mb-6 text-[#22c55e] font-bold text-xl group-hover:scale-110 transition-transform">
                        <Timer size={24} />
                    </div>
                    <h3 className="text-white text-xl font-bold mb-4 uppercase italic">Envío Express Aéreo</h3>
                    <p className="text-slate-300 text-sm mb-6 flex-grow font-medium leading-relaxed">
                        Tus paquetes viajan de Miami a Lima en un tiempo promedio de <strong className="text-[#22c55e] text-lg font-black">3-7 días</strong> hábiles.
                    </p>
                    <div className="bg-[#22c55e]/10 border border-[#22c55e]/20 rounded-xl p-3 text-[13px] text-[#22c55e] font-bold">
                        Salidas semanales garantizadas todos los miercoles y viernes.
                    </div>
                </div>

                {/* 6. Provincias */}
                <div className="bg-[#1a2633]/30 backdrop-blur-md border border-white/5 p-8 rounded-[2.5rem] hover:border-[#22c55e]/30 transition-all duration-300 flex flex-col h-full shadow-lg group">
                    <div className="w-12 h-12 bg-[#22c55e]/10 rounded-xl flex items-center justify-center mb-6 text-[#22c55e] font-bold text-xl group-hover:scale-110 transition-transform">
                        <Truck size={24} />
                    </div>
                    <h3 className="text-white text-xl font-bold mb-4 uppercase italic">Envíos a provincias</h3>
                    <p className="text-slate-300 text-sm mb-6 font-medium">
                        Llegamos a todo el Perú mediante las agencias más confiables:
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                        {['Shalom', 'Olva Courier', 'Marvisur'].map((agencia) => (
                            <span key={agencia} className="bg-[#0b1118] border border-white/10 px-3 py-1 rounded-full text-[10px] text-slate-300 font-black uppercase tracking-tighter">
                                {agencia}
                            </span>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}