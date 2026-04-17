"use client";
import React, { useState } from 'react';
import { Smartphone, Target, Package, Zap, BarChart3, ChevronDown, ShieldCheck } from 'lucide-react';

// === 1. TARIFAS REALES GOSU IMPORT (IPHONES) ===
const IPHONE_RATES = {
  "iPhone 13 / 13 Pro": { normal: 75, vip: 60 },
  "iPhone 13 Pro Max": { normal: 80, vip: 65 },
  "iPhone 14 / 14 Pro": { normal: 85, vip: 70 },
  "iPhone 14 Pro Max": { normal: 90, vip: 75 },
  "iPhone 15 / 15 Pro": { normal: 95, vip: 80 },
  "iPhone 15 Pro Max": { normal: 100, vip: 85 },
  "iPhone 16 / 16 Pro": { normal: 105, vip: 90 },
  "iPhone 16 Pro Max": { normal: 110, vip: 95 },
  "iPhone 17 / 17 Plus": { normal: 115, vip: 100 },
  "iPhone 17 Pro": { normal: 125, vip: 110 },
  "iPhone 17 Pro Max": { normal: 135, vip: 120 },
};

interface Props {
  user?: {
    nombre: string;
    esVip: boolean;
  }
}

export const GosuCalculator = ({ user }: Props) => {
  // Estados de la calculadora
  const [selectedMethod, setSelectedMethod] = useState<'viajero' | 'courier'>('viajero');
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [fobValue, setFobValue] = useState<number>(999);
  
  // Lógica VIP desde Base de Datos
  const isVip = user?.esVip || false;

  const currentRateData = selectedModel ? IPHONE_RATES[selectedModel as keyof typeof IPHONE_RATES] : null;

  // Cálculos
  const tcReferencial = 3.85; 
  const fleteDolares = currentRateData ? (isVip ? currentRateData.vip : currentRateData.normal) : 0;
  const fleteSoles = (fleteDolares * tcReferencial).toFixed(2);

  // Generar link de WhatsApp
  const getWhatsAppLink = () => {
    if (!selectedModel) return '#';
    const msg = `Hola Gosu Import, deseo una cotización:\n- Modelo: ${selectedModel}\n- Método: ${selectedMethod.toUpperCase()}\n- Flete: $${fleteDolares}`;
    return `https://wa.me/519XXXXXXXX?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="bg-[#0e141f] border border-white/5 p-6 md:p-10 rounded-[32px] max-w-6xl mx-auto shadow-2xl relative overflow-hidden">
      {/* Glow de fondo */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#22c55e]/5 blur-[120px] rounded-full"></div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 relative z-10">
        
        {/* COLUMNA IZQUIERDA: INPUTS */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* PASO 1: MÉTODO */}
          <div>
            <label className="text-[10px] font-black uppercase text-slate-500 mb-3 block italic tracking-[0.2em]">Paso 1. Método de Envío</label>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setSelectedMethod('viajero')}
                className={`flex items-center justify-center gap-3 py-4 rounded-2xl font-black uppercase italic text-xs transition-all border ${selectedMethod === 'viajero' ? 'bg-[#22c55e] text-[#070b12] border-transparent shadow-[0_0_20px_rgba(34,197,94,0.3)]' : 'bg-white/5 text-white border-white/10 hover:border-[#22c55e]/50'}`}
              >
                <Package size={16} /> Método Viajero
              </button>
              <button 
                onClick={() => setSelectedMethod('courier')}
                className={`flex items-center justify-center gap-3 py-4 rounded-2xl font-black uppercase italic text-xs transition-all border ${selectedMethod === 'courier' ? 'bg-[#22c55e] text-[#070b12] border-transparent shadow-[0_0_20px_rgba(34,197,94,0.3)]' : 'bg-white/5 text-white border-white/10 hover:border-[#22c55e]/50'}`}
              >
                <Target size={16} /> Método Courier
              </button>
            </div>
          </div>

          {/* PASO 2: PRODUCTO */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-[10px] font-black uppercase text-slate-500 mb-3 block italic tracking-[0.2em]">Paso 2. Selecciona el Modelo</label>
              <div className="relative">
                <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#22c55e]" size={18} />
                <select 
                  onChange={(e) => setSelectedModel(e.target.value)} 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-12 pr-10 text-white font-bold outline-none appearance-none focus:border-[#22c55e] transition-all cursor-pointer"
                >
                  <option value="" className="bg-[#070b12]">Elegir iPhone...</option>
                  {Object.keys(IPHONE_RATES).map(m => <option key={m} value={m} className="bg-[#070b12]">{m}</option>)}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-black uppercase text-slate-500 mb-3 block italic tracking-[0.2em]">Valor FOB (USD)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#22c55e] font-black">$</span>
                <input 
                  type="number" 
                  value={fobValue} 
                  onChange={(e) => setFobValue(Number(e.target.value))}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-12 pr-4 text-white font-bold outline-none focus:border-[#22c55e]"
                />
              </div>
            </div>
          </div>

          {/* TARIFAS COMPARATIVAS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#22c55e] p-6 rounded-[24px] text-[#070b12] relative overflow-hidden group">
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-black uppercase italic tracking-widest">Cotización Gosu</span>
                  {isVip && <ShieldCheck size={20} />}
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-6xl font-black italic tracking-tighter">${fleteDolares}</span>
                  <span className="text-[10px] font-bold uppercase opacity-70">S/ {fleteSoles}</span>
                </div>
                <p className="text-[8px] font-black uppercase mt-4 italic tracking-widest opacity-80">* Tarifa {isVip ? 'Socio VIP' : 'Cliente Normal'}</p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-6 rounded-[24px] text-white/30 relative">
              <span className="text-[10px] font-black uppercase italic tracking-widest mb-2 block">Courier Regular</span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black italic tracking-tighter opacity-30">${(fleteDolares * 1.6).toFixed(0)}</span>
              </div>
              <p className="text-[8px] font-black uppercase mt-4 italic tracking-widest opacity-30">* Basado en promedio del mercado</p>
            </div>
          </div>

          <a 
            href={getWhatsAppLink()} 
            target="_blank" 
            className="w-full bg-white text-[#070b12] py-6 rounded-2xl font-black uppercase italic tracking-[0.3em] hover:bg-[#22c55e] transition-all flex items-center justify-center gap-3 shadow-xl"
          >
            Solicitar vía WhatsApp
          </a>
        </div>

        {/* COLUMNA DERECHA: INFO EXTRA */}
        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 p-6 rounded-3xl">
            <div className="flex items-center gap-2 mb-6">
              <Zap size={18} className="text-[#22c55e]" />
              <h3 className="font-black uppercase italic text-sm text-white">Top Proveedores</h3>
            </div>
            <div className="space-y-3">
              {['Back Market', 'Swappa', 'Amazon'].map(p => (
                <div key={p} className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/5">
                  <span className="text-xs font-bold text-white uppercase">{p}</span>
                  <span className="text-[9px] font-black text-[#22c55e] uppercase italic">Recomendado</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 border border-[#22c55e]/20 rounded-3xl bg-[#22c55e]/5">
             <p className="text-[10px] text-slate-400 font-bold uppercase italic leading-relaxed">
               Todas nuestras tarifas incluyen <span className="text-white">Tax de USA</span> y entrega en Lima. Sin sorpresas al llegar.
             </p>
          </div>
        </div>

      </div>
    </div>
  );
};