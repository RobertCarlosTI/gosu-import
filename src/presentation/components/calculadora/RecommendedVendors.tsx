import React from 'react';

interface Props {
    method: string;
    category: string;
}

export const RecommendedVendors = ({ method, category }: Props) => {
    if (method !== 'viajero' || category !== 'iPhone') return null;

    return (
        <div className="bg-gradient-to-b from-[#0b1118] to-slate-900/50 border border-[#22c55e]/30 rounded-[2rem] p-6 shadow-[0_0_30px_rgba(34,197,94,0.05)] relative overflow-hidden animate-in fade-in slide-in-from-bottom-4">
            {/* Efecto de brillo de fondo */}
            <div className="absolute top-[-50px] right-[-50px] w-40 h-40 bg-[#22c55e]/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-[#22c55e]/20 to-transparent border border-[#22c55e]/30 text-[#22c55e] shadow-inner">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                </div>
                <div>
                    <h3 className="text-white font-black uppercase tracking-widest text-[13px]">Top Proveedores</h3>
                    <p className="text-slate-400 text-[10px] mt-1 font-medium uppercase tracking-wider">Compra seguro en USA</p>
                </div>
            </div>
            
            <div className="space-y-3 relative z-10">
                {/* eBay */}
                <a href="https://www.ebay.com/" target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 rounded-2xl border border-white/5 bg-[#131b26] hover:bg-[#1a2433] hover:border-[#22c55e]/50 transition-all duration-300 group">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <p className="text-white text-sm font-bold group-hover:text-[#22c55e] transition-colors">eBay</p>
                                <span className="bg-blue-500/10 text-blue-400 text-[8px] font-black px-2 py-0.5 rounded-full uppercase border border-blue-500/20">Oficial</span>
                            </div>
                            <p className="text-slate-500 text-[10px] mt-1 font-medium">Tienda de productos electronicos</p>
                        </div>
                    </div>
                </a>

                {/* DirectAuth */}
                <a href="https://www.ebay.com/str/directauth" target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 rounded-2xl border border-white/5 bg-[#131b26] hover:bg-[#1a2433] hover:border-[#22c55e]/50 transition-all duration-300 group">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <p className="text-white text-sm font-bold group-hover:text-[#22c55e] transition-colors">DirectAuth</p>
                                <span className="bg-amber-500/10 text-amber-400 text-[8px] font-black px-2 py-0.5 rounded-full uppercase border border-amber-500/20">Top Rated</span>
                            </div>
                            <p className="text-slate-500 text-[10px] mt-1 font-medium">Confiable y brindar garantia</p>
                        </div>
                    </div>
                </a>

                {/* Verizon */}
                <a href="https://www.ebay.com/str/verizon" target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 rounded-2xl border border-white/5 bg-[#131b26] hover:bg-[#1a2433] hover:border-[#22c55e]/50 transition-all duration-300 group">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <p className="text-white text-sm font-bold group-hover:text-[#22c55e] transition-colors">Verizon</p>
                                <span className="bg-purple-500/10 text-purple-400 text-[8px] font-black px-2 py-0.5 rounded-full uppercase border border-purple-500/20">Open Box</span>
                            </div>
                            <p className="text-slate-500 text-[10px] mt-1 font-medium">Especialistas OPEN - BOX</p>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    );
};