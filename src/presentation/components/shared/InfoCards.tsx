import React from 'react';

export default function InfoCards() {
    return (
        <section className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4 py-20 bg-transparent">
            {/* Tarjeta: Tiempo */}
            <div className="bg-[#1a2633]/40 backdrop-blur-md border border-white/10 p-8 rounded-[2rem] hover:border-[#22c55e]/30 transition-all duration-500 group shadow-lg">
                <div className="w-12 h-12 bg-[#22c55e]/10 rounded-xl flex items-center justify-center mb-6 text-[#22c55e] font-bold group-hover:scale-110 transition-transform">
                    ⚡
                </div>
                <h3 className="text-white text-xl font-bold mb-3 tracking-tight">Envío Express 3-7 Días</h3>
                <p className="text-slate-400 text-sm leading-relaxed font-medium">
                    Información de tránsito: Servicio aéreo garantizado desde nuestro almacén en Miami directo a Lima y provincias.
                </p>
            </div>

            {/* Tarjeta: Costos */}
            <div className="bg-[#1a2633]/40 backdrop-blur-md border border-white/10 p-8 rounded-[2rem] hover:border-[#22c55e]/30 transition-all duration-500 group shadow-lg">
                <div className="w-12 h-12 bg-[#22c55e]/10 rounded-xl flex items-center justify-center mb-6 text-[#22c55e] text-xl font-bold group-hover:scale-110 transition-transform">
                    $
                </div>
                <h3 className="text-white text-xl font-bold mb-3 tracking-tight">Tarifa Plana $12/kg</h3>
                <p className="text-slate-400 text-sm leading-relaxed font-medium">
                    Detalle de cobro: Solo pagas por el peso neto real de tu paquete. Sin cargos por volumen ni comisiones ocultas.
                </p>
            </div>

            {/* Tarjeta: Seguridad */}
            <div className="bg-[#1a2633]/40 backdrop-blur-md border border-white/10 p-8 rounded-[2rem] hover:border-[#22c55e]/30 transition-all duration-500 group shadow-lg">
                <div className="w-12 h-12 bg-[#22c55e]/10 rounded-xl flex items-center justify-center mb-6 text-[#22c55e] font-bold group-hover:scale-110 transition-transform">
                    🛡️
                </div>
                <h3 className="text-white text-xl font-bold mb-3 tracking-tight">100% Garantizado</h3>
                <p className="text-slate-400 text-sm leading-relaxed font-medium">
                    Protección de carga: Todos los paquetes cuentan con seguro integral durante el trayecto internacional completo.
                </p>
            </div>
        </section>
    );
}