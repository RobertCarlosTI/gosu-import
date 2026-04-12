import React from 'react';
import { Package, ArrowRight } from 'lucide-react';

interface Props {
    items: any[];
    subtotal: number;
    costoEnvio: number;
    total: number;
    tipoEnvio: string;
    onFinalize: () => void;
}

export const OrderSummaryCard = ({ items, subtotal, costoEnvio, total, tipoEnvio, onFinalize }: Props) => {
    // Función de seguridad para asegurar que siempre haya un número válido
    const formatPrice = (value: number) => {
        const num = Number(value);
        return isNaN(num) ? "0.00" : num.toFixed(2);
    };

    return (
        <div className="bg-[#1c1f26] rounded-3xl p-8 sticky top-32 border border-white/5 shadow-2xl">
            <h3 className="text-xl font-black uppercase tracking-tighter mb-6 text-slate-200 text-center italic">Tu Pedido Gosu</h3>
            
            {/* Lista de productos con scroll interno si hay muchos */}
            <div className="space-y-4 mb-6 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                {items && items.length > 0 ? (
                    items.map((p, idx) => (
                        <div key={idx} className="flex gap-4 items-center bg-white/5 p-3 rounded-xl border border-white/5">
                            <div className="w-10 h-10 bg-[#0b0f1a] rounded-lg border border-white/10 flex items-center justify-center shrink-0 overflow-hidden">
                                {p.perfumes?.image ? (
                                    <img src={p.perfumes.image} alt="producto" className="w-full h-full object-contain" />
                                ) : (
                                    <Package size={18} className="text-amber-400" />
                                )}
                            </div>
                            <div className="flex-1 text-[10px] font-black uppercase truncate text-slate-300">
                                {p.perfumes?.name || p.nombre_perfume || 'Producto'}
                            </div>
                            <div className="text-xs font-black text-amber-400">
                                x{p.cantidad || p.quantity || 0}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-slate-500 text-xs italic py-4">No hay productos seleccionados</p>
                )}
            </div>

            {/* Desglose de costos */}
            <div className="border-t border-white/10 pt-4 space-y-3 mb-6">
                <div className="flex justify-between text-[10px] text-slate-500 uppercase font-bold tracking-widest">
                    <span>Subtotal</span>
                    <span className="text-white">S/ {formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-[10px] text-slate-500 uppercase font-bold tracking-widest">
                    <span>Envío</span>
                    <span className="text-amber-400 italic">
                        {tipoEnvio === 'shalom' ? 'PAGO EN DESTINO' : `S/ ${formatPrice(costoEnvio)}`}
                    </span>
                </div>
            </div>

            {/* Total Final */}
            <div className="border-t border-white/10 pt-6 mb-8 flex justify-between items-center">
                <span className="text-xl font-black uppercase text-slate-200">Total</span>
                <span className="text-3xl font-black text-amber-400 italic drop-shadow-[0_0_10px_rgba(251,191,36,0.2)]">
                    S/ {formatPrice(total)}
                </span>
            </div>

            {/* Botón de acción */}
            <button 
                onClick={onFinalize}
                disabled={!items || items.length === 0}
                className="w-full bg-white text-black font-black py-5 uppercase flex items-center justify-center gap-3 hover:bg-amber-400 active:scale-95 transition-all rounded-2xl shadow-xl tracking-tighter italic disabled:opacity-50 disabled:cursor-not-allowed"
            >
                FINALIZAR COMPRA <ArrowRight size={20} />
            </button>
        </div>
    );
};