import React from 'react';
import { Ship } from 'lucide-react';

interface Props {
    config: any;
    timeLeft: { dias: number; horas: number; min: number; seg: number };
    isClosed: boolean;
}

export const ImportBanner = ({ config, timeLeft, isClosed }: Props) => {
    return (
        <div className={`mb-10 p-8 rounded-3xl border transition-all ${isClosed ? 'border-red-500/30 bg-red-500/5' : 'border-[#22c55e]/30 bg-gradient-to-r from-[#22c55e]/10 to-transparent'}`}>
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Ship className={isClosed ? "text-red-500" : "text-[#22c55e]"} size={20} />
                        <span className={`text-[10px] font-black uppercase tracking-widest ${isClosed ? 'text-red-500' : 'text-[#22c55e]'}`}>
                            {isClosed ? 'Importación Cerrada' : 'Importación Grupal Abierta'}
                        </span>
                    </div>
                    <h2 className="text-3xl font-black italic uppercase tracking-tighter">
                        Fase: {config?.estado_importacion || 'Cargando...'}
                    </h2>
                </div>
                {!isClosed && (
                    <div className="flex gap-3">
                        {[
                            { l: 'Días', v: timeLeft.dias },
                            { l: 'Hrs', v: timeLeft.horas },
                            { l: 'Min', v: timeLeft.min },
                            { l: 'Seg', v: timeLeft.seg }
                        ].map(t => (
                            <div key={t.l} className="flex flex-col items-center">
                                <div className="bg-[#070b12] border border-white/10 w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black italic text-[#22c55e]">
                                    {t.v}
                                </div>
                                <p className="text-[9px] font-bold uppercase mt-2 text-slate-500">{t.l}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};