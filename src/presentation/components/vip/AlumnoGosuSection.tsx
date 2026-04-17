import React from 'react';
import { getAlumnoBenefits } from '@/src/application/use-cases/GetAlumnoBenefits';
import { ArrowRight, Sparkles } from 'lucide-react';

export const AlumnoGosuSection = () => {
    const benefits = getAlumnoBenefits();

    return (
        <section className="relative w-full max-w-5xl mx-auto px-4 py-20">
            {/* Contenedor Principal con Glassmorphism */}
            <div className="relative overflow-hidden bg-gradient-to-br from-[#111827] to-[#0b1118] border border-[#22c55e]/30 rounded-[4rem] p-8 md:p-16 shadow-[0_0_100px_-20px_rgba(34,197,94,0.15)]">
                
                {/* Decoración de fondo */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#22c55e]/10 blur-[120px] -z-10" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 blur-[100px] -z-10" />

                <div className="flex flex-col lg:flex-row items-center gap-12 relative z-10">
                    
                    {/* Texto Izquierda */}
                    <div className="flex-1 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/20 mb-6">
                            <Sparkles size={16} className="text-[#22c55e]" />
                            <span className="text-[#22c55e] text-xs font-black uppercase tracking-[0.2em]">Programa de Formación</span>
                        </div>
                        
                        <h2 className="text-white text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-6 leading-none">
                            ¿Quieres ser un <br />
                            <span className="text-[#22c55e]">Alumno GOSU?</span>
                        </h2>
                        
                        <p className="text-slate-400 text-lg font-medium mb-10 leading-relaxed max-w-md">
                            No solo somos un courier, somos tu socio estratégico. Aprende a importar desde cero con beneficios exclusivos en tus envíos.
                        </p>

                        <button className="group relative bg-[#22c55e] text-[#0b1118] px-10 py-5 rounded-2xl font-black text-xl hover:bg-[#1ea950] transition-all flex items-center gap-3 mx-auto lg:mx-0 shadow-[0_20px_40px_rgba(34,197,94,0.3)] italic uppercase">
                            Quiero Aprender
                            <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                        </button>
                    </div>

                    {/* Grid de Beneficios Derecha */}
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {benefits.map((benefit) => (
                            <div key={benefit.id} className="bg-white/5 border border-white/10 p-6 rounded-[2rem] hover:border-[#22c55e]/40 transition-all duration-500 group">
                                <div className="w-12 h-12 bg-[#22c55e]/10 rounded-xl flex items-center justify-center text-[#22c55e] mb-4 group-hover:scale-110 transition-transform">
                                    <benefit.icon size={24} />
                                </div>
                                <h4 className="text-white font-bold text-lg mb-2 uppercase italic tracking-tight">{benefit.title}</h4>
                                <p className="text-slate-500 text-xs leading-relaxed font-medium">{benefit.description}</p>
                            </div>
                        ))}
                        
                        {/* Card Especial de Tarifa */}
                        <div className="bg-[#22c55e] p-6 rounded-[2rem] flex flex-col justify-center items-center text-center shadow-xl">
                            <span className="text-[#0b1118] text-[10px] font-black uppercase tracking-widest mb-1">Beneficio Alumno</span>
                            <span className="text-[#0b1118] text-2xl font-black italic uppercase leading-none">Tarifa Fija</span>
                            <span className="text-white text-4xl font-black mt-1">$12.00</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};