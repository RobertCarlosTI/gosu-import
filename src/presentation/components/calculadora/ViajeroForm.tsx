import React from 'react';
import { Loader2 } from 'lucide-react';

export const ViajeroForm = ({ hookData }: any) => {
    const { vModel, setVModel, vValue, setVValue, iphoneCatalog, loadingCatalog, vCategory } = hookData;

    if (loadingCatalog) return (
        <div className="p-10 flex flex-col items-center gap-4">
            <Loader2 className="animate-spin text-green-500" size={32} />
            <p className="text-[10px] font-black text-slate-500 uppercase">Sincronizando GOSU DB...</p>
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {iphoneCatalog.length > 0 ? (
                    iphoneCatalog.map((mod: any) => (
                        <button 
                            key={mod.id} 
                            onClick={() => setVModel(mod)}
                            className={`p-4 rounded-2xl text-[10px] font-black transition-all border ${
                                vModel?.id === mod.id ? 'border-green-500 bg-green-500/10 text-white' : 'border-white/10 text-slate-500'
                            }`}
                        >
                            {mod.nombre}
                        </button>
                    ))
                ) : (
                    <div className="col-span-full p-6 border border-dashed border-red-500/30 rounded-2xl text-center">
                        <p className="text-red-400 text-[10px] font-black uppercase tracking-widest">No hay {vCategory} en la base de datos</p>
                    </div>
                )}
            </div>
            
            <input 
                type="number" 
                value={vValue} 
                onChange={(e) => setVValue(e.target.value)}
                placeholder="Valor del equipo en USD"
                className="w-full bg-black/40 border border-white/10 p-5 rounded-2xl text-white outline-none focus:border-green-500 font-bold"
            />
        </div>
    );
};