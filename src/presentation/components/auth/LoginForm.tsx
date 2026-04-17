"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Mail, Lock, Loader2, Box, LogIn, ShieldCheck } from 'lucide-react';
import { useAuth } from "../../hooks/useAuth";

export const LoginForm = () => {
    const { login, loading, error } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        login(email, password);
    };

    return (
        <div className="flex min-h-screen font-sans bg-white">
            {/* LADO IZQUIERDO - BRANDING (Similar al Register para consistencia) */}
            <div className="hidden lg:flex w-[45%] bg-[#070b12] text-white p-12 flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#22c55e]/5 rounded-full blur-[120px] pointer-events-none"></div>
                <div>
                    <Link href="/" className="flex items-center gap-2 group cursor-pointer w-fit text-white">
                        <div className="w-10 h-10 bg-[#22c55e] rounded-lg flex items-center justify-center text-[#070b12]">
                            <Box size={24} />
                        </div>
                        <span className="text-xl font-black italic tracking-widest uppercase leading-none">GOSU IMPORT</span>
                    </Link>
                    <div className="mt-32">
                        <h1 className="text-5xl font-black leading-tight mb-6 tracking-tighter italic">
                            Bienvenido de <span className="text-[#22c55e]">vuelta a Gosu</span>
                        </h1>
                        <p className="text-slate-400 font-medium max-w-sm mb-8 italic uppercase text-xs tracking-widest">
                            Gestiona tus importaciones, revisa tus tarifas VIP y rastrea tus paquetes en tiempo real.
                        </p>
                    </div>
                </div>
                <div className="border-t border-white/10 pt-8 mt-12">
                    <div className="flex items-center gap-3 text-[#22c55e]">
                        <ShieldCheck size={20} />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Acceso Seguro a Casillero</span>
                    </div>
                </div>
            </div>

            {/* LADO DERECHO - FORMULARIO */}
            <div className="w-full lg:w-[55%] flex flex-col p-8 md:p-16 relative bg-white">
                <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors w-fit font-black text-xs uppercase italic mb-12">
                    <ChevronLeft size={18} /> Volver
                </Link>
                
                <div className="max-w-md w-full mx-auto my-auto">
                    <div className="text-center mb-10">
                        <h2 className="text-4xl font-black text-[#070b12] tracking-tighter mb-2 italic uppercase">Iniciar Sesión</h2>
                        <p className="text-slate-500 font-bold text-sm italic uppercase tracking-tighter">Tu conexión directa con Miami</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-black uppercase text-center">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 italic">Email del Casillero</label>
                            <div className="relative">
                                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input 
                                    type="email" 
                                    required 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    placeholder="tu@correo.com" 
                                    className="w-full border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 text-slate-700 font-bold focus:border-[#22c55e] outline-none transition-all placeholder:text-slate-300 placeholder:font-normal placeholder:italic" 
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Contraseña</label>
                                <Link 
  href="/forgot-password" 
  className="text-[10px] font-black text-[#22c55e] uppercase italic hover:underline"
>
    ¿La olvidaste?
</Link>
                            </div>
                            <div className="relative">
                                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input 
                                    type="password" 
                                    required 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    placeholder="••••••••" 
                                    className="w-full border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 text-slate-700 font-bold focus:border-[#22c55e] outline-none transition-all placeholder:text-slate-300 placeholder:font-normal placeholder:italic" 
                                />
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading} 
                            className="w-full bg-[#070b12] text-white py-4 rounded-xl font-black uppercase tracking-widest hover:bg-[#22c55e] hover:text-[#070b12] transition-all shadow-xl mt-4 active:scale-95 flex items-center justify-center gap-2"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : <><LogIn size={18} /> INGRESAR A MI CUENTA</>}
                        </button>
                    </form>

                    <p className="text-center text-sm font-bold text-slate-500 mt-8 italic uppercase tracking-tighter">
                        ¿Aún no tienes casillero? <Link href="/register" className="text-[#22c55e] hover:underline ml-1">Regístrate gratis</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};