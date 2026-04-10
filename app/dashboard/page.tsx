"use client";
import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Package, Plane, MoreHorizontal, ShieldCheck, Box, Clock } from 'lucide-react';

// --- CONEXIÓN A SUPABASE ---
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://scpmnmgdvfdbpuyeiawn.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'TU_ANON_KEY_AQUI';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function DashboardPage() {
    const [importaciones, setImportaciones] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const fetchDashboardData = async () => {
            setLoading(true);
            
            // 1. Obtener sesión del usuario
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user) {
                setUserName(session.user.user_metadata.full_name || 'Importador');
                
                // 2. Traer sus importaciones reales
                const { data, error } = await supabase
                    .from('importaciones')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (!error && data) setImportaciones(data);
            }
            setLoading(false);
        };

        fetchDashboardData();
    }, []);

    const enCaminoCount = importaciones.filter(imp => imp.estatus === 'EN TRÁNSITO').length;

    return (
        <div className="min-h-screen bg-[#070b12] text-white p-6 md:p-12 pt-36">
            <div className="max-w-7xl mx-auto">
                
                {/* CABECERA */}
                <div className="mb-10">
                    <h1 className="text-4xl font-black tracking-tight mb-2 uppercase italic">
                        Tus Importaciones
                    </h1>
                    <p className="text-slate-400 font-medium">
                        Bienvenido de nuevo, <span className="text-[#22c55e]">{userName}</span>. Aquí está el estado de tus paquetes.
                    </p>
                </div>

                {/* TABLA DE IMPORTACIONES */}
                <div className="bg-[#0f172a] border border-white/5 rounded-3xl overflow-hidden shadow-2xl mb-8">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-black/20 text-[10px] font-black uppercase tracking-widest text-slate-500 border-b border-white/5">
                                    <th className="px-6 py-5">Guía</th>
                                    <th className="px-6 py-5">Remitente</th>
                                    <th className="px-6 py-5">Destinatario</th>
                                    <th className="px-6 py-5">Categoría</th>
                                    <th className="px-6 py-5">Descripción</th>
                                    <th className="px-6 py-5">Estatus</th>
                                    <th className="px-6 py-5 text-center">Piezas</th>
                                    <th className="px-6 py-5">Seguro</th>
                                    <th className="px-6 py-5 text-center">Acción</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {loading ? (
                                    <tr><td colSpan={9} className="text-center py-20 text-slate-500 animate-pulse font-bold">CARGANDO TUS PAQUETES...</td></tr>
                                ) : importaciones.length === 0 ? (
                                    <tr><td colSpan={9} className="text-center py-20 text-slate-500 font-bold uppercase italic">No tienes importaciones registradas aún.</td></tr>
                                ) : (
                                    importaciones.map((item) => (
                                        <tr key={item.id} className="hover:bg-white/[0.02] transition-colors group">
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 bg-[#22c55e]/10 rounded-lg flex items-center justify-center text-[#22c55e] group-hover:scale-110 transition-transform">
                                                        <Box size={18} />
                                                    </div>
                                                    <span className="font-bold text-sm tracking-tight">{item.guia}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-sm font-semibold text-slate-300 uppercase">{item.remitente}</td>
                                            <td className="px-6 py-5 text-sm font-semibold text-slate-300">{item.destinatario}</td>
                                            <td className="px-6 py-5 text-sm font-medium text-slate-400">{item.categoria}</td>
                                            <td className="px-6 py-5 text-sm font-medium text-slate-400">{item.descripcion}</td>
                                            <td className="px-6 py-5">
                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase italic ${
                                                    item.estatus === 'ENTREGADO' 
                                                    ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                                                    : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                                }`}>
                                                    {item.estatus} {item.estatus !== 'ENTREGADO' && <Plane size={12} className="rotate-45" />}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5 text-center font-bold text-sm">{item.piezas}</td>
                                            <td className="px-6 py-5 text-[10px] font-black text-[#22c55e] uppercase italic">{item.seguro}</td>
                                            <td className="px-6 py-5 text-center text-slate-500">
                                                <button className="hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg">
                                                    <MoreHorizontal size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* TARJETA DE RESUMEN (LA AZUL) */}
                <div className="bg-blue-600 rounded-[2rem] p-8 flex flex-col md:flex-row items-center justify-between shadow-[0_20px_40px_rgba(37,99,235,0.2)] overflow-hidden relative group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-700"></div>
                    
                    <div className="flex items-center gap-6 relative z-10">
                        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-white backdrop-blur-md">
                            <Plane size={32} className="rotate-45" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black italic uppercase tracking-tighter">
                                MIS ENVÍOS <span className="opacity-60 ml-2">| En Camino ({enCaminoCount})</span>
                            </h2>
                            <p className="text-blue-100 font-medium">Tus paquetes están cruzando el continente para llegar a ti.</p>
                        </div>
                    </div>

                    <div className="mt-6 md:mt-0 flex items-center gap-3 bg-black/20 px-6 py-3 rounded-2xl backdrop-blur-md border border-white/10 relative z-10">
                        <Clock size={20} className="text-blue-200" />
                        <span className="font-black italic text-lg tracking-tight uppercase">3/7 días garantizados</span>
                    </div>
                </div>

            </div>
        </div>
    );
}

// No olvides registrar la BenefitCard si quieres usarla aquí también