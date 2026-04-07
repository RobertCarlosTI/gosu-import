import React from 'react';

export default function Cta() {
    return (
        <section className="relative z-10 w-full max-w-5xl mx-auto px-4 pb-32 pt-10">
            
            {/* =========================================
                PARTE 1: CONTÁCTANOS
            ========================================= */}
            <div className="mb-24">
                <div className="text-center mb-10">
                    <h2 className="text-white text-3xl md:text-4xl font-bold mb-3 tracking-tight">
                        Contáctanos
                    </h2>
                    <p className="text-slate-400 text-base md:text-lg">
                        Estamos aquí para ayudarte con tu importación
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    
                    {/* Tarjeta Email */}
                    <div className="bg-[#111827]/60 backdrop-blur-md border border-white/5 p-8 rounded-2xl flex flex-col items-center text-center hover:border-[#22c55e]/30 transition-all duration-300">
                        <div className="w-14 h-14 bg-[#22c55e]/10 rounded-2xl flex items-center justify-center mb-5 text-[#22c55e]">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                            </svg>
                        </div>
                        <h3 className="text-white font-bold mb-2">Email</h3>
                        <p className="text-slate-400 text-sm">gosu.import01@gmail.com</p>
                    </div>

                    {/* Tarjeta WhatsApp */}
                    <div className="bg-[#111827]/60 backdrop-blur-md border border-white/5 p-8 rounded-2xl flex flex-col items-center text-center hover:border-[#22c55e]/30 transition-all duration-300">
                        <div className="w-14 h-14 bg-[#22c55e]/10 rounded-2xl flex items-center justify-center mb-5 text-[#22c55e]">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
                            </svg>
                        </div>
                        <h3 className="text-white font-bold mb-2">WhatsApp</h3>
                        <p className="text-slate-400 text-sm">+51 907 024 684</p>
                    </div>

                    {/* Tarjeta Horario */}
                    <div className="bg-[#111827]/60 backdrop-blur-md border border-white/5 p-8 rounded-2xl flex flex-col items-center text-center hover:border-[#22c55e]/30 transition-all duration-300">
                        <div className="w-14 h-14 bg-[#22c55e]/10 rounded-2xl flex items-center justify-center mb-5 text-[#22c55e]">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </div>
                        <h3 className="text-white font-bold mb-2">Horario</h3>
                        <p className="text-slate-400 text-sm">Lun-Vie 9-6, Sáb 9-1</p>
                    </div>
                </div>
            </div>
        </section>
    );
}