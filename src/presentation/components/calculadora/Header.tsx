import React from 'react';
import { Calculator } from 'lucide-react';

export const Header = ({ title }: { title: string }) => {
    return (
        <div className="mb-12 text-center lg:text-left flex flex-col lg:flex-row items-center gap-4 animate-in fade-in duration-700">
            <div className="w-16 h-16 bg-[#22c55e]/10 rounded-2xl flex items-center justify-center text-[#22c55e] shrink-0 border border-[#22c55e]/20 backdrop-blur">
                <Calculator size={32} />
            </div>
            <div>
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase italic">
                    {title.split(' ')[0]} <span className="text-[#22c55e]">{title.split(' ')[1]}</span>
                </h1>
                <p className="text-slate-400 font-medium mt-1">Define el producto y cotiza al instante.</p>
            </div>
        </div>
    );
};