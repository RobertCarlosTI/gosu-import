import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/src/infrastructure/database/supabaseClient';
import { productRepository } from '@/src/infrastructure/database/productRepository';
import { joinConsolidatedOrder } from '@/src/application/use-cases/JoinConsolidatedOrder';

export const useCatalogo = () => {
    const router = useRouter();
    const [productos, setProductos] = useState<any[]>([]);
    const [perfumes, setPerfumes] = useState<any[]>([]);
    const [iphones, setIphones] = useState<any[]>([]);
    const [config, setConfig] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [carrito, setCarrito] = useState<{ [id: string]: number }>({});
    const [userRole, setUserRole] = useState<'normal' | 'vip'>('normal');
    const [categoriaActiva, setCategoriaActiva] = useState('Perfumería');
    const [timeLeft, setTimeLeft] = useState({ dias: 0, horas: 0, min: 0, seg: 0 });

    useEffect(() => {
        const loadData = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                const { data: profile } = await supabase.from('profiles').select('role').eq('id', session.user.id).single();
                if (profile) setUserRole(profile.role);
            }

            const data = await productRepository.getAllProducts();
            setPerfumes(data.perfumes);
            setIphones(data.iphones);
            setConfig(data.config);
            setLoading(false);
        };
        loadData();
    }, []);

    // Lógica del Timer
    useEffect(() => {
        if (!config?.fecha_cierre) return;
        const timer = setInterval(() => {
            const ahora = new Date().getTime();
            const cierre = new Date(config.fecha_cierre).getTime();
            const dif = cierre - ahora;
            if (dif <= 0) {
                clearInterval(timer);
                setTimeLeft({ dias: 0, horas: 0, min: 0, seg: 0 });
            } else {
                setTimeLeft({
                    dias: Math.floor(dif / (1000 * 60 * 60 * 24)),
                    horas: Math.floor((dif % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    min: Math.floor((dif % (1000 * 60 * 60)) / (1000 * 60)),
                    seg: Math.floor((dif % (1000 * 60)) / 1000)
                });
            }
        }, 1000);
        return () => clearInterval(timer);
    }, [config]);

    const isClosed = new Date().getTime() > new Date(config?.fecha_cierre).getTime();

    const handleAdd = (id: string) => {
        if (isClosed) return alert("La importación ya cerró.");
        setCarrito(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    };

    const handleRemove = (id: string) => {
        setCarrito(prev => {
            const actual = prev[id] || 0;
            if (actual <= 1) { const newC = { ...prev }; delete newC[id]; return newC; }
            return { ...prev, [id]: actual - 1 };
        });
    };

    const totalPrecio = [...perfumes, ...iphones].reduce((acc, p) => acc + ((p.price || 0) * (carrito[p.id] || 0)), 0);
    const totalItems = Object.values(carrito).reduce((acc, val) => acc + val, 0);
    const totalPerfumes = perfumes.reduce((acc, p) => acc + (carrito[p.id] || 0), 0);
    const minPerfumes = userRole === 'vip' ? 1 : 6;
    const canCheckout = totalPerfumes === 0 || totalPerfumes >= minPerfumes;

    const handleFinalizar = async () => {
        setSubmitting(true);
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) return alert("Inicia sesión");

        try {
            const perfumesEnCarrito = perfumes.filter(p => carrito[p.id] > 0).map(p => ({
                ...p,
                cantidad: carrito[p.id]
            }));

            await joinConsolidatedOrder(session.user.id, {
                totalPerfumes,
                totalPrecio,
                perfumesEnCarrito
            });
            router.push('/mi-orden');
        } catch (e: any) { alert(e.message); }
        finally { setSubmitting(false); }
    };

    return {
        productos: categoriaActiva === 'Perfumería' ? perfumes : iphones,
        carrito, config, timeLeft, loading, submitting, isClosed,
        totalItems, totalPrecio, canCheckout, minPerfumes, totalPerfumes,
        setCategoriaActiva, categoriaActiva, handleAdd, handleRemove, handleFinalizar
    };
};