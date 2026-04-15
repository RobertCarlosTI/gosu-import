import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/src/infrastructure/database/supabaseClient';

export const useAuth = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const login = async (email: string, pass: string) => {
        setLoading(true);
        setError('');
        try {
            const { error } = await supabase.auth.signInWithPassword({ email, password: pass });
            if (error) throw error;
            setSuccess(true);
            setTimeout(() => router.push('/catalogo'), 1500);
        } catch (err: any) {
            setError(err.message || 'Credenciales incorrectas');
        } finally {
            setLoading(false);
        }
    };

    const register = async (email: string, pass: string, name: string, phone: string) => {
        setLoading(true);
        setError('');
        try {
            const { error } = await supabase.auth.signUp({
                email,
                password: pass,
                options: { 
                    data: { full_name: name, phone },
                    emailRedirectTo: `${window.location.origin}/catalogo` 
                }
            });
            if (error) throw error;
            setSuccess(true);
            setTimeout(() => router.push('/catalogo'), 2000);
        } catch (err: any) {
            setError(err.message || 'Error al registrarse');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: { redirectTo: `${window.location.origin}/catalogo` }
            });
            if (error) throw error;
        } catch (err: any) {
            setError(err.message || 'Error al conectar con Google.');
        }
    };

    return { login, register, handleGoogleLogin, loading, error, success };
};