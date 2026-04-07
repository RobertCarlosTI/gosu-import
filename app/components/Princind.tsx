import React from 'react';

// Sub-componente solo para este archivo
const PricingCard = ({ icon, title, subtitle }: { icon: string, title: string, subtitle: string }) => (
    <div className="bg-[#1a2633]/30 backdrop-blur-md border border-white/5 p-6 rounded-[2rem] flex flex-col items-center text-center hover:border-[#22c55e]/40 transition-all duration-500 group shadow-lg">
        <div className="w-12 h-12 bg-[#22c55e]/10 rounded-2xl flex items-center justify-center mb-4 text-[#22c55e] group-hover:scale-110 transition-transform">
            {icon === 'balance' && <span className="text-2xl">⚖️</span>}
            {icon === 'box' && <span className="text-2xl">📦</span>}
            {icon === 'gift' && <span className="text-2xl">🎁</span>}
            {icon === 'clock' && <span className="text-2xl">🕒</span>}
        </div>
        <h4 className="text-white font-bold text-lg mb-1">{title}</h4>
        <p className="text-slate-400 text-sm">{subtitle}</p>
    </div>
);

export default function Pricing() {
    return (
        <section className="relative z-10 w-full max-w-6xl mx-auto py-24 px-4 bg-transparent">
            {/* Título */}
            <div className="text-center mb-16">
                <h2 className="text-white text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">Tarifa plana transparente</h2>
                <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
                    <span className="text-white text-6xl md:text-8xl font-black">$12</span>
                    <span className="text-[#22c55e] text-4xl md:text-6xl font-black uppercase tracking-tighter">por kilogramo</span>
                </div>
                <p className="text-slate-400 text-lg md:text-2xl mt-6 font-medium max-w-3xl mx-auto">Peso neto real, sin volumétrico. Mínimo 1 kg.</p>
            </div>

            {/* Grid de 4 beneficios */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                <PricingCard icon="balance" title="Peso neto real" subtitle="Sin volumétrico" />
                <PricingCard icon="box" title="Consolidación gratis" subtitle="Hasta 5 paquetes" />
                <PricingCard icon="gift" title="Sin impuestos USA" subtitle="Ahorra el 7%" />
                <PricingCard icon="clock" title="Express 3 - 7 días" subtitle="Garantizado" />
            </div>

            {/* Calculadora visual */}
            <div className="max-w-3xl mx-auto bg-[#111827]/80 backdrop-blur-xl border border-[#22c55e]/30 p-10 rounded-[3rem] shadow-[0_0_50px_-12px_rgba(34,197,94,0.2)] text-center relative overflow-hidden">
                {/* Brillo de fondo verde */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#22c55e]/10 rounded-full blur-3xl"></div>
                
                <div className="flex items-center justify-center gap-3 mb-6 text-[#22c55e] font-bold uppercase tracking-[0.3em] text-xs">
                    <span className="text-lg">🔢</span> Ejemplo de cálculo real
                </div>
                <div className="text-white text-3xl md:text-5xl font-bold mb-4 tracking-tight">
                    Paquete de 1.25 kg = <span className="text-[#22c55e]">$15.00</span>
                </div>
                <p className="text-slate-500 text-lg md:text-xl font-mono italic">(1.25 kg × $12.00 = $15.00, sin redondeos)</p>
            </div>
        </section>
    );
}