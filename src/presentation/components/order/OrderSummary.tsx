import React from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Order } from '@/src/domain/entities/Order';

interface Props {
    order: Order;
    subtotal: number;
    isCart: boolean;
    shortId: string;
}

export const OrderSummary = ({ order, subtotal, isCart, shortId }: Props) => {
    const router = useRouter();

    return (
        <div className="bg-[#1c1f26] rounded-[2.5rem] p-10 border border-white/5 sticky top-32 shadow-2xl">
            <h3 className="text-2xl font-black uppercase tracking-tighter italic mb-8 border-b border-white/5 pb-6 text-slate-200">Resumen Económico</h3>
            
            <div className="space-y-6 mb-10">
                <div className="flex justify-between items-center text-slate-400 italic">
                    <span className="text-[11px] font-black uppercase tracking-widest">Subtotal Inversión</span>
                    <span className="font-black text-white text-lg tracking-tight">S/ {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-slate-400 italic">
                    <span className="text-[11px] font-black uppercase tracking-widest">Gasto de Envío</span>
                    <span className="font-black text-amber-400 uppercase text-xs">
                        {isCart ? 'Cálculo en checkout' : (order.shippingType === 'motorizado' ? `S/ ${order.shippingCost?.toFixed(2)}` : 'PAGO DESTINO')}
                    </span>
                </div>
                <div className="pt-8 border-t border-white/10 flex justify-between items-end">
                    <span className="text-2xl font-black uppercase tracking-tighter italic leading-none text-slate-200">TOTAL</span>
                    <div className="text-right">
                        <p className="text-5xl font-black text-amber-400 tracking-tighter leading-none italic">
                            S/ {(isCart ? subtotal : order.total).toFixed(2)}
                        </p>
                    </div>
                </div>
            </div>

            {isCart ? (
                <button 
                    onClick={() => router.push('/checkout')}
                    className="w-full bg-white text-black font-black py-5 uppercase tracking-tighter flex items-center justify-center gap-3 hover:bg-amber-400 transition-all rounded-2xl text-lg shadow-xl"
                >
                    PROCEDER AL PAGO <ArrowRight size={22} />
                </button>
            ) : (
                <button 
                    onClick={() => window.open(`https://wa.me/51926383191?text=Hola Robert, seguimiento de mi pedido #${shortId}`, '_blank')}
                    className="w-full bg-[#25d366]/10 text-[#25d366] border border-[#25d366]/20 font-black py-5 uppercase tracking-tighter flex items-center justify-center gap-3 hover:bg-[#25d366] hover:text-black transition-all rounded-2xl text-sm italic shadow-lg"
                >
                    <MessageCircle size={20} /> WHATSAPP SOPORTE
                </button>
            )}
        </div>
    );
};