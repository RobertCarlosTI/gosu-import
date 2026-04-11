"use client";
import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  Package, Trash2, Loader2, Plus, Minus, Calendar, 
  ChevronRight, Receipt, CreditCard, Plane, Ship 
} from 'lucide-react';
import Link from 'next/link'; // <--- ESTA ES LA IMPORTACIÓN QUE FALTABA
import Swal from 'sweetalert2';

// --- CONFIGURACIÓN DE ALERTAS GOSU ---
const GosuAlert = Swal.mixin({
  background: '#161b22',
  color: '#ffffff',
  confirmButtonColor: '#22c55e',
  cancelButtonColor: '#ef4444',
  customClass: {
    popup: 'rounded-[2rem] border border-white/10 shadow-2xl',
    title: 'font-black italic uppercase tracking-tighter',
  }
});

const GosuToast = Swal.mixin({
  toast: true, position: 'top-end', showConfirmButton: false,
  timer: 1500, background: '#16a34a', color: '#fff',
});

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function DashboardPage() {
    const [ordenActiva, setOrdenActiva] = useState<any>(null);
    const [detallesPerfumes, setDetallesPerfumes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async (silencioso = false) => {
        if (!silencioso) setLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
            const { data: ordenes } = await supabase.from('ordenes_perfumes').select('*').eq('user_id', session.user.id).order('created_at', { ascending: false });
            if (ordenes?.length) {
                setOrdenActiva(ordenes[0]);
                const { data: det } = await supabase.from('detalle_orden_perfumes').select('*').eq('orden_id', ordenes[0].id).order('nombre_perfume');
                if (det) setDetallesPerfumes(det);
            }
        }
        setLoading(false);
    };

    useEffect(() => { fetchData(); }, []);

    const recalcularTotales = async () => {
        if (!ordenActiva) return;
        const { data: detalles } = await supabase.from('detalle_orden_perfumes').select('*').eq('orden_id', ordenActiva.id);
        
        if (!detalles || detalles.length === 0) {
            await supabase.from('ordenes_perfumes').delete().eq('id', ordenActiva.id);
            setOrdenActiva(null);
            return;
        }

        const nuevoTotalItems = detalles.reduce((acc, d) => acc + d.cantidad, 0);
        const nuevaInversion = nuevoTotalItems * 108; 

        await supabase.from('ordenes_perfumes').update({
            total_unidades: nuevoTotalItems,
            inversion_total: nuevaInversion
        }).eq('id', ordenActiva.id);
    };

    const updateQty = async (id: string, newQty: number) => {
        if (newQty < 1) return;

        setDetallesPerfumes(prev => prev.map(item => item.id === id ? { ...item, cantidad: newQty } : item));

        const nuevoTotal = detallesPerfumes.reduce((acc, item) => {
            const cant = item.id === id ? newQty : item.cantidad;
            return acc + (cant * 108);
        }, 0);
        setOrdenActiva((prev: any) => ({ ...prev, inversion_total: nuevoTotal }));

        try {
            await supabase.from('detalle_orden_perfumes').update({ cantidad: newQty }).eq('id', id);
            await recalcularTotales();
            fetchData(true);
        } catch (error) {
            fetchData(true);
        }
    };

    const eliminarItem = async (detalleId: string) => {
        const result = await GosuAlert.fire({
            title: '¿QUITAR FRAGANCIA?',
            text: "Se eliminará este perfume de tu cesta.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'SÍ, ELIMINAR',
            cancelButtonText: 'CANCELAR'
        });

        if (result.isConfirmed) {
            const nuevaLista = detallesPerfumes.filter(item => item.id !== detalleId);
            setDetallesPerfumes(nuevaLista);

            try {
                await supabase.from('detalle_orden_perfumes').delete().eq('id', detalleId);
                await recalcularTotales();
                GosuToast.fire({ icon: 'success', title: 'Eliminado correctamente' });
                if (nuevaLista.length === 0) fetchData();
                else fetchData(true);
            } catch (e) { 
                console.error(e); 
            }
        }
    };

    if (loading) return <div className="min-h-screen bg-[#0b0f1a] flex items-center justify-center"><Loader2 className="text-[#22c55e] animate-spin" size={50} /></div>;

    return (
        <div className="min-h-screen bg-[#0b0f1a] text-white font-sans selection:bg-[#22c55e]/30 pt-40">
            <div className="max-w-[1400px] mx-auto p-6 md:p-12 space-y-12">
                
                <div className="space-y-2 border-l-4 border-[#22c55e] pl-6 mb-16">
                    <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none italic">TU CESTA</h1>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Verifica y gestiona tu inversión antes del envío.</p>
                </div>

                {detallesPerfumes.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                        <div className="lg:col-span-8">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse bg-white/[0.02] rounded-t-3xl overflow-hidden">
                                    <thead className="bg-[#161b22] border-b border-white/10">
                                        <tr>
                                            <th className="px-8 py-6 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Producto</th>
                                            <th className="px-8 py-6 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 text-center">Cantidad</th>
                                            <th className="px-8 py-6 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 text-right">Subtotal</th>
                                            <th className="px-8 py-6"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {detallesPerfumes.map((perfume) => (
                                            <tr key={perfume.id} className="hover:bg-white/[0.01] transition-all group">
                                                <td className="px-8 py-12">
                                                    <div className="flex items-center gap-8">
                                                        <div className="w-24 h-24 bg-[#161b22] flex items-center justify-center border border-white/5 rounded-xl shrink-0 group-hover:border-[#22c55e]/30 transition-all">
                                                            <Package size={40} className="text-slate-700 group-hover:text-[#22c55e] transition-colors" />
                                                        </div>
                                                        <div>
                                                            <p className="text-xl font-black uppercase tracking-tighter italic leading-none">{perfume.nombre_perfume}</p>
                                                            <p className="text-[10px] text-[#22c55e] font-black mt-2 uppercase tracking-widest">Importación VIP</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-12">
                                                    <div className="flex items-center justify-center">
                                                        <div className="flex items-center border border-white/10 bg-[#0b0f1a] rounded-lg">
                                                            <button onClick={() => updateQty(perfume.id, perfume.cantidad - 1)} className="w-12 h-12 flex items-center justify-center text-slate-400 hover:bg-white/5 transition-colors border-r border-white/10 active:scale-90"><Minus size={16}/></button>
                                                            <span className="w-14 text-center font-black text-xl">{perfume.cantidad}</span>
                                                            <button onClick={() => updateQty(perfume.id, perfume.cantidad + 1)} className="w-12 h-12 flex items-center justify-center text-slate-400 hover:bg-white/5 transition-colors border-l border-white/10 active:scale-90"><Plus size={16}/></button>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-12 text-right">
                                                    <p className="font-black text-2xl tracking-tighter italic text-white">S/ {(perfume.cantidad * 108).toFixed(2)}</p>
                                                </td>
                                                <td className="px-8 py-12 text-center">
                                                    <button onClick={() => eliminarItem(perfume.id)} className="text-slate-700 hover:text-red-500 transition-colors p-2">
                                                        <Trash2 size={22} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="lg:col-span-4 space-y-6">
                            <div className="bg-[#161b22] p-10 border border-white/5 shadow-2xl sticky top-40 rounded-3xl">
                                <h2 className="text-3xl font-black uppercase tracking-tighter mb-10 border-b border-white/10 pb-6 italic">RESUMEN</h2>
                                <div className="space-y-8">
                                    <div className="flex justify-between text-xs font-black text-slate-500 uppercase tracking-widest">
                                        <span>Subtotal</span>
                                        <span className="text-white text-base tracking-tighter italic">S/ {ordenActiva?.inversion_total?.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-xs font-black text-slate-500 uppercase tracking-widest items-center">
                                        <span>Envío USA - PERÚ</span>
                                        <span className="text-[#22c55e] bg-[#22c55e]/10 px-3 py-1 rounded-md text-[10px] shadow-[0_0_15px_rgba(34,197,94,0.1)] font-bold">INCLUIDO</span>
                                    </div>
                                    <div className="pt-8 border-t border-white/10 flex justify-between items-baseline">
                                        <span className="text-2xl font-black uppercase italic text-white">TOTAL</span>
                                        <div className="text-right">
                                            <p className="text-5xl font-black text-[#22c55e] tracking-tighter italic">S/ {ordenActiva?.inversion_total?.toFixed(2)}</p>
                                            <p className="text-[9px] text-slate-600 font-bold uppercase mt-2 italic">Sujeto a tipo de cambio</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-12 space-y-4">
                                    <button className="w-full bg-[#22c55e] text-[#0b0f1a] font-black py-6 uppercase italic text-sm tracking-widest flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_15px_40px_rgba(34,197,94,0.25)] rounded-2xl">
                                        <Receipt size={20} /> SUBIR COMPROBANTE
                                    </button>
                                    <div className="bg-amber-500/10 border border-amber-500/20 p-5 rounded-xl flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Calendar className="text-amber-500" size={20} />
                                            <span className="text-[10px] font-black text-white uppercase italic">Cierre en:</span>
                                        </div>
                                        <span className="text-amber-500 font-black italic text-sm uppercase">12 Días</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white/[0.02] rounded-[3rem] border border-dashed border-white/10">
                        <Package size={60} className="mx-auto text-slate-700 mb-6" />
                        <h2 className="text-2xl font-black uppercase text-slate-500 tracking-widest">Tu cesta está vacía</h2>
                        <Link href="/catalogo" className="mt-8 inline-block bg-[#22c55e] text-black font-black px-10 py-4 rounded-2xl uppercase italic text-sm transition-transform hover:scale-105">Ir al Catálogo</Link>
                    </div>
                )}
            </div>
        </div>
    );
}