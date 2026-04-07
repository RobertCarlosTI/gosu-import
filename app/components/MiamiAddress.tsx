import React from 'react';

export default function MiamiAddress() {
    return (
        <section className="relative z-10 w-full max-w-4xl mx-auto py-20 px-4 bg-transparent">
            {/* Encabezado */}
            <div className="flex items-center justify-center gap-2 mb-4">
                <img src="https://flagcdn.com/w20/us.png" className="w-5 h-auto rounded-sm opacity-80" alt="USA" />
                <span className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em]">Dirección en Estados Unidos</span>
            </div>
            <div className="flex items-center gap-3 mb-8 justify-center">
                <div className="text-cyan-400 text-2xl">🏢</div>
                <h2 className="text-white text-2xl md:text-3xl font-bold tracking-tight">Tu Casillero en Miami</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch max-w-3xl mx-auto">
                {/* BLOQUE IZQUIERDO: LOS DATOS */}
                <div className="bg-[#111827]/60 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-xl">
                    <div className="space-y-4 font-mono text-[13px] md:text-[14px]">
                        <div className="flex flex-col"><span className="text-slate-500 text-[17px] font-bold uppercase mb-0.5">Name:<span className="text-white font-bold text-base">GOSU <span className="text-white font-bold text-base">[Tu Nombre]</span></span></span></div>
                        <div className="flex flex-col"><span className="text-slate-500 text-[15px] font-bold uppercase mb-0.5">Address: <span className="text-white text-[15px]">7255 NW 68th ST, Ste 14</span></span></div>
                        <div className="flex flex-col"><span className="text-slate-500 text-[15px] font-bold uppercase mb-0.5">City:<span className="text-white"> MIAMI</span></span></div>
                        <div className="flex flex-col"><span className="text-slate-500 text-[15px] font-bold uppercase mb-0.5">State:<span className="text-white"> FLORIDA</span></span></div>
                        <div className="flex flex-col"><span className="text-slate-500 text-[15px] font-bold uppercase mb-0.5">Zip Code:<span className="text-white"> 33166</span></span></div>
                        <div className="flex flex-col"><span className="text-slate-500 text-[15px] font-bold uppercase mb-0.5">Phone:<span className="text-white"> (786) 205-1018</span></span></div>
                    </div>
                </div>

                {/* BLOQUE DERECHO: LA ADVERTENCIA */}
                <div className="bg-[#0f172a]/80 backdrop-blur-md border border-[#22c55e]/30 p-6 md:p-8 rounded-2xl flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-6 h-6 rounded-full border border-[#22c55e] flex items-center justify-center text-[#22c55e] text-xs font-bold italic">!</div>
                        <h3 className="text-white text-lg font-bold italic">¡Importante! Código GOSU</h3>
                    </div>
                    <p className="text-slate-300 text-[13px] mb-6 leading-relaxed">
                        Siempre coloca <span className="bg-[#22c55e]/20 text-[#22c55e] px-1.5 py-0.5 rounded font-bold text-xs">GOSU</span> antes de tu nombre al registrar tu dirección.
                    </p>
                    <div className="bg-black/40 rounded-xl p-4 border border-white/5">
                        <span className="text-slate-500 text-[10px] block mb-1 uppercase font-bold tracking-wider">Ejemplo correcto:</span>
                        <div className="text-[#22c55e] font-mono text-base md:text-lg font-bold tracking-tight whitespace-nowrap">
                            GOSU ROBERT CARLOS
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}