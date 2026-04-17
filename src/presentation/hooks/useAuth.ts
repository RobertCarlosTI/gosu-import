import { useState } from 'react';

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    // --- FUNCIÓN DE REGISTRO ---
    const register = async (email: string, password: string, name: string, phone: string) => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, name, phone }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Error al registrar');

            setSuccess(true);
            setTimeout(() => window.location.href = '/login', 2000);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // --- FUNCIÓN DE LOGIN ---
    const login = async (email: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Error al iniciar sesión');

            // Guardamos sesión en el navegador
            localStorage.setItem('gosu_user', JSON.stringify(data.user));
            
            // Redirigir al inicio
            window.location.href = '/';
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        console.log("Próximamente: Google Auth");
    };

    // --- RETORNO ÚNICO ---
    // Al ponerlos aquí, TypeScript garantiza que existen en el LoginForm y RegisterForm
    return { 
        register, 
        login, 
        handleGoogleLogin, 
        loading, 
        error, 
        success 
    };
};