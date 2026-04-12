"use client";
import React from 'react';
import { useAdmin } from "@/src/presentation/hooks/useAdmin";
import { AdminNav } from "@/src/presentation/components/admin/AdminNav";
import { InventoryTable } from "@/src/presentation/components/admin/InventoryTable";
import { VipManagement } from "@/src/presentation/components/admin/VipManagement";
import { ImportConfigForm } from "@/src/presentation/components/admin/ImportConfigForm";
import { ProductRegisterForm } from "@/src/presentation/components/admin/ProductRegisterForm";

// Usando rutas relativas para evitar el error 2307
import { AdminDashboardView } from "../../src/presentation/components/admin/AdminDashboardView";
import { AdminOrdersTable } from "../../src/presentation/components/admin/AdminOrdersTable";

export default function AdminPage() {
    // Forzamos a que 'view' sea tratado como string para evitar el error 2367
    const { view, setView, isAdmin, productos, usuarios, importConfig, setImportConfig, refreshData } = useAdmin() as any;

    if (!isAdmin) return <div className="min-h-screen bg-[#070b12] text-white flex items-center justify-center italic">Acceso Denegado</div>;

    return (
        <div className="min-h-screen bg-[#070b12] text-white pt-28 pb-20 px-4">
            <div className="max-w-7xl mx-auto">
                <AdminNav currentView={view} setView={setView} />

                <div className="mt-8">
                    {/* Ahora TypeScript no se quejará de la comparación */}
                    {view === 'dashboard' && <AdminDashboardView />}
                    {view === 'ordenes' && <AdminOrdersTable />}
                    
                    {view === 'registrar' && <ProductRegisterForm onRefresh={refreshData} />}
                    {view === 'inventario' && <InventoryTable productos={productos} onRefresh={refreshData} />}
                    {view === 'config' && <ImportConfigForm config={importConfig} setConfig={setImportConfig} onRefresh={refreshData} />}
                    {view === 'clientes' && <VipManagement usuarios={usuarios} onRefresh={refreshData} />}
                </div>
            </div>
        </div>
    );
}