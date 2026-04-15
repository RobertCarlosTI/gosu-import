import React from 'react';
// 🚩 Agrega 'Truck' dentro de las llaves
import { Plane, Truck } from 'lucide-react'; 

export const MethodSelector = ({ hookData }: any) => {
    // 🚩 SEGURIDAD: Si hookData no existe, no intentes sacar 'method'
    if (!hookData) return null; 

    const { method, setMethod } = hookData; 

    return (
        <div className="grid grid-cols-2 gap-4">
            <button 
                onClick={() => setMethod('viajero')}
                className={`py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${
                    method === 'viajero' ? 'bg-[#22c55e] text-black' : 'bg-white/5 text-slate-500'
                }`}
            >
                <Plane size={20} /> Método Viajero
            </button>

            <button 
                onClick={() => setMethod('courier')}
                className={`py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${
                    method === 'courier' ? 'bg-[#22c55e] text-black' : 'bg-white/5 text-slate-500'
                }`}
            >
                <Truck size={20} /> Método Courier
            </button>
        </div>
    );
};