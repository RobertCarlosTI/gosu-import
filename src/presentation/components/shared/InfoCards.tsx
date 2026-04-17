import React from 'react';
import { Truck, DollarSign, ShieldCheck } from 'lucide-react';

const infoData = [
  {
    icon: <Truck className="w-6 h-6" />,
    title: "Envío Express 3-7 Días",
    description: "Servicio aéreo garantizado desde nuestro almacén en Miami directo a Lima y provincias.",
    label: "Tránsito"
  },
  {
    icon: <DollarSign className="w-6 h-6" />,
    title: "Tarifa Plana $12/kg",
    description: "Solo pagas por el peso neto real de tu paquete. Sin cargos por volumen ni comisiones ocultas.",
    label: "Cobro"
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "100% Garantizado",
    description: "Protección de carga: Seguro integral durante todo el trayecto internacional completo.",
    label: "Seguridad"
  }
];

export default function InfoCards() {
  return (
    <section className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4 py-20">
      {infoData.map((item, index) => (
        <div 
          key={index}
          className="group relative bg-[#1a2633]/40 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] hover:border-[#22c55e]/50 transition-all duration-500 shadow-2xl overflow-hidden"
        >
          {/* Efecto de luz ambiental al hacer hover */}
          <div className="absolute -inset-px bg-gradient-to-br from-[#22c55e]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative z-10">
            {/* Contenedor del Icono */}
            <div className="w-14 h-14 bg-gradient-to-br from-[#22c55e]/20 to-[#22c55e]/5 rounded-2xl flex items-center justify-center mb-6 text-[#22c55e] group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-lg shadow-[#22c55e]/10">
              {item.icon}
            </div>

            {/* Etiqueta pequeña superior */}
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#22c55e]/60 mb-2 block">
              {item.label}
            </span>

            <h3 className="text-white text-xl font-bold mb-3 tracking-tight group-hover:text-[#22c55e] transition-colors">
              {item.title}
            </h3>

            <p className="text-slate-400 text-sm leading-relaxed font-medium">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}