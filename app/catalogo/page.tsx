"use client";
import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { ShoppingCart, Plus, Minus, Crown, AlertCircle, Lock, Smartphone, Droplets, Check } from 'lucide-react';
import Link from 'next/link';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://scpmnmgdvfdbpuyeiawn.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'TU_ANON_KEY_AQUI';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Lista de tus marcas principales para el filtro
const MARCAS_PERFUMES = ['Todos', 'Lattafa', 'Armaf', 'Maison Alhambra', 'Afnan', 'Rasasi'];

export default function CatalogoPage() {
    const [perfumes, setPerfumes] = useState<any[]>([]);
    const [iphones, setIphones] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    
    const [categoriaActiva, setCategoriaActiva] = useState<string>('Perfumería');
    const [marcaSeleccionada, setMarcaSeleccionada] = useState<string>('Todos');
    
    const [userRole, setUserRole] = useState<'normal' | 'vip'>('normal');
    const [carrito, setCarrito] = useState<{ [id: string]: number }>({});

    useEffect(() => {
        const fetchDatos = async () => {
            setLoading(true);
            const [resPerfumes, resIphones] = await Promise.all([
                supabase.from('perfumes').select('*'),
                supabase.from('iphones').select('*')
            ]);
            if (resPerfumes.data) setPerfumes(resPerfumes.data);
            if (resIphones.data) setIphones(resIphones.data);
            setLoading(false);
        };
        fetchDatos();
    }, []);

    const handleAdd = (id: string) => setCarrito(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
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

    // --- LÓGICA DE FILTRADO POR MARCA (INTELIGENTE) ---
    const productosAMostrar = categoriaActiva === 'Perfumería' 
        ? perfumes.filter(p => {
            if (marcaSeleccionada === 'Todos') return true;
            
            const nombre = p.name?.toLowerCase() || '';
            const marcaBD = p.brand?.toLowerCase() || '';
            const marcaBusqueda = marcaSeleccionada.toLowerCase();

            // DICCIONARIO INTELIGENTE: Si el usuario busca "Lattafa", también busca sus líneas famosas
            if (marcaBusqueda === 'lattafa') {
                return nombre.includes('lattafa') || 
                       nombre.includes('asad') || 
                       nombre.includes('yara') || 
                       nombre.includes('khamrah') || 
                       nombre.includes('badee al oud') ||
                       marcaBD === 'lattafa';
            }

            // Para el resto de marcas, busca normal
            return nombre.includes(marcaBusqueda) || marcaBD === marcaBusqueda;
          })
        : iphones;

    return (
        <div className="min-h-screen bg-[#070b12] text-white pt-28 pb-32">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                
                {/* CABECERA */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b border-white/10 pb-8">
                    <div>
                        <h1 className="text-4xl font-black italic tracking-tighter uppercase mb-2">Catálogo Gosu</h1>
                        <p className="text-slate-400">Selecciona tu categoría y marca favorita.</p>
                    </div>
                    <div className="bg-blue-500/10 border border-blue-500/30 px-6 py-4 rounded-2xl flex items-center gap-4">
                        <AlertCircle className="text-blue-400" size={20} />
                        <div>
                            <p className="text-blue-400 font-black italic uppercase text-sm">Mínimo Mayorista</p>
                            <p className="text-slate-400 text-xs">6 perfumes para procesar pedido.</p>
                        </div>
                    </div>
                </div>

                {/* BOTONES PRINCIPALES */}
                <div className="flex items-center gap-4 mb-6">
                    <button onClick={() => {setCategoriaActiva('Perfumería'); setMarcaSeleccionada('Todos');}} className={`px-8 py-4 rounded-2xl font-black italic text-sm flex items-center gap-2 transition-all ${categoriaActiva === 'Perfumería' ? 'bg-[#22c55e] text-[#070b12]' : 'bg-white/5 text-slate-400'}`}>
                        <Droplets size={20} /> PERFUMERÍA
                    </button>
                    <button onClick={() => setCategoriaActiva('iPhone')} className={`px-8 py-4 rounded-2xl font-black italic text-sm flex items-center gap-2 transition-all ${categoriaActiva === 'iPhone' ? 'bg-[#22c55e] text-[#070b12]' : 'bg-white/5 text-slate-400'}`}>
                        <Smartphone size={20} /> IPHONE
                    </button>
                </div>

                {/* SUB-FILTRO DE MARCAS */}
                {categoriaActiva === 'Perfumería' && (
                    <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-4 scrollbar-hide">
                        {MARCAS_PERFUMES.map(marca => (
                            <button
                                key={marca}
                                onClick={() => setMarcaSeleccionada(marca)}
                                className={`px-5 py-2 rounded-full text-xs font-bold transition-all border shrink-0 ${marcaSeleccionada === marca ? 'bg-white text-black border-white' : 'bg-transparent text-slate-500 border-white/10 hover:border-white/40'}`}
                            >
                                {marca}
                            </button>
                        ))}
                    </div>
                )}

                {/* GRILLA DE PRODUCTOS */}
                {loading ? (
                    <div className="text-center py-20 font-bold animate-pulse">Cargando...</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {productosAMostrar.map((prod) => {
                            const qty = carrito[prod.id] || 0;
                            return (
                                <div key={prod.id} className={`bg-[#0f172a] border rounded-3xl overflow-hidden flex flex-col transition-all ${qty > 0 ? 'border-[#22c55e]' : 'border-white/5'}`}>
                                    <div className="h-52 p-6 flex items-center justify-center bg-gradient-to-b from-white/5 to-transparent">
                                        <img src={prod.image} alt={prod.name} className="h-full object-contain drop-shadow-2xl" />
                                    </div>
                                    <div className="p-5 flex-1 flex flex-col">
                                        <p className="text-[10px] font-black uppercase text-[#22c55e] mb-1">{prod.brand || categoriaActiva}</p>
                                        <h3 className="font-bold text-sm leading-tight mb-4 flex-1">{prod.name}</h3>
                                        {/* CAMBIO AQUÍ: S/ en lugar de $ */}
                                        <p className="text-2xl font-black italic mb-5">S/ {prod.price?.toFixed(2)}</p>
                                        
                                        {qty > 0 ? (
                                            <div className="flex items-center justify-between bg-[#22c55e] text-[#070b12] rounded-xl p-1">
                                                <button onClick={() => handleRemove(prod.id)} className="w-8 h-8 flex items-center justify-center"><Minus size={16} /></button>
                                                <span className="font-black">{qty}</span>
                                                <button onClick={() => handleAdd(prod.id)} className="w-8 h-8 flex items-center justify-center"><Plus size={16} /></button>
                                            </div>
                                        ) : (
                                            <button onClick={() => handleAdd(prod.id)} className="w-full bg-white/5 hover:bg-white hover:text-black py-3 rounded-xl font-bold text-xs transition-all">
                                                AGREGAR AL PEDIDO
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* BARRA DE TOTAL (Carrito) */}
            {totalItems > 0 && (
                <div className="fixed bottom-0 left-0 w-full bg-[#070b12]/90 backdrop-blur-xl border-t border-white/10 p-6 z-50">
                    <div className="max-w-7xl mx-auto flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="bg-[#22c55e] text-[#070b12] w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl">{totalItems}</div>
                            {/* CAMBIO AQUÍ: S/ en lugar de $ */}
                            <p className="text-2xl font-black italic">S/ {totalPrecio.toFixed(2)}</p>
                        </div>
                        {canCheckout ? (
                            <button className="bg-[#22c55e] text-[#070b12] px-10 py-4 rounded-2xl font-black uppercase text-sm">Confirmar Pedido</button>
                        ) : (
                            <p className="text-slate-500 text-xs font-bold uppercase italic">Faltan {minPerfumes - totalPerfumes} perfumes</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}