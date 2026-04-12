import React from 'react';
import { Smartphone, Tablet, Laptop, Box } from 'lucide-react';

interface Props {
    category: string;
    setCategory: (c: any) => void;
}

export const CategorySelector = ({ category, setCategory }: Props) => {
    const categories = [
        { id: 'iPhone', icon: <Smartphone size={16}/> },
        { id: 'iPad', icon: <Tablet size={16}/> },
        { id: 'Laptops', icon: <Laptop size={16}/> },
        { id: 'Otros', icon: <Box size={16}/> }
    ];

    return (
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 md:p-8 mt-6">
            <h2 className="text-white text-xs font-black uppercase tracking-widest mb-4">Paso 2. Tipo de Cotización</h2>
            <div className="flex flex-wrap gap-3">
                {categories.map((cat) => (
                    <button 
                        key={cat.id}
                        onClick={() => setCategory(cat.id)}
                        className={`px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition-all border ${category === cat.id ? 'bg-[#22c55e]/10 text-[#22c55e] border-[#22c55e]' : 'bg-slate-900/50 text-slate-400 border-white/5 hover:bg-white/5'}`}
                    >
                        {cat.icon} {cat.id}
                    </button>
                ))}
            </div>
        </div>
    );
};