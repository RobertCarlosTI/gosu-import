import React from 'react';
import { Plane, Package } from 'lucide-react';

interface Props {
    method: 'viajero' | 'courier';
    setMethod: (m: 'viajero' | 'courier') => void;
}

export const MethodSelector = ({ method, setMethod }: Props) => {
    return (
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 md:p-8">
            <h2 className="text-white text-xs font-black uppercase tracking-widest mb-4">Paso 1. Método de Envío</h2>
            <div className="grid grid-cols-2 gap-4">
                <button 
                    onClick={() => setMethod('viajero')}
                    className={`py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all border ${method === 'viajero' ? 'bg-[#22c55e] text-[#0b1118] border-[#22c55e] shadow-[0_0_20px_rgba(34,197,94,0.3)]' : 'bg-[#0b1118] text-slate-400 border-white/10 hover:border-[#22c55e]/50'}`}
                >
                    <Plane size={20} /> Método Viajero
                </button>
                <button 
                    onClick={() => setMethod('courier')}
                    className={`py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all border ${method === 'courier' ? 'bg-[#22c55e] text-[#0b1118] border-[#22c55e] shadow-[0_0_20px_rgba(34,197,94,0.3)]' : 'bg-[#0b1118] text-slate-400 border-white/10 hover:border-[#22c55e]/50'}`}
                >
                    <Package size={20} /> Método Courier
                </button>
            </div>
        </div>
    );
};