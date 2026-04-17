"use client";
import React from 'react';
import { Mail, MessageSquare, Clock, ArrowRight } from 'lucide-react';

export default function Cta() {
    return (
        <section id="contacto" className="relative z-10 w-full max-w-6xl mx-auto px-4 pb-32 pt-10 scroll-mt-24">
            
            {/* =========================================
                SECCIÓN: CONTÁCTANOS
            ========================================= */}
            <div className="mb-24">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#22c55e]/20 bg-[#22c55e]/5 text-[#22c55e] text-xs font-black uppercase tracking-widest mb-6">
                        Contacto Directo
                    </div>
                    <h2 className="text-white text-4xl md:text-6xl font-black mb-4 tracking-tighter italic uppercase">
                        ¿Tienes alguna <span className="text-[#22c55e]">Duda?</span>
                    </h2>
                    <p className="text-slate-400 text-lg font-medium max-w-2xl mx-auto">
                        Nuestro equipo está listo para asesorarte en cada paso de tu importación.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    
                    {/* Tarjeta Email */}
                    <div className="group bg-[#1a2633]/30 backdrop-blur-md border border-white/5 p-10 rounded-[2.5rem] flex flex-col items-center text-center hover:border-[#22c55e]/40 transition-all duration-500 shadow-xl">
                        <div className="w-16 h-16 bg-[#22c55e]/10 rounded-2xl flex items-center justify-center mb-6 text-[#22c55e] group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                            <Mail size={28} />
                        </div>
                        <h3 className="text-white font-black uppercase italic tracking-wider mb-2">Email Oficial</h3>
                        <p className="text-slate-400 text-sm font-medium">gosu.import01@gmail.com</p>
                    </div>

                    {/* Tarjeta WhatsApp */}
                    <a 
                        href="https://wa.me/51907024684" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group bg-[#1a2633]/50 backdrop-blur-md border border-[#22c55e]/20 p-10 rounded-[2.5rem] flex flex-col items-center text-center hover:border-[#22c55e]/60 transition-all duration-500 shadow-[0_0_30px_rgba(34,197,94,0.1)] hover:shadow-[0_0_40px_rgba(34,197,94,0.2)]"
                    >
                        <div className="w-16 h-16 bg-[#22c55e] rounded-2xl flex items-center justify-center mb-6 text-[#0b1118] group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
                            <MessageSquare size={28} fill="currentColor" />
                        </div>
                        <h3 className="text-white font-black uppercase italic tracking-wider mb-2">WhatsApp</h3>
                        <p className="text-[#22c55e] text-lg font-black">+51 907 024 684</p>
                        <span className="text-[10px] text-slate-500 mt-2 font-bold uppercase tracking-widest">Atención inmediata</span>
                    </a>

                    {/* Tarjeta Horario */}
                    <div className="group bg-[#1a2633]/30 backdrop-blur-md border border-white/5 p-10 rounded-[2.5rem] flex flex-col items-center text-center hover:border-[#22c55e]/40 transition-all duration-500 shadow-xl">
                        <div className="w-16 h-16 bg-[#22c55e]/10 rounded-2xl flex items-center justify-center mb-6 text-[#22c55e] group-hover:scale-110 transition-transform duration-500">
                            <Clock size={28} />
                        </div>
                        <h3 className="text-white font-black uppercase italic tracking-wider mb-2">Horario</h3>
                        <p className="text-slate-400 text-sm font-medium">Lun - Vie: 9am - 6pm</p>
                        <p className="text-slate-400 text-sm font-medium">Sábados: 9am - 1pm</p>
                    </div>

                </div>

                {/* Botón de Acción Inferior */}
                <div className="mt-16 flex justify-center">
                    <div className="p-1 rounded-[2rem] bg-gradient-to-r from-transparent via-[#22c55e]/20 to-transparent">
                        <div className="bg-[#0b1118] px-8 py-4 rounded-[2rem] flex flex-col md:flex-row items-center gap-6 border border-white/5">
                            <p className="text-slate-400 text-sm font-medium">¿Prefieres un registro rápido?</p>
                            <button 
                                onClick={() => window.location.href='/register'}
                                className="flex items-center gap-2 bg-[#22c55e] text-[#0b1118] px-6 py-3 rounded-xl font-black uppercase italic text-xs hover:bg-[#1ea950] transition-all"
                            >
                                Crear Casillero Gratis <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}