import React from 'react';
import { CheckCircle } from 'lucide-react';

interface PricingCardProps {
    title: string;
    price: number;
    tc: number;
    isSelected: boolean;
    description: string;
    onClick: () => void;
    isStrikethrough?: boolean;
}

export const PriceComparison = ({ travelerPrice, regularPrice, selectedMethod, onSelect, tc }: any) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Tarjeta Viajero */}
            <button 
                onClick={() => onSelect('viajero')}
                className={`relative group bg-slate-900/40 backdrop-blur-xl border rounded-[2rem] p-6 text-left transition-all duration-300 ${selectedMethod === 'viajero' ? 'border-[#22c55e] shadow-[0_0_20px_rgba(34,197,94,0.1)] scale-105 z-10' : 'border-white/10'}`}
            >
                {selectedMethod === 'viajero' && <CheckCircle className="absolute top-5 right-5 text-[#22c55e]" size={24}/>}
                <h3 className="text-white text-xs font-black uppercase tracking-widest mb-4">Cotización Viajero</h3>
                <div className="text-4xl font-black text-[#22c55e] tracking-tighter mb-1">${travelerPrice.toFixed(2)}</div>
                <div className="text-slate-300 font-bold text-sm">S/ {(travelerPrice * tc).toFixed(2)}</div>
                <p className="text-slate-500 text-[11px] mt-4">Tarifa fija optimizada GOSU.</p>
            </button>

            {/* Tarjeta Regular */}
            <button 
                onClick={() => onSelect('regular')}
                className={`relative group bg-slate-900/40 backdrop-blur-xl border rounded-[2rem] p-6 text-left transition-all duration-300 ${selectedMethod === 'regular' ? 'border-[#22c55e] shadow-[0_0_20px_rgba(34,197,94,0.1)] scale-105 z-10' : 'border-white/10'}`}
            >
                {selectedMethod === 'regular' && <CheckCircle className="absolute top-5 right-5 text-[#22c55e]" size={24}/>}
                <h3 className="text-slate-400 text-xs font-black uppercase tracking-widest mb-4">Courier Regular</h3>
                <div className="text-4xl font-black text-white/40 tracking-tighter mb-1 line-through decoration-red-500/50">${regularPrice.toFixed(2)}</div>
                <div className="text-slate-500 font-bold text-sm">S/ {(regularPrice * tc).toFixed(2)}</div>
                <p className="text-slate-500 text-[11px] mt-4">Incluye flete, desaduanaje e impuestos.</p>
            </button>
        </div>
    );
};