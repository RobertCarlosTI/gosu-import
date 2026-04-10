"use client";
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  PlusCircle, Package, Smartphone, Save, Image as ImageIcon, 
  CheckCircle2, AlertCircle, Loader2, Trash2, Edit3, Star, Box, X 
} from 'lucide-react';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://scpmnmgdvfdbpuyeiawn.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'TU_ANON_KEY_AQUI';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function AdminPage() {
    const [view, setView] = useState<'registrar' | 'inventario'>('registrar');
    const [tab, setTab] = useState<'perfume' | 'iphone'>('perfume');
    const [loading, setLoading] = useState(false);
    const [verificando, setVerificando] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [productos, setProductos] = useState<any[]>([]);

    // Estados para Edición
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<any>(null);

    const [formData, setFormData] = useState({
        name: '', brand: '', price: '', old_price: '', size: '', image: '', color: '', stock: '10', featured: false
    });

    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user?.email === 'gosu.import01@gmail.com') setIsAdmin(true);
            setVerificando(false);
        };
        checkUser();
        fetchInventario();
    }, []);

    const fetchInventario = async () => {
        const [p, i] = await Promise.all([
            supabase.from('perfumes').select('*').order('created_at', { ascending: false }),
            supabase.from('iphones').select('*').order('created_at', { ascending: false })
        ]);
        // Marcamos de qué tabla viene cada uno para poder editarlos/borrarlos luego
        const perfumesConTabla = (p.data || []).map(prod => ({ ...prod, tablaOriginal: 'perfumes' }));
        const iphonesConTabla = (i.data || []).map(prod => ({ ...prod, tablaOriginal: 'iphones' }));
        setProductos([...perfumesConTabla, ...iphonesConTabla]);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const tabla = tab === 'perfume' ? 'perfumes' : 'iphones';
        const payload = {
            ...formData,
            price: parseFloat(formData.price),
            old_price: formData.old_price ? parseFloat(formData.old_price) : null,
            stock: parseInt(formData.stock)
        };
        const { error } = await supabase.from(tabla).insert([payload]);
        if (!error) {
            alert("¡Registrado en Gosu Cloud!");
            setFormData({ name: '', brand: '', price: '', old_price: '', size: '', image: '', color: '', stock: '10', featured: false });
            fetchInventario();
        }
        setLoading(false);
    };

    // --- LÓGICA DE EDICIÓN ---
    const abrirEditor = (producto: any) => {
        setEditingProduct(producto);
        setIsEditModalOpen(true);
    };

    const guardarEdicion = async () => {
        setLoading(true);
        const { error } = await supabase
            .from(editingProduct.tablaOriginal)
            .update({
                name: editingProduct.name,
                price: parseFloat(editingProduct.price),
                stock: parseInt(editingProduct.stock),
                color: editingProduct.color,
                size: editingProduct.size,
                brand: editingProduct.brand,
                featured: editingProduct.featured
            })
            .eq('id', editingProduct.id);

        if (!error) {
            setIsEditModalOpen(false);
            fetchInventario();
        } else {
            alert("Error al actualizar: " + error.message);
        }
        setLoading(false);
    };

    const eliminarProducto = async (id: string, tabla: string) => {
        if(confirm("¿Seguro que quieres eliminar este producto de Gosu Import?")) {
            await supabase.from(tabla).delete().eq('id', id);
            fetchInventario();
        }
    };

    if (verificando) return <div className="min-h-screen bg-[#070b12] flex items-center justify-center text-[#22c55e] font-black italic">Verificando...</div>;
    if (!isAdmin) return <div className="min-h-screen bg-[#070b12] text-white flex items-center justify-center">Acceso Denegado</div>;

    return (
        <div className="min-h-screen bg-[#070b12] text-white pt-28 pb-20 px-4">
            <div className="max-w-6xl mx-auto">
                
                {/* Switch de Vistas */}
                <div className="flex gap-4 mb-10">
                    <button onClick={() => setView('registrar')} className={`px-6 py-3 rounded-2xl font-black italic flex items-center gap-2 transition-all ${view === 'registrar' ? 'bg-[#22c55e] text-[#070b12] shadow-[0_0_20px_rgba(34,197,94,0.3)]' : 'bg-white/5 text-slate-400'}`}>
                        <PlusCircle size={18} /> REGISTRAR
                    </button>
                    <button onClick={() => setView('inventario')} className={`px-6 py-3 rounded-2xl font-black italic flex items-center gap-2 transition-all ${view === 'inventario' ? 'bg-[#22c55e] text-[#070b12] shadow-[0_0_20px_rgba(34,197,94,0.3)]' : 'bg-white/5 text-slate-400'}`}>
                        <Box size={18} /> INVENTARIO REAL
                    </button>
                </div>

                {view === 'registrar' ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        <form onSubmit={handleSubmit} className="bg-[#0f172a] p-8 rounded-3xl border border-white/5 space-y-4 shadow-2xl">
                            <div className="flex bg-white/5 p-1 rounded-xl mb-4 border border-white/5">
                                <button type="button" onClick={() => setTab('perfume')} className={`flex-1 py-2 rounded-lg font-bold transition-all ${tab === 'perfume' ? 'bg-[#22c55e] text-black shadow-lg' : 'text-slate-500'}`}>Perfume</button>
                                <button type="button" onClick={() => setTab('iphone')} className={`flex-1 py-2 rounded-lg font-bold transition-all ${tab === 'iphone' ? 'bg-[#22c55e] text-black shadow-lg' : 'text-slate-500'}`}>iPhone</button>
                            </div>
                            
                            <input required name="name" placeholder="Nombre del Producto" className="w-full bg-[#070b12] border border-white/10 p-3 rounded-xl outline-none focus:border-[#22c55e]" onChange={(e) => setFormData({...formData, name: e.target.value})} value={formData.name}/>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <input required type="number" step="0.01" name="price" placeholder="Precio S/" className="w-full bg-[#070b12] border border-white/10 p-3 rounded-xl outline-none focus:border-[#22c55e]" onChange={(e) => setFormData({...formData, price: e.target.value})} value={formData.price}/>
                                <input type="number" name="stock" placeholder="Stock Inicial" className="w-full bg-[#070b12] border border-white/10 p-3 rounded-xl outline-none focus:border-[#22c55e]" onChange={(e) => setFormData({...formData, stock: e.target.value})} value={formData.stock}/>
                            </div>

                            {tab === 'iphone' ? (
                                <input required name="color" placeholder="Color Disponible (Ej: Titanium)" className="w-full bg-[#070b12] border-[#22c55e]/30 border p-3 rounded-xl outline-none" onChange={(e) => setFormData({...formData, color: e.target.value})} value={formData.color}/>
                            ) : (
                                <input required name="brand" placeholder="Marca (Ej: Lattafa)" className="w-full bg-[#070b12] border-white/10 p-3 rounded-xl outline-none" onChange={(e) => setFormData({...formData, brand: e.target.value})} value={formData.brand}/>
                            )}

                            <input name="image" placeholder="URL de Imagen PNG" className="w-full bg-[#070b12] border-white/10 p-3 rounded-xl outline-none" onChange={(e) => setFormData({...formData, image: e.target.value})} value={formData.image}/>
                            
                            <label className="flex items-center gap-3 cursor-pointer p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                                <input type="checkbox" checked={formData.featured} onChange={(e) => setFormData({...formData, featured: e.target.checked})} className="w-5 h-5 accent-[#22c55e]"/>
                                <span className="text-sm font-black italic uppercase tracking-tighter">Marcar como Recomendado 🔥</span>
                            </label>

                            <button disabled={loading} className="w-full bg-[#22c55e] text-black font-black py-4 rounded-2xl shadow-xl hover:-translate-y-1 transition-all">
                                {loading ? 'PROCESANDO...' : 'SUBIR A CATÁLOGO'}
                            </button>
                        </form>

                        {/* Preview Realtime */}
                        <div className="bg-[#0f172a] p-8 rounded-3xl border border-[#22c55e]/10 flex flex-col items-center justify-center relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-10 opacity-10 font-black text-6xl italic rotate-12 select-none">GOSU</div>
                            <img src={formData.image || 'https://via.placeholder.com/200'} className="h-64 object-contain drop-shadow-[0_20px_50px_rgba(34,197,94,0.3)] mb-6 z-10" />
                            <h2 className="text-2xl font-black italic z-10">{formData.name || 'Nombre del Producto'}</h2>
                            <p className="text-3xl font-black mt-4 text-[#22c55e] z-10">S/ {formData.price || '0.00'}</p>
                        </div>
                    </div>
                ) : (
                    <div className="bg-[#0f172a] rounded-3xl border border-white/5 overflow-x-auto shadow-2xl">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-white/5 text-[10px] uppercase font-black tracking-widest text-slate-500">
                                <tr>
                                    <th className="p-6">Producto</th>
                                    <th className="p-6">Precio</th>
                                    <th className="p-6">Stock</th>
                                    <th className="p-6">Detalle</th>
                                    <th className="p-6">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {productos.map((prod) => (
                                    <tr key={prod.id} className="hover:bg-white/[0.03] transition-colors group">
                                        <td className="p-6 flex items-center gap-4">
                                            <div className="w-12 h-12 bg-white/5 rounded-xl p-2 flex items-center justify-center shrink-0">
                                                <img src={prod.image} className="max-h-full max-w-full object-contain" />
                                            </div>
                                            <div>
                                                <p className="font-black text-sm uppercase italic tracking-tighter">{prod.name}</p>
                                                <p className="text-[10px] text-slate-500 font-bold">{prod.tablaOriginal === 'perfumes' ? 'Perfumería' : 'Tecnología'}</p>
                                            </div>
                                        </td>
                                        <td className="p-6 font-black text-sm text-[#22c55e] italic">S/ {prod.price}</td>
                                        <td className="p-6">
                                            <span className={`px-3 py-1 rounded-lg text-[10px] font-black italic ${prod.stock <= 3 ? 'bg-red-500/20 text-red-500 animate-pulse' : 'bg-green-500/20 text-green-500'}`}>
                                                {prod.stock} UNID.
                                            </span>
                                        </td>
                                        <td className="p-6 text-[11px] text-slate-400 font-black uppercase italic tracking-tight">
                                            {prod.color ? `Color: ${prod.color}` : prod.brand || prod.size || '-'}
                                        </td>
                                        <td className="p-6">
                                            <div className="flex gap-2">
                                                <button onClick={() => abrirEditor(prod)} className="text-blue-400 hover:bg-blue-400/10 p-2.5 rounded-xl transition-all">
                                                    <Edit3 size={18} />
                                                </button>
                                                <button onClick={() => eliminarProducto(prod.id, prod.tablaOriginal)} className="text-red-500 hover:bg-red-500/10 p-2.5 rounded-xl transition-all">
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* MODAL DE EDICIÓN (Se abre encima de todo) */}
                {isEditModalOpen && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-[#070b12]/90 backdrop-blur-md">
                        <div className="bg-[#0f172a] w-full max-w-md rounded-3xl border border-[#22c55e]/30 shadow-[0_0_50px_rgba(34,197,94,0.15)] overflow-hidden">
                            <div className="p-6 border-b border-white/5 flex justify-between items-center">
                                <h2 className="text-xl font-black italic uppercase tracking-tighter">Editar Producto</h2>
                                <button onClick={() => setIsEditModalOpen(false)} className="text-slate-500 hover:text-white"><X size={24}/></button>
                            </div>
                            <div className="p-8 space-y-4">
                                <div>
                                    <label className="text-[10px] font-black uppercase text-slate-500 mb-1 block">Nombre</label>
                                    <input className="w-full bg-[#070b12] border border-white/10 p-3 rounded-xl outline-none focus:border-[#22c55e]" value={editingProduct.name} onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}/>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[10px] font-black uppercase text-slate-500 mb-1 block">Precio S/</label>
                                        <input type="number" step="0.01" className="w-full bg-[#070b12] border border-white/10 p-3 rounded-xl outline-none" value={editingProduct.price} onChange={(e) => setEditingProduct({...editingProduct, price: e.target.value})}/>
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black uppercase text-slate-500 mb-1 block">Stock</label>
                                        <input type="number" className="w-full bg-[#070b12] border border-white/10 p-3 rounded-xl outline-none" value={editingProduct.stock} onChange={(e) => setEditingProduct({...editingProduct, stock: e.target.value})}/>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[10px] font-black uppercase text-slate-500 mb-1 block">{editingProduct.color ? 'Color' : 'Marca / Size'}</label>
                                    <input className="w-full bg-[#070b12] border border-white/10 p-3 rounded-xl outline-none" value={editingProduct.color || editingProduct.brand || editingProduct.size} onChange={(e) => {
                                        const val = e.target.value;
                                        if(editingProduct.color) setEditingProduct({...editingProduct, color: val});
                                        else setEditingProduct({...editingProduct, brand: val});
                                    }}/>
                                </div>

                                <button onClick={guardarEdicion} disabled={loading} className="w-full bg-[#22c55e] text-black font-black py-4 rounded-2xl shadow-lg mt-4 transition-all hover:scale-[1.02]">
                                    {loading ? 'ACTUALIZANDO...' : 'GUARDAR CAMBIOS'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}