"use client";
import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, Info, CheckCircle, Sparkles, Star } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// --- CONEXIÓN A SUPABASE ---
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Interfaz para TypeScript
interface Perfume {
    id: number;
    name: string;
    size: string;
    price: number;
    old_price: number | null;
    image: string;
    category: string;
}

export default function CatalogoPage() {
    const [perfumes, setPerfumes] = useState<Perfume[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    // --- EFECTO PARA TRAER DATOS DE SUPABASE ---
    useEffect(() => {
        async function fetchPerfumes() {
            const { data, error } = await supabase
                .from('perfumes') // Asegúrate de que tu tabla se llame exactamente así en Supabase
                .select('*');

            if (error) {
                console.error("Error al cargar el catálogo:", error);
            } else {
                setPerfumes(data || []);
            }
            setLoading(false);
        }
        
        fetchPerfumes();
    }, []);

    // Filtro buscador
    const filteredPerfumes = perfumes.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <main className="min-h-screen bg-[#070b12] pt-32 pb-20 relative overflow-hidden font-sans">
            
            {/* FONDO DE TEXTURA OSCURA (Pasto/Naturaleza Premium) */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
                <img 
                    src="https://images.unsplash.com/photo-1533460004989-cef01064af7e?q=80&w=2070&auto=format&fit=crop" 
                    className="w-full h-full object-cover scale-110"
                    alt="bg"
                />
            </div>
            
            {/* GRADIENTES DECORATIVOS */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#22c55e]/5 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#22c55e]/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-4">
                
                {/* ENCABEZADO ESTILO CASA LATTAFA */}
                <div className="text-center mb-16">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Sparkles size={16} className="text-[#22c55e]" />
                        <h2 className="text-[#22c55e] font-black tracking-[0.4em] uppercase text-xs italic">GOSU ÁRABE</h2>
                        <Sparkles size={16} className="text-[#22c55e]" />
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white italic uppercase tracking-tighter mb-4">
                        CASA <span className="text-transparent" style={{ WebkitTextStroke: '1px white' }}>LATTAFA</span>
                    </h1>
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-sm mb-10 italic">Catálogo Exclusivo Mayorista</p>
                    
                    {/* BARRA DE BÚSQUEDA */}
                    <div className="max-w-md mx-auto relative group">
                        <div className="absolute inset-0 bg-[#22c55e]/10 blur-xl opacity-50 group-focus-within:opacity-100 transition-opacity"></div>
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                        <input 
                            type="text" 
                            placeholder="BUSCAR FRAGANCIA..."
                            className="w-full bg-[#0b1118]/80 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white font-bold placeholder:text-slate-600 focus:border-[#22c55e] outline-none backdrop-blur-xl transition-all uppercase text-sm italic"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* ESTADO DE CARGA */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="w-12 h-12 border-4 border-[#22c55e]/30 border-t-[#22c55e] rounded-full animate-spin mb-4"></div>
                        <p className="text-[#22c55e] font-black uppercase tracking-widest text-sm italic">Cargando inventario...</p>
                    </div>
                ) : (
                    /* GRID DE PRODUCTOS DINÁMICO DESDE SUPABASE */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {filteredPerfumes.length > 0 ? (
                            filteredPerfumes.map((perfume) => (
                                <div key={perfume.id} className="group relative">
                                    <div className="bg-[#0b1118]/60 border border-white/5 rounded-[2.5rem] p-8 backdrop-blur-xl hover:border-[#22c55e]/50 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
                                        
                                        <div className="absolute top-6 right-6 z-20 bg-[#22c55e]/10 border border-[#22c55e]/30 px-3 py-1 rounded-full flex items-center gap-1">
                                            <CheckCircle size={10} className="text-[#22c55e]" />
                                            <span className="text-[9px] text-[#22c55e] font-black uppercase tracking-tighter">Original</span>
                                        </div>

                                        <div className="aspect-square mb-8 relative flex items-center justify-center">
                                            <div className="absolute w-3/4 h-3/4 bg-[#22c55e]/5 rounded-full blur-3xl group-hover:bg-[#22c55e]/10 transition-all"></div>
                                            <img 
                                                src={perfume.image} 
                                                alt={perfume.name}
                                                className="relative z-10 w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.7)] group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>

                                        <div className="text-center relative z-10">
                                            <h3 className="text-white font-black text-xl leading-tight mb-2 italic uppercase tracking-tighter">
                                                {perfume.name}
                                            </h3>
                                            <p className="text-slate-500 text-[10px] font-black tracking-[0.2em] mb-4 uppercase">
                                                EDP • {perfume.size} • IMPORTADO
                                            </p>
                                            
                                            <div className="flex flex-col items-center gap-1 mb-6">
                                                {/* Solo muestra el precio viejo si existe en Supabase */}
                                                {perfume.old_price && (
                                                    <span className="text-slate-600 text-xs font-bold line-through">
                                                        S/ {perfume.old_price.toFixed(2)}
                                                    </span>
                                                )}
                                                <span className="text-[#22c55e] text-4xl font-black italic tracking-tighter">
                                                    S/ {perfume.price.toFixed(2)}
                                                </span>
                                            </div>

                                            <button 
                                                onClick={() => window.open(`https://wa.me/51907024684?text=Hola GOSU, me interesa el perfume mayorista: ${perfume.name}`)}
                                                className="w-full bg-[#22c55e] text-[#0b1118] py-4 rounded-2xl font-black uppercase italic hover:bg-[#1ea950] transition-all flex items-center justify-center gap-3 active:scale-95 shadow-[0_10px_20px_rgba(34,197,94,0.2)]"
                                            >
                                                <ShoppingCart size={18} /> Pedir Mayorista
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-20 text-slate-500 font-medium">
                                No se encontraron perfumes en el inventario.
                            </div>
                        )}
                    </div>
                )}

                {/* SECCIÓN MÍNIMO DE COMPRA */}
                <div className="mt-24 max-w-4xl mx-auto">
                    <div className="bg-gradient-to-r from-[#22c55e]/10 to-transparent border border-[#22c55e]/20 rounded-[2.5rem] p-10 backdrop-blur-md relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Star size={120} className="text-[#22c55e]" strokeWidth={1} />
                        </div>
                        
                        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                            <div className="w-20 h-20 bg-[#22c55e] rounded-3xl flex items-center justify-center text-[#0b1118] shrink-0 shadow-[0_0_30px_rgba(34,197,94,0.4)]">
                                <Info size={40} />
                            </div>
                            <div className="text-center md:text-left">
                                <h4 className="text-white font-black text-2xl uppercase italic mb-2 tracking-tighter">Condiciones Mayoristas</h4>
                                <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-xl italic">
                                    Precios exclusivos para revendedores a partir de 6 unidades. Consultar precios especiales por cajón cerrado (12 unidades). Stock garantizado y envío inmediato a todo el Perú.
                                </p>
                            </div>
                            <button 
                                onClick={() => window.open(`https://wa.me/51907024684?text=Hola GOSU, quiero información sobre las compras por cajón.`)}
                                className="px-8 py-4 bg-white text-black font-black uppercase italic rounded-2xl hover:bg-[#22c55e] hover:text-white transition-all whitespace-nowrap shadow-xl"
                            >
                                Consultar Cajón
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-20 text-center text-slate-600 text-[10px] font-bold uppercase tracking-[0.3em]">
                    GOSU IMPORT © 2026 • PERFUMES MAYORISTAS
                </div>
            </div>
        </main>
    );
}