import React from 'react';

interface CourierResultCardProps {
    totalCourierServicio: number;
    TC_ACTUAL: number;
    peso: number;
    fleteCourier: number;
    impuestos: number;
    desaduanaje: number; // 🚀 Propiedad nueva
}

export const CourierResultCard: React.FC<CourierResultCardProps> = ({
    totalCourierServicio, TC_ACTUAL, peso, fleteCourier, impuestos, desaduanaje
}) => {
    return (
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 shadow-xl rounded-[2rem] p-8 mt-6 animate-in fade-in slide-in-from-bottom-4">
            <h3 className="text-white text-sm font-black uppercase tracking-widest mb-4">Cotización Courier</h3>
            <div className="text-4xl font-black text-[#22c55e] tracking-tighter mb-1">$ {totalCourierServicio.toFixed(2)}</div>
            <div className="text-slate-300 font-bold text-sm">S/ {(totalCourierServicio * TC_ACTUAL).toFixed(2)}</div>
            
            <div className="mt-6 text-slate-400 font-medium text-sm space-y-2">
                <div className="flex justify-between border-b border-white/5 pb-2">
                    <span>Flete ({peso} kg):</span>
                    <span className="text-white">$ {fleteCourier.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                    <span>Desaduanaje:</span>
                    <span className="text-white">$ {desaduanaje.toFixed(2)}</span>
                </div>
                {impuestos > 0 && (
                    <div className="flex justify-between border-b border-white/5 pb-2 text-red-400">
                        <span>Impuestos SUNAT:</span>
                        <span>$ {impuestos.toFixed(2)}</span>
                    </div>
                )}
            </div>
            <p className="text-slate-500 text-xs mt-6 pt-6 border-t border-white/10">Tipo de cambio referencial: {TC_ACTUAL.toFixed(2)}</p>
        </div>
    );
};