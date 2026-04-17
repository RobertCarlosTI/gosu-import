import React from 'react';
import { ShoppingCart, Scale } from 'lucide-react';

export const ProductoCard = ({ producto }: any) => {
  const flete = producto.peso * 12; // Tarifa plana de $12
  const total = producto.precioUSA + flete;

  return (
    <div className="group bg-[#1a2633]/40 backdrop-blur-md border border-white/5 p-6 rounded-[2.5rem] hover:border-[#22c55e]/40 transition-all duration-500 shadow-xl overflow-hidden relative">
      
      {/* Badge de Tarifa */}
      <div className="absolute top-4 right-4 bg-[#22c55e]/10 border border-[#22c55e]/20 px-3 py-1 rounded-full z-10">
        <span className="text-[#22c55e] text-[10px] font-black uppercase tracking-widest italic">$12/KG</span>
      </div>

      {/* Imagen del Producto (Placeholder) */}
      <div className="aspect-square bg-black/40 rounded-3xl mb-6 flex items-center justify-center border border-white/5 group-hover:scale-105 transition-transform duration-500">
          <img src={producto.imagen} alt={producto.nombre} className="w-3/4 object-contain drop-shadow-2xl" />
      </div>

      <div className="space-y-1 mb-4">
        <h3 className="text-white text-xl font-bold italic uppercase tracking-tighter">{producto.nombre}</h3>
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">{producto.categoria}</p>
      </div>

      {/* Desglose de Costos */}
      <div className="bg-black/40 rounded-2xl p-4 mb-6 space-y-2 border border-white/5">
        <div className="flex justify-between text-[11px] font-medium">
          <span className="text-slate-400">Precio USA:</span>
          <span className="text-white">${producto.precioUSA.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-[11px] font-medium">
          <span className="text-slate-400 italic">Flete GOSU ({producto.peso}kg):</span>
          <span className="text-[#22c55e] font-bold">${flete.toFixed(2)}</span>
        </div>
        <div className="pt-2 border-t border-white/5 flex justify-between items-center">
          <span className="text-slate-300 font-black text-xs uppercase italic">Total puesto en Perú:</span>
          <span className="text-white text-xl font-black">${total.toFixed(2)}</span>
        </div>
      </div>

      <button className="w-full bg-[#22c55e] text-[#0b1118] py-4 rounded-xl font-black text-xs uppercase italic hover:bg-[#1ea950] transition-all flex items-center justify-center gap-2 group-hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]">
        <ShoppingCart size={14} /> Solicitar Importación
      </button>
    </div>
  );
};