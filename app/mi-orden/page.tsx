"use client";
import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
    Package, Truck, MapPin, MessageCircle, Clock, 
    ChevronLeft, Loader2, CheckCircle2, ArrowRight, Trash2, ShoppingBag
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

const GosuAlert = Swal.mixin({
    background: '#161b22', color: '#ffffff', confirmButtonColor: '#fbbf24', cancelButtonColor: '#ef4444',
    customClass: { popup: 'rounded-[2rem] border border-white/10 shadow-2xl', title: 'font-black italic uppercase tracking-tighter' }
});

export default function MiOrdenPage() {
    const router = useRouter();
    const [orden, setOrden] = useState<any>(null);
    const [detalles, setDetalles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchDatos = async () => {
        setLoading(true);
        const { data: { session } } = await supabase.auth.getSession();

        if (session?.user) {
            // Buscamos la orden más reciente
            const { data: ordenes } = await supabase
                .from('ordenes_perfumes')
                .select('*')
                .eq('user_id', session.user.id)
                .order('created_at', { ascending: false })
                .limit(1);

            if (ordenes && ordenes.length > 0) {
                setOrden(ordenes[0]);
                const { data: det } = await supabase
                    .from('detalle_orden_perfumes')
                    .select('*, perfumes(*)')
                    .eq('orden_id', ordenes[0].id);
                if (det) setDetalles(det);
            } else {
                setOrden(null);
                setDetalles([]);
            }
        }
        setLoading(false);
    };

    useEffect(() => { fetchDatos(); }, []);

    // --- CÁLCULO DINÁMICO DEL SUBTOTAL ---
    // Sumamos (precio del perfume * cantidad) de todos los items en la lista
    const subtotalCalculado = detalles.reduce((acc, item) => {
        const precio = item.perfumes?.price || 108; // 108 como backup si no hay precio
        return acc + (precio * item.cantidad);
    }, 0);

    const eliminarItem = async (detalleId: string) => {
        const result = await GosuAlert.fire({
            title: '¿QUITAR DEL PEDIDO?', text: "Se eliminará esta fragancia de tu lista.", icon: 'warning',
            showCancelButton: true, confirmButtonText: 'SÍ, ELIMINAR', cancelButtonText: 'CANCELAR'
        });

        if (result.isConfirmed) {
            const { error } = await supabase.from('detalle_orden_perfumes').delete().eq('id', detalleId);
            if (!error) {
                if (detalles.length === 1) {
                    await supabase.from('ordenes_perfumes').delete().eq('id', orden.id);
                    setOrden(null);
                }
                fetchDatos();
            }
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-[#0b0f1a] flex items-center justify-center">
            <Loader2 className="animate-spin text-amber-400" size={48} />
        </div>
    );

    if (!orden || detalles.length === 0) return (
        <div className="min-h-screen bg-[#0b0f1a] flex flex-col items-center justify-center p-6 text-center pt-20">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10">
                <ShoppingBag size={40} className="text-slate-700" />
            </div>
            <h1 className="text-3xl font-black uppercase tracking-tighter italic text-white">Tu orden está vacía</h1>
            <p className="text-slate-500 mt-2 mb-8 max-w-xs">Explora nuestro catálogo y selecciona las mejores fragancias para importar.</p>
            <Link href="/catalogo" className="bg-amber-400 text-black font-black px-10 py-4 rounded-xl uppercase italic text-sm hover:scale-105 transition-transform shadow-[0_10px_30px_rgba(251,191,36,0.2)]">
                Ver Catálogo
            </Link>
        </div>
    );

    const esCarrito = !orden.finalizada; 
    const idCorto = orden.id.substring(0, 6).toUpperCase();

    return (
        <div className="min-h-screen bg-[#0b0f1a] text-white font-sans pt-32 pb-20 selection:bg-amber-400/30">
            <div className="max-w-6xl mx-auto px-6">
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <div>
                        <span className="text-amber-400 font-bold uppercase text-[10px] tracking-[0.3em] block mb-2">
                            {esCarrito ? 'Paso 1: Revisa tu selección' : 'Seguimiento de Inversión'}
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic leading-none">
                            {esCarrito ? 'MI CARRITO' : `ORDEN #${idCorto}`}
                        </h1>
                    </div>

                    {!esCarrito && (
                        <div className="flex items-center gap-4 bg-[#161b22] border border-white/10 px-6 py-4 rounded-2xl shadow-xl">
                            <div className="text-right">
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none mb-1">Estado</p>
                                <p className={`font-black uppercase italic text-[11px] ${orden.estado_pago === 'Confirmado' ? 'text-green-500' : 'text-amber-400'}`}>
                                    {orden.estado_pago || 'Pendiente WhatsApp'}
                                </p>
                            </div>
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${orden.estado_pago === 'Confirmado' ? 'bg-green-500/20 text-green-500' : 'bg-amber-400/20 text-amber-400'}`}>
                                {orden.estado_pago === 'Confirmado' ? <CheckCircle2 size={28} /> : <Clock size={28} />}
                            </div>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    
                    <div className="lg:col-span-7 space-y-6">
                        <div className="bg-[#161b22]/50 border border-white/5 rounded-[2rem] overflow-hidden">
                            <div className="p-8 border-b border-white/5 bg-white/[0.02] flex justify-between items-center">
                                <h2 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                                    <Package size={18} className="text-amber-400" /> Detalle de Fragancias
                                </h2>
                                <span className="text-[10px] bg-white/10 px-3 py-1 rounded-full font-bold text-slate-400">
                                    {detalles.length} Items
                                </span>
                            </div>

                            <div className="divide-y divide-white/5">
                                {detalles.map((p) => (
                                    <div key={p.id} className="p-8 flex items-center gap-6 group hover:bg-white/[0.01] transition-all">
                                        <div className="w-24 h-24 bg-[#0b0f1a] border border-white/10 rounded-2xl flex items-center justify-center shrink-0 overflow-hidden shadow-inner">
                                            {p.perfumes?.image ? (
                                                <img src={p.perfumes.image} alt={p.nombre_perfume} className="w-full h-full object-cover" />
                                            ) : (
                                                <Package className="text-slate-800" size={32} />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-lg font-black uppercase tracking-tighter italic text-white leading-tight">{p.perfumes?.name || p.nombre_perfume}</p>
                                            <p className="text-[10px] font-bold text-amber-400/60 uppercase tracking-widest mt-1">{p.perfumes?.brand}</p>
                                            <div className="flex items-center gap-4 mt-4">
                                                <span className="text-xs font-black text-slate-400 bg-white/5 px-3 py-1 rounded-lg border border-white/5">CANT: {p.cantidad}</span>
                                                <span className="text-xs font-black text-white italic">S/ {((p.perfumes?.price || 108) * p.cantidad).toFixed(2)}</span>
                                            </div>
                                        </div>
                                        {esCarrito && (
                                            <button onClick={() => eliminarItem(p.id)} className="p-3 text-slate-600 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all">
                                                <Trash2 size={20} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {!esCarrito && (
                            <div className="bg-[#161b22]/50 border border-white/5 rounded-[2rem] p-8 grid grid-cols-1 md:grid-cols-2 gap-8 shadow-xl">
                                <div>
                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                                        <MapPin size={12} /> Ubicación de Entrega
                                    </p>
                                    <p className="font-bold text-white text-sm uppercase">
                                        {orden.tipo_envio === 'motorizado' ? `${orden.distrito}, Lima Metropolitana` : `Agencia Shalom: ${orden.sucursal_shalom}`}
                                    </p>
                                    <p className="text-slate-400 text-xs mt-1 italic">{orden.direccion || 'Recojo en Agencia'}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                                        <Truck size={12} /> Método de Envío
                                    </p>
                                    <p className="font-bold text-white text-sm uppercase italic">
                                        {orden.tipo_envio === 'motorizado' ? 'Motorizado Express' : 'Shalom Provincia'}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="lg:col-span-5">
                        <div className="bg-[#1c1f26] rounded-[2.5rem] p-10 border border-white/5 sticky top-32 shadow-2xl">
                            <h3 className="text-2xl font-black uppercase tracking-tighter italic mb-8 border-b border-white/5 pb-6 text-slate-200">Resumen Económico</h3>
                            
                            <div className="space-y-6 mb-10">
                                <div className="flex justify-between items-center text-slate-400 italic">
                                    <span className="text-[11px] font-black uppercase tracking-widest">Subtotal Inversión</span>
                                    <span className="font-black text-white text-lg tracking-tight">S/ {subtotalCalculado.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center text-slate-400 italic">
                                    <span className="text-[11px] font-black uppercase tracking-widest">Gasto de Envío</span>
                                    <span className="font-black text-amber-400 uppercase text-xs">
                                        {esCarrito ? 'Cálculo en checkout' : (orden.tipo_envio === 'motorizado' ? `S/ ${orden.costo_envio?.toFixed(2)}` : 'PAGO DESTINO')}
                                    </span>
                                </div>
                                <div className="pt-8 border-t border-white/10 flex justify-between items-end">
                                    <span className="text-2xl font-black uppercase tracking-tighter italic leading-none text-slate-200">TOTAL</span>
                                    <div className="text-right">
                                        <p className="text-5xl font-black text-amber-400 tracking-tighter leading-none italic">
                                            S/ {(esCarrito ? subtotalCalculado : orden.inversion_total).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {esCarrito ? (
                                <button 
                                    onClick={() => router.push('/checkout')}
                                    className="w-full bg-white text-black font-black py-5 uppercase tracking-tighter flex items-center justify-center gap-3 hover:bg-amber-400 transition-all rounded-2xl text-lg shadow-xl"
                                >
                                    PROCEDER AL PAGO <ArrowRight size={22} />
                                </button>
                            ) : (
                                <button 
                                    onClick={() => window.open(`https://wa.me/51926383191?text=Hola Robert, seguimiento de mi pedido #${idCorto}`, '_blank')}
                                    className="w-full bg-[#25d366]/10 text-[#25d366] border border-[#25d366]/20 font-black py-5 uppercase tracking-tighter flex items-center justify-center gap-3 hover:bg-[#25d366] hover:text-black transition-all rounded-2xl text-sm italic shadow-lg"
                                >
                                    <MessageCircle size={20} /> WHATSAPP SOPORTE
                                </button>
                            )}

                            <div className="mt-8 flex justify-center items-center gap-4 opacity-30 grayscale">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                                <div className="w-px h-4 bg-white/20" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-white">Gosu Secure</span>
                            </div>
                        </div>

                        <div className="mt-8 text-center">
                            <Link href="/catalogo" className="inline-flex items-center gap-2 text-[10px] font-black text-slate-500 hover:text-white uppercase tracking-[0.2em] transition-colors italic">
                                <ChevronLeft size={14} /> Continuar Inversión
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}