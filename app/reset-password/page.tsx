"use client";
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Lock, Loader2, CheckCircle } from 'lucide-react';

export default function ResetPasswordPage() {
    const searchParams = useSearchParams();
    const userId = searchParams.get('id'); // Sacamos el ID de la URL
    
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/auth/reset-password', {
                method: 'POST',
                body: JSON.stringify({ userId, newPassword: password }),
                headers: { 'Content-Type': 'application/json' }
            });

            if (res.ok) setSuccess(true);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#070b12] flex items-center justify-center p-6">
            <div className="max-w-md w-full bg-white rounded-3xl p-10 shadow-2xl text-center">
                {!success ? (
                    <>
                        <h2 className="text-3xl font-black text-[#070b12] italic uppercase mb-2 text-left">Nueva Contraseña</h2>
                        <p className="text-slate-500 text-xs font-bold mb-8 uppercase italic text-left">Asegura tu cuenta de Gosu Import.</p>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="relative">
                                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input 
                                    type="password" 
                                    required 
                                    placeholder="••••••••" 
                                    className="w-full border border-slate-200 rounded-xl py-4 pl-12 pr-4 text-slate-700 font-bold focus:border-[#22c55e] outline-none"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button className="w-full bg-[#070b12] text-white py-4 rounded-xl font-black uppercase italic hover:bg-[#22c55e] transition-all flex items-center justify-center gap-2">
                                {loading ? <Loader2 className="animate-spin" /> : "ACTUALIZAR CLAVE"}
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="py-8">
                        <CheckCircle size={60} className="text-[#22c55e] mx-auto mb-4" />
                        <h3 className="text-2xl font-black text-[#070b12] italic uppercase">¡Clave Cambiada!</h3>
                        <p className="text-slate-500 text-xs font-bold uppercase mb-8">Ya puedes iniciar sesión con tu nueva contraseña.</p>
                        <button onClick={() => window.location.href = '/login'} className="w-full bg-[#070b12] text-white py-4 rounded-xl font-black uppercase italic hover:bg-[#22c55e] transition-all">IR AL LOGIN</button>
                    </div>
                )}
            </div>
        </div>
    );
}