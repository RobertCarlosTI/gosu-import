"use client";
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  PlusCircle, Package, Smartphone, Save, Image as ImageIcon, 
  CheckCircle2, AlertCircle, Loader2, Trash2, Edit3, Box, X, Clock,
  Ship, ChevronLeft, CalendarDays, UserPlus, Crown
} from 'lucide-react';

// --- CONEXIÓN A SUPABASE ---
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://scpmnmgdvfdbpuyeiawn.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'TU_ANON_KEY_AQUI';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function AdminPage() {
    // Estados de Navegación y Carga
    const [view, setView] = useState<'registrar' | 'inventario' | 'config' | 'clientes'>('registrar');
    const [tab, setTab] = useState<'perfume' | 'iphone'>('perfume');
    const [loading, setLoading] = useState(false);
    const [verificando, setVerificando] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    
    // Estados de Datos
    const [productos, setProductos] = useState<any[]>([]);
    const [usuarios, setUsuarios] = useState<any[]>([]);
    const [importConfig, setImportConfig] = useState({ fechaInicio: '', fechaCierre: '', estado: '' });

    // Estados para Edición de Productos
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<any>(null);

    // Estado del Formulario de Registro
    const [formData, setFormData] = useState({
        name: '', brand: '', price: '', old_price: '', size: '', image: '', color: '', stock: '10', featured: false
    });

    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user?.email === 'gosu.import01@gmail.com') {
                setIsAdmin(true);
            }
            setVerificando(false);
        };
        checkUser();
        fetchInventario();
        fetchImportConfig();
        fetchUsuarios();
    }, []);

    // --- FUNCIONES DE DATOS ---
    const fetchInventario = async () => {
        const [p, i] = await Promise.all([
            supabase.from('perfumes').select('*').order('created_at', { ascending: false }),
            supabase.from('iphones').select('*').order('created_at', { ascending: false })
        ]);
        const perfumesConTabla = (p.data || []).map(prod => ({ ...prod, tablaOriginal: 'perfumes' }));
        const iphonesConTabla = (i.data || []).map(prod => ({ ...prod, tablaOriginal: 'iphones' }));
        setProductos([...perfumesConTabla, ...iphonesConTabla]);
    };

    const fetchImportConfig = async () => {
        const { data } = await supabase.from('import_config').select('*').single();
        if (data) {
            setImportConfig({ 
                fechaInicio: data.fecha_inicio ? data.fecha_inicio.split('.')[0] : '', 
                fechaCierre: data.fecha_cierre ? data.fecha_cierre.split('.')[0] : '', 
                estado: data.estado_importacion 
            });
        }
    };

    const fetchUsuarios = async () => {
        const { data } = await supabase.from('profiles').select('*').order('email');
        if (data) setUsuarios(data);
    };

    // --- ACCIONES ---
    const cambiarRol = async (userId: string, nuevoRol: string) => {
        setLoading(true);
        const { error } = await supabase.from('profiles').update({ role: nuevoRol }).eq('id', userId);
        if (!error) fetchUsuarios();
        setLoading(false);
    };

    const guardarConfigImportacion = async () => {
        setLoading(true);
        const { error } = await supabase.from('import_config').update({ 
            fecha_inicio: importConfig.fechaInicio || null,
            fecha_cierre: importConfig.fechaCierre || null, 
            estado_importacion: importConfig.estado 
        }).eq('id', 1);
        if (!error) alert("¡Cronograma actualizado!");
        setLoading(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const tabla = tab === 'perfume' ? 'perfumes' : 'iphones';
        const payload = { ...formData, price: parseFloat(formData.price), stock: parseInt(formData.stock) };
        const { error } = await supabase.from(tabla).insert([payload]);
        if (!error) {
            alert("¡Producto registrado!");
            setFormData({ name: '', brand: '', price: '', old_price: '', size: '', image: '', color: '', stock: '10', featured: false });
            fetchInventario();
        }
        setLoading(false);
    };

    const abrirEditor = (producto: any) => { setEditingProduct(producto); setIsEditModalOpen(true); };

    const guardarEdicion = async () => {
        setLoading(true);
        const { error } = await supabase.from(editingProduct.tablaOriginal).update({
            name: editingProduct.name, price: parseFloat(editingProduct.price),
            stock: parseInt(editingProduct.stock), color: editingProduct.color,
            brand: editingProduct.brand, featured: editingProduct.featured
        }).eq('id', editingProduct.id);
        if (!error) { setIsEditModalOpen(false); fetchInventario(); }
        setLoading(false);
    };

    const eliminarProducto = async (id: string, tabla: string) => {
        if(confirm("¿Seguro que quieres eliminar este producto?")) {
            await supabase.from(tabla).delete().eq('id', id);
            fetchInventario();
        }
    };

    const calcularDias = () => {
        if (!importConfig.fechaCierre) return '0';
        const ahora = new Date().getTime();
        const cierre = new Date(importConfig.fechaCierre).getTime();
        if (ahora > cierre) return 'Cerrado';
        return `${Math.max(0, Math.ceil((cierre - ahora) / (1000 * 60 * 60 * 24)))} Días`;
    };

    if (verificando) return <div className="min-h-screen bg-[#070b12] flex items-center justify-center text-[#22c55e] font-black italic">Verificando...</div>;
    if (!isAdmin) return <div className="min-h-screen bg-[#070b12] text-white flex items-center justify-center">Acceso Denegado</div>;

    return (
        <div className="min-h-screen bg-[#070b12] text-white pt-28 pb-20 px-4">
            <div className="max-w-6xl mx-auto">
                
                {/* Menú de Navegación del Admin */}
                <div className="flex flex-wrap gap-4 mb-10">
                    <button onClick={() => setView('registrar')} className={`px-6 py-3 rounded-2xl font-black italic flex items-center gap-2 transition-all ${view === 'registrar' ? 'bg-[#22c55e] text-[#070b12]' : 'bg-white/5 text-slate-400'}`}>
                        <PlusCircle size={18} /> REGISTRAR
                    </button>
                    <button onClick={() => setView('inventario')} className={`px-6 py-3 rounded-2xl font-black italic flex items-center gap-2 transition-all ${view === 'inventario' ? 'bg-[#22c55e] text-[#070b12]' : 'bg-white/5 text-slate-400'}`}>
                        <Box size={18} /> INVENTARIO
                    </button>
                    <button onClick={() => setView('config')} className={`px-6 py-3 rounded-2xl font-black italic flex items-center gap-2 transition-all ${view === 'config' ? 'bg-amber-500 text-[#070b12]' : 'bg-white/5 text-slate-400'}`}>
                        <Clock size={18} /> IMPORTACIÓN
                    </button>
                    <button onClick={() => setView('clientes')} className={`px-6 py-3 rounded-2xl font-black italic flex items-center gap-2 transition-all ${view === 'clientes' ? 'bg-indigo-500 text-white' : 'bg-white/5 text-slate-400'}`}>
                        <UserPlus size={18} /> GESTIÓN VIP
                    </button>
                </div>

                {/* VISTA CLIENTES / VIP */}
                {view === 'clientes' && (
                    <div className="bg-[#0f172a] rounded-[2rem] border border-white/5 overflow-hidden shadow-2xl animate-in fade-in duration-500">
                        <div className="p-8 border-b border-white/5 bg-white/[0.02]">
                            <h3 className="text-xl font-black italic uppercase text-white flex items-center gap-3">
                                <Crown className="text-amber-400" /> Control de Membresías Gosu
                            </h3>
                            <p className="text-xs text-slate-500 mt-1">Gestiona quiénes tienen acceso a beneficios mayoristas exclusivos.</p>
                        </div>
                        <table className="w-full text-left">
                            <thead className="bg-white/5 text-[10px] uppercase font-black text-slate-500 tracking-[0.2em]">
                                <tr>
                                    <th className="p-6">Usuario Emprendedor</th>
                                    <th className="p-6 text-center">Estado Actual</th>
                                    <th className="p-6 text-right">Acción</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {usuarios.map((u) => (
                                    <tr key={u.id} className="hover:bg-white/[0.02] transition-colors">
                                        <td className="p-6">
                                            <p className="font-bold text-white">{u.email}</p>
                                            <p className="text-[10px] text-slate-500 uppercase font-mono">{u.id.substring(0,8)}</p>
                                        </td>
                                        <td className="p-6 text-center">
                                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black italic uppercase ${u.role === 'vip' ? 'bg-amber-400/20 text-amber-400 border border-amber-400/30' : 'bg-slate-800 text-slate-400'}`}>
                                                {u.role === 'vip' ? '👑 Miembro VIP' : 'Normal'}
                                            </span>
                                        </td>
                                        <td className="p-6 text-right">
                                            {u.role === 'normal' ? (
                                                <button onClick={() => cambiarRol(u.id, 'vip')} className="bg-amber-400 hover:bg-amber-300 text-black font-black py-2 px-6 rounded-xl text-[10px] uppercase italic transition-all">Ascender a VIP</button>
                                            ) : (
                                                <button onClick={() => cambiarRol(u.id, 'normal')} className="text-red-500 hover:bg-red-500/10 font-bold py-2 px-6 rounded-xl text-[10px] uppercase italic">Quitar VIP</button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* VISTA DE IMPORTACIÓN (DASHBOARD) */}
                {view === 'config' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-[#0f172a] p-6 rounded-3xl border border-white/5 flex items-center justify-between">
                                <div><p className="text-[10px] font-black uppercase text-slate-500 mb-1">Estado</p><p className="text-xl font-black italic text-amber-400">{importConfig.estado || 'No definido'}</p></div>
                                <div className="w-12 h-12 bg-amber-400/10 rounded-2xl flex items-center justify-center text-amber-400"><Ship size={24} /></div>
                            </div>
                            <div className="bg-[#0f172a] p-6 rounded-3xl border border-white/5 flex items-center justify-between">
                                <div><p className="text-[10px] font-black uppercase text-slate-500 mb-1">Cierre en</p><p className="text-xl font-black italic text-[#22c55e]">{calcularDias()}</p></div>
                                <div className="w-12 h-12 bg-[#22c55e]/10 rounded-2xl flex items-center justify-center text-[#22c55e]"><Clock size={24} /></div>
                            </div>
                            <div className="bg-[#0f172a] p-6 rounded-3xl border border-white/5 flex items-center justify-between">
                                <div><p className="text-[10px] font-black uppercase text-slate-500 mb-1">Items</p><p className="text-xl font-black italic text-blue-400">{productos.length}</p></div>
                                <div className="w-12 h-12 bg-blue-400/10 rounded-2xl flex items-center justify-center text-blue-400"><Package size={24} /></div>
                            </div>
                        </div>

                        <div className="bg-[#0f172a] p-8 md:p-10 rounded-[2rem] border border-amber-500/20 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none" />
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-8 pb-6 border-b border-white/5">
                                    <div className="p-3 bg-amber-500/10 rounded-xl"><CalendarDays className="text-amber-500" size={24} /></div>
                                    <div><h3 className="text-2xl font-black italic uppercase tracking-tighter text-white">Cronograma</h3><p className="text-xs text-slate-400 mt-1">Define el periodo de recepción de pedidos.</p></div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <div className="space-y-3"><label className="text-[11px] font-black uppercase text-slate-400">Apertura</label><input type="datetime-local" className="w-full bg-[#070b12] border border-white/10 p-4 rounded-2xl outline-none focus:border-amber-500" value={importConfig.fechaInicio} onChange={(e) => setImportConfig({...importConfig, fechaInicio: e.target.value})} /></div>
                                    <div className="space-y-3"><label className="text-[11px] font-black uppercase text-slate-400">Cierre</label><input type="datetime-local" className="w-full bg-[#070b12] border border-white/10 p-4 rounded-2xl outline-none focus:border-amber-500" value={importConfig.fechaCierre} onChange={(e) => setImportConfig({...importConfig, fechaCierre: e.target.value})} /></div>
                                    <div className="space-y-3"><label className="text-[11px] font-black uppercase text-slate-400">Fase</label>
                                        <select className="w-full bg-[#070b12] border border-white/10 p-4 rounded-2xl outline-none appearance-none cursor-pointer" value={importConfig.estado} onChange={(e) => setImportConfig({...importConfig, estado: e.target.value})}>
                                            <option value="Recibiendo Órdenes">🟢 Recibiendo Órdenes</option>
                                            <option value="Pedido Realizado">🟡 Pedido Realizado</option>
                                            <option value="En Tránsito 🚢">🚢 En Tránsito</option>
                                            <option value="En Aduanas 📦">📦 En Aduanas</option>
                                            <option value="Distribución 🇵🇪">🚚 Distribución</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="mt-10 pt-8 border-t border-white/5 flex justify-end gap-4">
                                    <button onClick={guardarConfigImportacion} disabled={loading} className="w-full sm:w-auto bg-amber-500 text-black font-black py-4 px-10 rounded-xl transition-all hover:scale-105 uppercase italic">{loading ? 'Cargando...' : 'Aplicar Cambios'}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* VISTA DE REGISTRAR */}
                {view === 'registrar' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        <form onSubmit={handleSubmit} className="bg-[#0f172a] p-8 rounded-3xl border border-white/5 space-y-4 shadow-2xl">
                            <div className="flex bg-white/5 p-1 rounded-xl mb-4">
                                <button type="button" onClick={() => setTab('perfume')} className={`flex-1 py-2 rounded-lg font-bold ${tab === 'perfume' ? 'bg-[#22c55e] text-black' : 'text-slate-500'}`}>Perfume</button>
                                <button type="button" onClick={() => setTab('iphone')} className={`flex-1 py-2 rounded-lg font-bold ${tab === 'iphone' ? 'bg-[#22c55e] text-black' : 'text-slate-500'}`}>iPhone</button>
                            </div>
                            <input required name="name" placeholder="Nombre" className="w-full bg-[#070b12] border border-white/10 p-3 rounded-xl outline-none" onChange={(e) => setFormData({...formData, name: e.target.value})} value={formData.name}/>
                            <div className="grid grid-cols-2 gap-4">
                                <input required type="number" step="0.01" name="price" placeholder="Mayorista S/" className="w-full bg-[#070b12] border border-white/10 p-3 rounded-xl outline-none" onChange={(e) => setFormData({...formData, price: e.target.value})} value={formData.price}/>
                                <input type="number" name="stock" placeholder="Stock" className="w-full bg-[#070b12] border border-white/10 p-3 rounded-xl outline-none" onChange={(e) => setFormData({...formData, stock: e.target.value})} value={formData.stock}/>
                            </div>
                            {tab === 'iphone' ? (
                                <input required name="color" placeholder="Color" className="w-full bg-[#070b12] border-[#22c55e]/30 border p-3 rounded-xl outline-none" onChange={(e) => setFormData({...formData, color: e.target.value})} value={formData.color}/>
                            ) : (
                                <input required name="brand" placeholder="Marca" className="w-full bg-[#070b12] border-white/10 p-3 rounded-xl outline-none" onChange={(e) => setFormData({...formData, brand: e.target.value})} value={formData.brand}/>
                            )}
                            <input name="image" placeholder="URL Imagen PNG" className="w-full bg-[#070b12] border-white/10 p-3 rounded-xl outline-none" onChange={(e) => setFormData({...formData, image: e.target.value})} value={formData.image}/>
                            <label className="flex items-center gap-3 cursor-pointer p-3 bg-white/5 rounded-xl">
                                <input type="checkbox" checked={formData.featured} onChange={(e) => setFormData({...formData, featured: e.target.checked})} className="w-5 h-5 accent-[#22c55e]"/>
                                <span className="text-xs font-black italic uppercase">Destacar 🔥</span>
                            </label>
                            <button disabled={loading} className="w-full bg-[#22c55e] text-black font-black py-4 rounded-2xl shadow-xl">{loading ? 'PROCESANDO...' : 'SUBIR A CATÁLOGO'}</button>
                        </form>
                        <div className="bg-[#0f172a] p-8 rounded-3xl border border-[#22c55e]/10 flex flex-col items-center justify-center">
                            <img src={formData.image || 'https://via.placeholder.com/200'} className="h-64 object-contain drop-shadow-2xl mb-6" />
                            <h2 className="text-2xl font-black italic">{formData.name || 'Vista Previa'}</h2>
                            <p className="text-3xl font-black mt-4 text-[#22c55e]">S/ {formData.price || '0.00'}</p>
                        </div>
                    </div>
                )}

                {/* VISTA DE INVENTARIO */}
                {view === 'inventario' && (
                    <div className="bg-[#0f172a] rounded-3xl border border-white/5 overflow-x-auto shadow-2xl">
                        <table className="w-full text-left">
                            <thead className="bg-white/5 text-[10px] uppercase font-black text-slate-500">
                                <tr><th className="p-6">Producto</th><th className="p-6">Precio</th><th className="p-6">Stock</th><th className="p-6 text-right">Acciones</th></tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {productos.map((prod) => (
                                    <tr key={prod.id} className="hover:bg-white/[0.02]">
                                        <td className="p-6 flex items-center gap-4"><img src={prod.image} className="w-10 h-10 object-contain" /><span className="font-bold text-sm uppercase italic">{prod.name}</span></td>
                                        <td className="p-6 font-black text-[#22c55e]">S/ {prod.price}</td>
                                        <td className="p-6"><span className={`px-3 py-1 rounded-lg text-[10px] font-black italic ${prod.stock <= 3 ? 'bg-red-500/20 text-red-500' : 'bg-green-500/20 text-green-500'}`}>{prod.stock} UNID.</span></td>
                                        <td className="p-6 text-right"><div className="flex justify-end gap-2"><button onClick={() => abrirEditor(prod)} className="text-blue-400 p-2 hover:bg-white/5 rounded-lg"><Edit3 size={18} /></button><button onClick={() => eliminarProducto(prod.id, prod.tablaOriginal)} className="text-red-500 p-2 hover:bg-white/5 rounded-lg"><Trash2 size={18} /></button></div></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* MODAL DE EDICIÓN */}
                {isEditModalOpen && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-[#070b12]/90 backdrop-blur-md">
                        <div className="bg-[#0f172a] w-full max-w-md rounded-3xl border border-[#22c55e]/30 p-8 space-y-4">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-black italic uppercase tracking-tighter">Editar Producto</h2>
                                <button onClick={() => setIsEditModalOpen(false)} className="text-slate-500 hover:text-white"><X size={24}/></button>
                            </div>
                            <input className="w-full bg-[#070b12] border border-white/10 p-3 rounded-xl outline-none focus:border-[#22c55e]" value={editingProduct.name} onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}/>
                            <div className="grid grid-cols-2 gap-4">
                                <input type="number" step="0.01" className="w-full bg-[#070b12] border border-white/10 p-3 rounded-xl" value={editingProduct.price} onChange={(e) => setEditingProduct({...editingProduct, price: e.target.value})}/>
                                <input type="number" className="w-full bg-[#070b12] border border-white/10 p-3 rounded-xl" value={editingProduct.stock} onChange={(e) => setEditingProduct({...editingProduct, stock: e.target.value})}/>
                            </div>
                            <button onClick={guardarEdicion} className="w-full bg-[#22c55e] text-black font-black py-4 rounded-2xl shadow-lg transition-all active:scale-95">GUARDAR CAMBIOS</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}