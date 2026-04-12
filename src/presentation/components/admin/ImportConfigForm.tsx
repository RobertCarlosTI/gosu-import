// src/presentation/components/admin/ImportConfigForm.tsx
import React, { useState } from 'react';
import { CalendarDays, Ship, Clock } from 'lucide-react';
import { adminRepository } from '@/src/infrastructure/database/adminRepository';

interface Props {
    config: any;
    setConfig: (config: any) => void;
    onRefresh: () => void;
}

export const ImportConfigForm = ({ config, setConfig, onRefresh }: Props) => {
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        setLoading(true);
        await adminRepository.updateImportConfig({
            fecha_inicio: config.fechaInicio,
            fecha_cierre: config.fechaCierre,
            estado_importacion: config.estado
        });
        alert("¡Configuración actualizada!");
        onRefresh();
        setLoading(false);
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
            <div className="bg-[#0f172a] p-8 md:p-10 rounded-[2rem] border border-amber-500/20 relative overflow-hidden">
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-8 pb-6 border-b border-white/5">
                        <CalendarDays className="text-amber-500" size={24} />
                        <h3 className="text-2xl font-black italic uppercase tracking-tighter">Cronograma</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="space-y-3">
                            <label className="text-[11px] font-black uppercase text-slate-400">Apertura</label>
                            <input type="datetime-local" className="w-full bg-[#070b12] border border-white/10 p-4 rounded-2xl outline-none" value={config.fechaInicio} onChange={(e) => setConfig({...config, fechaInicio: e.target.value})} />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[11px] font-black uppercase text-slate-400">Cierre</label>
                            <input type="datetime-local" className="w-full bg-[#070b12] border border-white/10 p-4 rounded-2xl outline-none" value={config.fechaCierre} onChange={(e) => setConfig({...config, fechaCierre: e.target.value})} />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[11px] font-black uppercase text-slate-400">Fase</label>
                            <select className="w-full bg-[#070b12] border border-white/10 p-4 rounded-2xl outline-none" value={config.estado} onChange={(e) => setConfig({...config, estado: e.target.value})}>
                                <option value="Recibiendo Órdenes">🟢 Recibiendo Órdenes</option>
                                <option value="Pedido Realizado">🟡 Pedido Realizado</option>
                                <option value="En Tránsito 🚢">🚢 En Tránsito</option>
                                <option value="En Aduanas 📦">📦 En Aduanas</option>
                                <option value="Distribución 🇵🇪">🚚 Distribución</option>
                            </select>
                        </div>
                    </div>
                    <div className="mt-10 pt-8 border-t border-white/5 flex justify-end">
                        <button onClick={handleSave} disabled={loading} className="bg-amber-500 text-black font-black py-4 px-12 rounded-xl">
                            {loading ? 'Cargando...' : 'Aplicar Cambios'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};