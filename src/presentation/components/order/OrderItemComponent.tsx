import React from 'react';
import { Package, Trash2 } from 'lucide-react';
import { OrderItem } from '@/src/domain/entities/Order';

interface Props {
    item: OrderItem;
    isCart: boolean;
    onDelete: (id: string) => void;
}

export const OrderItemComponent = ({ item, isCart, onDelete }: Props) => {
    return (
        <div className="p-8 flex items-center gap-6 group hover:bg-white/[0.01] transition-all">
            <div className="w-24 h-24 bg-[#0b0f1a] border border-white/10 rounded-2xl flex items-center justify-center shrink-0 overflow-hidden shadow-inner">
                {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                ) : (
                    <Package className="text-slate-800" size={32} />
                )}
            </div>
            <div className="flex-1">
                <p className="text-lg font-black uppercase tracking-tighter italic text-white leading-tight">{item.name}</p>
                <p className="text-[10px] font-bold text-amber-400/60 uppercase tracking-widest mt-1">{item.brand}</p>
                <div className="flex items-center gap-4 mt-4">
                    <span className="text-xs font-black text-slate-400 bg-white/5 px-3 py-1 rounded-lg border border-white/5">CANT: {item.quantity}</span>
                    <span className="text-xs font-black text-white italic">S/ {(item.price * item.quantity).toFixed(2)}</span>
                </div>
            </div>
            {isCart && (
                <button onClick={() => onDelete(item.id)} className="p-3 text-slate-600 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all">
                    <Trash2 size={20} />
                </button>
            )}
        </div>
    );
};