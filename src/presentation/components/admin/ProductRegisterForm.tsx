import React, { useState } from 'react';
import { supabase } from '@/src/infrastructure/database/supabaseClient';

export const ProductRegisterForm = ({ onRefresh }: { onRefresh: () => void }) => {
    const [tab, setTab] = useState<'perfume' | 'iphone'>('perfume');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '', brand: '', price: '', stock: '10', image: '', featured: false, color: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const tabla = tab === 'perfume' ? 'perfumes' : 'iphones';
        const { error } = await supabase.from(tabla).insert([{
            ...formData,
            price: parseFloat(formData.price),
            stock: parseInt(formData.stock)
        }]);
        
        if (!error) {
            alert("¡Producto registrado!");
            setFormData({ name: '', brand: '', price: '', stock: '10', image: '', featured: false, color: '' });
            onRefresh();
        }
        setLoading(false);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-in fade-in duration-500">
            <form onSubmit={handleSubmit} className="bg-[#0f172a] p-8 rounded-3xl border border-white/5 space-y-4 shadow-2xl">
                <div className="flex bg-white/5 p-1 rounded-xl mb-4">
                    <button type="button" onClick={() => setTab('perfume')} className={`flex-1 py-2 rounded-lg font-bold ${tab === 'perfume' ? 'bg-[#22c55e] text-black' : 'text-slate-500'}`}>Perfume</button>
                    <button type="button" onClick={() => setTab('iphone')} className={`flex-1 py-2 rounded-lg font-bold ${tab === 'iphone' ? 'bg-[#22c55e] text-black' : 'text-slate-500'}`}>iPhone</button>
                </div>
                <input required placeholder="Nombre" className="w-full bg-[#070b12] border border-white/10 p-3 rounded-xl outline-none" onChange={(e) => setFormData({...formData, name: e.target.value})} value={formData.name}/>
                <div className="grid grid-cols-2 gap-4">
                    <input required type="number" step="0.01" placeholder="Precio S/" className="w-full bg-[#070b12] border border-white/10 p-3 rounded-xl outline-none" onChange={(e) => setFormData({...formData, price: e.target.value})} value={formData.price}/>
                    <input type="number" placeholder="Stock" className="w-full bg-[#070b12] border border-white/10 p-3 rounded-xl outline-none" onChange={(e) => setFormData({...formData, stock: e.target.value})} value={formData.stock}/>
                </div>
                <input required placeholder={tab === 'perfume' ? "Marca" : "Color"} className="w-full bg-[#070b12] border-white/10 p-3 rounded-xl outline-none" onChange={(e) => setFormData({...formData, brand: e.target.value, color: e.target.value})} value={tab === 'perfume' ? formData.brand : formData.color}/>
                <input name="image" placeholder="URL Imagen PNG" className="w-full bg-[#070b12] border-white/10 p-3 rounded-xl outline-none" onChange={(e) => setFormData({...formData, image: e.target.value})} value={formData.image}/>
                <button disabled={loading} className="w-full bg-[#22c55e] text-black font-black py-4 rounded-2xl shadow-xl hover:scale-[1.02] transition-transform">
                    {loading ? 'PROCESANDO...' : 'SUBIR A CATÁLOGO'}
                </button>
            </form>
            <div className="bg-[#0f172a] p-8 rounded-3xl border border-[#22c55e]/10 flex flex-col items-center justify-center">
                <img src={formData.image || 'https://via.placeholder.com/200'} className="h-64 object-contain drop-shadow-2xl mb-6" />
                <h2 className="text-2xl font-black italic">{formData.name || 'Vista Previa'}</h2>
                <p className="text-3xl font-black mt-4 text-[#22c55e]">S/ {formData.price || '0.00'}</p>
            </div>
        </div>
    );
};