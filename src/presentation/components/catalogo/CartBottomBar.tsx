import React from 'react';

interface Props {
    totalItems: number;
    totalPrecio: number;
    canCheckout: boolean;
    minPerfumes: number;
    currentPerfumes: number;
    submitting: boolean;
    onCheckout: () => void;
}

export const CartBottomBar = ({ totalItems, totalPrecio, canCheckout, minPerfumes, currentPerfumes, submitting, onCheckout }: Props) => {
    if (totalItems === 0) return null;

    return (
        <div className="fixed bottom-0 left-0 w-full bg-[#070b12]/90 backdrop-blur-xl border-t border-white/10 p-6 z-[120] animate-in slide-in-from-bottom duration-300">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <div className="relative">
                        <div className="bg-[#22c55e] text-[#070b12] w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                            {totalItems}
                        </div>
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-1">Inversión Estimada</p>
                        <p className="text-3xl font-black italic text-white leading-none">S/ {totalPrecio.toFixed(2)}</p>
                    </div>
                </div>

                <div className="text-right">
                    {canCheckout ? (
                        <button 
                            onClick={onCheckout}
                            disabled={submitting}
                            className="bg-[#22c55e] text-[#070b12] px-10 py-4 rounded-2xl font-black uppercase text-sm italic tracking-widest shadow-lg active:scale-95 disabled:opacity-50 transition-all hover:bg-[#1eb054]"
                        >
                            {submitting ? 'PROCESANDO...' : 'UNIRSE AL CONSOLIDADO'}
                        </button>
                    ) : (
                        <div className="text-right">
                            <p className="text-amber-500 text-xs font-black uppercase italic mb-1">Mínimo de Importación: {minPerfumes} unidades</p>
                            <div className="w-48 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-amber-500 transition-all duration-500" 
                                    style={{ width: `${(currentPerfumes / minPerfumes) * 100}%` }}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};