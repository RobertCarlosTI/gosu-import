"use client";
import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  ShoppingCart, Plus, Minus, Crown, AlertCircle, 
  Lock, Smartphone, Droplets, Clock, Ship 
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://scpmnmgdvfdbpuyeiawn.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'TU_ANON_KEY_AQUI';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const MARCAS_PERFUMES = ['Todos', 'Lattafa', 'Armaf', 'Maison Alhambra', 'Afnan', 'Rasasi'];

export default function CatalogoPage() {
    const router = useRouter();
    const [perfumes, setPerfumes] = useState<any[]>([]);
    const [iphones, setIphones] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [categoriaActiva, setCategoriaActiva] = useState<string>('Perfumería');
    const [marcaSeleccionada, setMarcaSeleccionada] = useState<string>('Todos');
    const [userRole, setUserRole] = useState<'normal' | 'vip'>('normal');
    const [carrito, setCarrito] = useState<{ [id: string]: number }>({});
    const [config, setConfig] = useState<any>(null);
    const [timeLeft, setTimeLeft] = useState({ dias: 0, horas: 0, min: 0, seg: 0 });

    useEffect(() => {
        const fetchDatos = async () => {
            setLoading(true);
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                const { data: profile } = await supabase.from('profiles').select('role').eq('id', session.user.id).single();
                if (profile) setUserRole(profile.role);
            }

            const [resPerfumes, resIphones, resConfig] = await Promise.all([
                supabase.from('perfumes').select('*'),
                supabase.from('iphones').select('*'),
                supabase.from('import_config').select('*').single()
            ]);
            if (resPerfumes.data) setPerfumes(resPerfumes.data);
            if (resIphones.data) setIphones(resIphones.data);
            if (resConfig.data) setConfig(resConfig.data);
            setLoading(false);
        };
        fetchDatos();
    }, []);

    useEffect(() => {
        if (!config?.fecha_cierre) return;
        const timer = setInterval(() => {
            const ahora = new Date().getTime();
            const cierre = new Date(config.fecha_cierre).getTime();
            const dif = cierre - ahora;
            if (dif <= 0) {
                clearInterval(timer);
                setTimeLeft({ dias: 0, horas: 0, min: 0, seg: 0 });
            } else {
                setTimeLeft({
                    dias: Math.floor(dif / (1000 * 60 * 60 * 24)),
                    horas: Math.floor((dif % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    min: Math.floor((dif % (1000 * 60 * 60)) / (1000 * 60)),
                    seg: Math.floor((dif % (1000 * 60)) / 1000)
                });
            }
        }, 1000);
        return () => clearInterval(timer);
    }, [config]);

    const importacionCerrada = new Date().getTime() > new Date(config?.fecha_cierre).getTime();

    const handleAdd = (id: string) => {
        if (importacionCerrada) return alert("La importación ya cerró.");
        setCarrito(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    };

    const handleRemove = (id: string) => {
        setCarrito(prev => {
            const actual = prev[id] || 0;
            if (actual - 1 <= 0) { const newC = { ...prev }; delete newC[id]; return newC; }
            return { ...prev, [id]: actual - 1 };
        });
    };

    const todosLosProductos = [...perfumes, ...iphones];
    const totalPrecio = todosLosProductos.reduce((acc, prod) => acc + ((prod.price || 0) * (carrito[prod.id] || 0)), 0);
    const totalItems = Object.values(carrito).reduce((acc, val) => acc + val, 0);
    const totalPerfumes = perfumes.reduce((acc, p) => acc + (carrito[p.id] || 0), 0);
    const minPerfumes = userRole === 'vip' ? 1 : 6;
    const canCheckout = totalPerfumes === 0 || totalPerfumes >= minPerfumes;

    const finalizarPedido = async () => {
        setSubmitting(true);
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) { alert("Inicia sesión para continuar"); return; }

        try {
            const { data: orden, error: errO } = await supabase.from('ordenes_perfumes').insert({
                user_id: session.user.id,
                total_unidades: totalPerfumes,
                inversion_total: totalPrecio,
                estado_pago: 'Pendiente de Comprobante'
            }).select().single();

            if (errO) throw errO;

            const detalles = perfumes.filter(p => carrito[p.id] > 0).map(p => ({
                orden_id: orden.id,
                nombre_perfume: p.name,
                cantidad: carrito[p.id]
            }));

            const { error: errD } = await supabase.from('detalle_orden_perfumes').insert(detalles);
            if (errD) throw errD;

            router.push('/dashboard');
        } catch (e: any) { alert(e.message); }
        finally { setSubmitting(false); }
    };

    const productosAMostrar = categoriaActiva === 'Perfumería' 
        ? perfumes.filter(p => marcaSeleccionada === 'Todos' || p.name?.toLowerCase().includes(marcaSeleccionada.toLowerCase()) || p.brand?.toLowerCase() === marcaSeleccionada.toLowerCase())
        : iphones;

    return (
        <div className="min-h-screen bg-[#070b12] text-white pt-28 pb-32">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                {/* BANNER IMPORTACIÓN (Se mantiene igual) */}
                <div className={`mb-10 p-8 rounded-3xl border transition-all ${importacionCerrada ? 'border-red-500/30 bg-red-500/5' : 'border-[#22c55e]/30 bg-gradient-to-r from-[#22c55e]/10 to-transparent'}`}>
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Ship className={importacionCerrada ? "text-red-500" : "text-[#22c55e]"} size={20} />
                                <span className={`text-[10px] font-black uppercase tracking-widest ${importacionCerrada ? 'text-red-500' : 'text-[#22c55e]'}`}>
                                    {importacionCerrada ? 'Importación Cerrada' : 'Importación Grupal Abierta'}
                                </span>
                            </div>
                            <h2 className="text-3xl font-black italic uppercase tracking-tighter">Fase: {config?.estado_importacion || 'Cargando...'}</h2>
                        </div>
                        {!importacionCerrada && (
                            <div className="flex gap-3">
                                {[{ l: 'Días', v: timeLeft.dias }, { l: 'Hrs', v: timeLeft.horas }, { l: 'Min', v: timeLeft.min }, { l: 'Seg', v: timeLeft.seg }].map(t => (
                                    <div key={t.l} className="flex flex-col items-center">
                                        <div className="bg-[#070b12] border border-white/10 w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black italic text-[#22c55e]">{t.v}</div>
                                        <p className="text-[9px] font-bold uppercase mt-2 text-slate-500">{t.l}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* FILTROS Y GRILLA (Se mantiene tu diseño original) */}
                <div className="flex items-center gap-4 mb-6">
                    <button onClick={() => setCategoriaActiva('Perfumería')} className={`px-8 py-4 rounded-2xl font-black italic text-sm flex items-center gap-2 transition-all ${categoriaActiva === 'Perfumería' ? 'bg-[#22c55e] text-[#070b12]' : 'bg-white/5 text-slate-400'}`}>
                        <Droplets size={20} /> PERFUMERÍA
                    </button>
                    <button onClick={() => setCategoriaActiva('iPhone')} className={`px-8 py-4 rounded-2xl font-black italic text-sm flex items-center gap-2 transition-all ${categoriaActiva === 'iPhone' ? 'bg-[#22c55e] text-[#070b12]' : 'bg-white/5 text-slate-400'}`}>
                        <Smartphone size={20} /> IPHONE
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {productosAMostrar.map((prod) => {
                        const qty = carrito[prod.id] || 0;
                        return (
                            <div key={prod.id} className={`bg-[#0f172a] border rounded-3xl overflow-hidden transition-all ${qty > 0 ? 'border-[#22c55e]' : 'border-white/5'}`}>
                                <div className="h-52 p-6 flex items-center justify-center bg-white/5">
                                    <img src={prod.image} alt={prod.name} className="h-full object-contain drop-shadow-2xl" />
                                </div>
                                <div className="p-5">
                                    <p className="text-[10px] font-black uppercase text-[#22c55e] mb-1">{prod.brand}</p>
                                    <h3 className="font-bold text-sm leading-tight mb-4 h-10 line-clamp-2">{prod.name}</h3>
                                    <p className="text-2xl font-black italic mb-5">S/ {prod.price?.toFixed(2)}</p>
                                    <div className={qty > 0 ? "flex items-center justify-between bg-[#22c55e] text-[#070b12] rounded-xl p-1" : ""}>
                                        {qty > 0 ? (
                                            <>
                                                <button onClick={() => handleRemove(prod.id)} className="w-8 h-8 flex items-center justify-center"><Minus size={16}/></button>
                                                <span className="font-black">{qty}</span>
                                                <button onClick={() => handleAdd(prod.id)} className="w-8 h-8 flex items-center justify-center"><Plus size={16}/></button>
                                            </>
                                        ) : (
                                            <button onClick={() => handleAdd(prod.id)} className="w-full bg-white/5 hover:bg-white hover:text-black py-3 rounded-xl font-bold text-xs transition-all">AGREGAR AL PEDIDO</button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* BARRA DE TOTAL Y BOTÓN "UNIRSE" */}
            {totalItems > 0 && (
                <div className="fixed bottom-0 left-0 w-full bg-[#070b12]/90 backdrop-blur-xl border-t border-white/10 p-6 z-[120]">
                    <div className="max-w-7xl mx-auto flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="bg-[#22c55e] text-[#070b12] w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl">{totalItems}</div>
                            <p className="text-2xl font-black italic">S/ {totalPrecio.toFixed(2)}</p>
                        </div>
                        {canCheckout ? (
                            <button 
                                onClick={finalizarPedido}
                                disabled={submitting}
                                className="bg-[#22c55e] text-[#070b12] px-10 py-4 rounded-2xl font-black uppercase text-sm italic tracking-widest shadow-lg active:scale-95 disabled:opacity-50"
                            >
                                {submitting ? 'CREANDO ORDEN...' : 'UNIRSE AL CONSOLIDADO'}
                            </button>
                        ) : (
                            <p className="text-amber-500 text-xs font-black uppercase italic">Faltan {minPerfumes - totalPerfumes} para el mínimo</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}