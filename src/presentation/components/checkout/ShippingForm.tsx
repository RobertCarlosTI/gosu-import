import React from 'react';
import { Truck, MapPin } from 'lucide-react';

export const ShippingForm = ({ tipoEnvio, setTipoEnvio, formData, setFormData, tarifasEnvio }: any) => {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-amber-400 text-black font-black flex items-center justify-center">1</div>
                <h2 className="text-2xl font-black uppercase tracking-tighter">Información de Envío</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
                <button onClick={() => setTipoEnvio('motorizado')} className={`py-4 rounded-2xl flex items-center justify-center gap-3 border-2 transition-all ${tipoEnvio === 'motorizado' ? 'bg-amber-400/10 border-amber-400 text-amber-400' : 'bg-[#161b22] border-white/5 text-slate-500'}`}><Truck size={20} /> Motorizado</button>
                <button onClick={() => setTipoEnvio('shalom')} className={`py-4 rounded-2xl flex items-center justify-center gap-3 border-2 transition-all ${tipoEnvio === 'shalom' ? 'bg-amber-400/10 border-amber-400 text-amber-400' : 'bg-[#161b22] border-white/5 text-slate-500'}`}><MapPin size={20} /> Shalom</button>
            </div>

            <div className="space-y-4">
                <input type="text" placeholder="Nombre Completo" value={formData.nombre} onChange={e => setFormData({...formData, nombre: e.target.value})} className="w-full bg-[#161b22] border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-amber-400" />
                <input type="tel" placeholder="Teléfono" value={formData.telefono} onChange={e => setFormData({...formData, telefono: e.target.value})} className="w-full bg-[#161b22] border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-amber-400" />
                
                {tipoEnvio === 'motorizado' ? (
                    <>
                        <select value={formData.distrito} onChange={e => setFormData({...formData, distrito: e.target.value})} className="w-full bg-[#161b22] border border-white/10 rounded-xl px-5 py-4 outline-none font-bold text-slate-300">
                            <option value="">Selecciona Distrito</option>
                            {tarifasEnvio.map((t: any) => <option key={t.id} value={t.distrito}>{t.distrito} - S/ {t.precio}</option>)}
                        </select>
                        <input type="text" placeholder="Dirección Exacta" value={formData.direccion} onChange={e => setFormData({...formData, direccion: e.target.value})} className="w-full bg-[#161b22] border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-amber-400" />
                    </>
                ) : (
                    <>
                        <input type="text" placeholder="DNI" value={formData.dni} onChange={e => setFormData({...formData, dni: e.target.value})} className="w-full bg-[#161b22] border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-amber-400" />
                        <input type="text" placeholder="Sucursal Shalom" value={formData.sucursal} onChange={e => setFormData({...formData, sucursal: e.target.value})} className="w-full bg-[#161b22] border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-amber-400" />
                    </>
                )}
            </div>
        </div>
    );
};