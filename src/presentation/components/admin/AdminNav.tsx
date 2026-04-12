"use client";
import React from 'react';
import { LayoutDashboard, ShoppingCart, PlusCircle, Package, Truck, Users } from 'lucide-react';

export const AdminNav = ({ currentView, setView }: any) => {
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'ordenes', label: 'Órdenes', icon: ShoppingCart },
        { id: 'registrar', label: 'Registrar', icon: PlusCircle },
        { id: 'inventario', label: 'Inventario', icon: Package },
        { id: 'importacion', label: 'Importación', icon: Truck },
        { id: 'clientes', label: 'Gestión VIP', icon: Users },
    ];

    return (
        <div className="flex flex-wrap gap-4 mb-12">
            {menuItems.map((item) => (
                <button
                    key={item.id}
                    onClick={() => setView(item.id)}
                    className={`flex items-center gap-3 px-8 py-5 rounded-2xl font-black uppercase italic text-xs transition-all border-2 ${
                        currentView === item.id 
                        ? 'bg-amber-400 border-amber-400 text-black shadow-[0_0_25px_rgba(251,191,36,0.3)] scale-105' 
                        : 'bg-[#161b22] border-white/5 text-slate-400 hover:text-white'
                    }`}
                >
                    <item.icon size={18} />
                    {item.label}
                </button>
            ))}
        </div>
    );
};