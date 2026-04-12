// src/presentation/components/admin/VipManagement.tsx
import React from 'react';
import { Crown } from 'lucide-react';
import { adminRepository } from '@/src/infrastructure/database/adminRepository';

interface Props {
    usuarios: any[];
    onRefresh: () => void;
}

export const VipManagement = ({ usuarios, onRefresh }: Props) => {
    const handleRoleChange = async (id: string, currentRole: string) => {
        const nextRole = currentRole === 'vip' ? 'normal' : 'vip';
        await adminRepository.updateUserRole(id, nextRole);
        onRefresh();
    };

    return (
        <div className="bg-[#0f172a] rounded-[2rem] border border-white/5 overflow-hidden shadow-2xl animate-in fade-in duration-500">
            <div className="p-8 border-b border-white/5 bg-white/[0.02]">
                <h3 className="text-xl font-black italic uppercase text-white flex items-center gap-3">
                    <Crown className="text-amber-400" /> Miembros Gosu
                </h3>
            </div>
            <table className="w-full text-left">
                <thead className="bg-white/5 text-[10px] uppercase font-black text-slate-500">
                    <tr>
                        <th className="p-6">Usuario</th>
                        <th className="p-6 text-center">Estado</th>
                        <th className="p-6 text-right">Acción</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {usuarios.map((u) => (
                        <tr key={u.id}>
                            <td className="p-6">
                                <p className="font-bold text-white text-sm">{u.email}</p>
                            </td>
                            <td className="p-6 text-center">
                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase ${u.role === 'vip' ? 'bg-amber-400/20 text-amber-400 border border-amber-400/30' : 'bg-slate-800 text-slate-400'}`}>
                                    {u.role === 'vip' ? '👑 VIP' : 'Normal'}
                                </span>
                            </td>
                            <td className="p-6 text-right">
                                <button 
                                    onClick={() => handleRoleChange(u.id, u.role)}
                                    className={`font-black py-2 px-6 rounded-xl text-[10px] uppercase italic ${u.role === 'normal' ? 'bg-amber-400 text-black' : 'text-red-500'}`}
                                >
                                    {u.role === 'normal' ? 'Ascender a VIP' : 'Quitar VIP'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};