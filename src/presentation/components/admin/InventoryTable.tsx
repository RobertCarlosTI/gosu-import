"use client";
import React, { useState } from 'react';
import { Edit3, Trash2, Check, X, Loader2 } from 'lucide-react';
import { adminRepository } from '@/src/infrastructure/database/adminRepository';

interface Props {
    productos: any[];
    onRefresh: () => void;
}

export const InventoryTable = ({ productos, onRefresh }: Props) => {
    // Estados para la edición en línea
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editPrice, setEditPrice] = useState<string>('');
    const [editStatus, setEditStatus] = useState<boolean>(true);
    const [isSaving, setIsSaving] = useState(false);

    const handleDelete = async (id: string, tabla: string) => {
        if (confirm("¿Seguro que quieres eliminar este producto de Gosu Import?")) {
            await adminRepository.deleteProduct(id, tabla);
            onRefresh();
        }
    };

    // Función para activar el modo edición
    const startEdit = (prod: any) => {
        setEditingId(prod.id);
        setEditPrice(prod.price?.toString() || '0');
        // Si el stock es mayor a 0, asumimos que está disponible
        setEditStatus(prod.stock > 0);
    };

    // Función para cancelar la edición
    const cancelEdit = () => {
        setEditingId(null);
    };

    // Función para guardar los cambios
    const handleSave = async (id: string, tabla: string) => {
        try {
            setIsSaving(true);
            await adminRepository.updateProduct(id, tabla, Number(editPrice), editStatus);
            setEditingId(null);
            onRefresh(); 
        } catch (error: any) {
            // AHORA SÍ VEREMOS EL ERROR REAL
            console.error("ERROR AL GUARDAR:", error);
            alert(`Error de Supabase: ${error.message || "Revisa la consola (F12)"}`);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="bg-[#161b22] rounded-[2rem] border border-white/5 overflow-x-auto shadow-2xl animate-in fade-in duration-500">
            <table className="w-full text-left">
                <thead className="bg-black/20 text-[10px] uppercase font-black text-slate-500 tracking-widest border-b border-white/5">
                    <tr>
                        <th className="p-6">Producto</th>
                        <th className="p-6 w-32">Precio</th>
                        <th className="p-6 w-40">Estado</th>
                        <th className="p-6 text-right w-32">Acciones</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {productos.map((prod) => {
                        const isEditing = editingId === prod.id;
                        const isAvailable = prod.stock > 0;

                        return (
                            <tr key={prod.id} className="hover:bg-white/[0.02] transition-colors">
                                
                                {/* 1. PRODUCTO */}
                                <td className="p-6 flex items-center gap-4">
                                    <div className="w-12 h-12 bg-black/40 rounded-xl border border-white/10 flex items-center justify-center overflow-hidden shrink-0">
                                        <img src={prod.image} className="w-full h-full object-cover" alt={prod.name} />
                                    </div>
                                    <span className="font-bold text-sm uppercase italic text-slate-200 tracking-wide">{prod.name}</span>
                                </td>

                                {/* 2. PRECIO (Visual o Input) */}
                                <td className="p-6 font-black text-[#22c55e]">
                                    {isEditing ? (
                                        <div className="flex items-center gap-1 bg-[#0b0f1a] px-3 py-2 rounded-xl border border-amber-400 focus-within:ring-2 focus-within:ring-amber-400/30 transition-all">
                                            <span className="text-amber-400 text-xs">S/</span>
                                            <input 
                                                type="number" 
                                                value={editPrice}
                                                onChange={(e) => setEditPrice(e.target.value)}
                                                className="bg-transparent outline-none w-16 text-white font-black text-sm"
                                                autoFocus
                                            />
                                        </div>
                                    ) : (
                                        `S/ ${Number(prod.price).toFixed(2)}`
                                    )}
                                </td>

                                {/* 3. ESTADO (Visual o Select) */}
                                <td className="p-6">
                                    {isEditing ? (
                                        <select 
                                            value={editStatus ? 'true' : 'false'}
                                            onChange={(e) => setEditStatus(e.target.value === 'true')}
                                            className="bg-[#0b0f1a] border border-amber-400 text-[10px] font-black uppercase text-amber-400 px-3 py-2.5 rounded-xl outline-none w-full shadow-lg"
                                        >
                                            <option value="true">✅ Disponible</option>
                                            <option value="false">❌ Agotado</option>
                                        </select>
                                    ) : (
                                        <span className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest ${isAvailable ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                                            {isAvailable ? 'Disponible' : 'Agotado'}
                                        </span>
                                    )}
                                </td>

                                {/* 4. ACCIONES */}
                                <td className="p-6 text-right">
                                    <div className="flex justify-end gap-2">
                                        {isEditing ? (
                                            <>
                                                {/* Botones de GUARDAR y CANCELAR */}
                                                <button 
                                                    onClick={() => handleSave(prod.id, prod.tablaOriginal)} 
                                                    disabled={isSaving}
                                                    className="text-green-400 bg-green-400/10 p-2 hover:bg-green-400 hover:text-black rounded-xl transition-all border border-green-400/20"
                                                    title="Guardar Cambios"
                                                >
                                                    {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Check size={18} />}
                                                </button>
                                                <button 
                                                    onClick={cancelEdit} 
                                                    disabled={isSaving}
                                                    className="text-slate-400 bg-white/5 p-2 hover:bg-red-500 hover:text-white rounded-xl transition-all border border-white/10"
                                                    title="Cancelar"
                                                >
                                                    <X size={18} />
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                {/* Botones normales de EDITAR y ELIMINAR */}
                                                <button 
                                                    onClick={() => startEdit(prod)} 
                                                    className="text-blue-400 bg-blue-400/10 p-2 hover:bg-blue-400 hover:text-white rounded-xl transition-all border border-blue-400/20"
                                                    title="Editar Precio y Estado"
                                                >
                                                    <Edit3 size={18} />
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(prod.id, prod.tablaOriginal)} 
                                                    className="text-red-500 bg-red-500/10 p-2 hover:bg-red-500 hover:text-white rounded-xl transition-all border border-red-500/20"
                                                    title="Eliminar Producto"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </td>

                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};