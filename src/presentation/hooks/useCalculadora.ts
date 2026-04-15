"use client";
import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/src/infrastructure/database/supabaseClient';

export const useCalculadora = () => {
    // 🚩 ESTADOS DE NAVEGACIÓN (Faltaban estos para el MethodSelector)
    const [method, setMethodState] = useState<'viajero' | 'courier'>('viajero');
    const [vCategory, setVCategory] = useState<string>('iPhone');
    
    // ESTADOS DE DATOS
    const [iphoneCatalog, setIphoneCatalog] = useState<any[]>([]);
    const [loadingCatalog, setLoadingCatalog] = useState(true);
    const [vModel, setVModel] = useState<any>(null);
    
    // ESTADOS DE FORMULARIO
    const [vValue, setVValue] = useState<string>('');
    const [clientType, setClientType] = useState<'vip' | 'normal'>('normal');

    // 🚀 Carga desde Supabase
    useEffect(() => {
        const fetchData = async () => {
            setLoadingCatalog(true);
            const { data, error } = await supabase
                .from('productos_gosu')
                .select('*')
                .eq('categoria', vCategory)
                .order('precio_normal', { ascending: true });

            if (!error && data) {
                setIphoneCatalog(data);
                setVModel(data.length > 0 ? data[0] : null);
            } else {
                console.error("Error de Supabase:", error);
                setIphoneCatalog([]);
            }
            setLoadingCatalog(false);
        };
        fetchData();
    }, [vCategory]);

    const fob = Number(vValue) || 0;

    // 🧮 Lógica de cálculo
    const { fleteViajero, totalGlobal } = useMemo(() => {
        if (!vModel) return { fleteViajero: 0, totalGlobal: 0 };
        
        const flete = clientType === 'vip' 
            ? Number(vModel.precio_vip) 
            : Number(vModel.precio_normal);

        return { fleteViajero: flete, totalGlobal: fob + flete };
    }, [vModel, clientType, fob]);

    // Función para manejar el cambio de método sin romper el componente
    const handleMethodChange = (m: 'viajero' | 'courier') => {
        setMethodState(m);
    };

    return {
        // 🚩 Retornamos 'method' y 'setMethod' para que MethodSelector no de error
        method,
        setMethod: handleMethodChange,
        
        vCategory, 
        setVCategory,
        vModel, 
        setVModel,
        vValue, 
        setVValue,
        displayTravelerTotal: fleteViajero,
        totalGlobal,
        iphoneCatalog, 
        loadingCatalog,
        clientType, 
        setClientType,
        handleCalcularViajero: () => { if(fob >= 200) alert("¡Cotización Lista!"); }
    };
};