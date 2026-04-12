import { useState, useEffect } from 'react';
import { supabase } from '@/src/infrastructure/database/supabaseClient';
import { adminRepository } from '@/src/infrastructure/database/adminRepository';

export const useAdmin = () => {
    const [view, setView] = useState<string>('dashboard');
    const [loading, setLoading] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [productos, setProductos] = useState<any[]>([]);
    const [usuarios, setUsuarios] = useState<any[]>([]);
    const [importConfig, setImportConfig] = useState({ fechaInicio: '', fechaCierre: '', estado: '' });

    const checkAdmin = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user?.email === 'gosu.import01@gmail.com') setIsAdmin(true);
    };

    const refreshData = async () => {
        const [inv, users, cfg] = await Promise.all([
            adminRepository.getFullInventory(),
            adminRepository.getAllUsers(),
            adminRepository.getImportConfig()
        ]);
        setProductos(inv);
        setUsuarios(users);
        if (cfg.data) {
            setImportConfig({
                fechaInicio: cfg.data.fecha_inicio?.split('.')[0] || '',
                fechaCierre: cfg.data.fecha_cierre?.split('.')[0] || '',
                estado: cfg.data.estado_importacion
            });
        }
    };

    useEffect(() => {
        checkAdmin();
        refreshData();
    }, []);

    return {
        view, setView, loading, isAdmin, productos, usuarios, importConfig,
        setImportConfig, refreshData, setLoading
    };
};