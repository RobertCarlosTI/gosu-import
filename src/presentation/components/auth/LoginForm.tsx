"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Mail, Lock, LogIn, Loader2, Star, Box, CheckCircle } from 'lucide-react';
// 🚀 Usamos tu hook centralizado que ya maneja login con correo y Google
import { useAuth } from "../../hooks/useAuth";

export const LoginForm = () => {
    const { login, handleGoogleLogin, loading, error, success } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        login(email, password);
    };

    return (
        <div className="flex min-h-screen font-sans bg-white">
            
            {/* PANEL IZQUIERDO (Identidad Gosu) */}
            <div className="hidden lg:flex w-[45%] bg-[#070b12] text-white p-12 flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#22c55e]/5 rounded-full blur-[120px] pointer-events-none"></div>

                <div>
                    <Link href="/" className="flex items-center gap-2 group cursor-pointer w-fit text-white">
                        <div className="w-10 h-10 bg-[#22c55e] rounded-lg flex items-center justify-center text-[#070b12]">
                            <Box size={24} />
                        </div>
                        <span className="text-xl font-black italic tracking-widest uppercase">GOSU IMPORT</span>
                    </Link>

                    <div className="mt-32">
                        <h1 className="text-5xl font-black leading-tight mb-6 tracking-tighter italic">
                            Bienvenido de <span className="text-[#22c55e]">vuelta</span>
                        </h1>
                        <p className="text-slate-400 text-lg mb-12 italic leading-relaxed max-w-md">
                            Ingresa a tu cuenta para rastrear tus paquetes y acceder al catálogo exclusivo de importación.
                        </p>

                        <div className="space-y-6 max-w-sm">
                            <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-sm">
                                <Star className="text-amber-400" size={24} />
                                <div>
                                    <h3 className="font-bold text-sm uppercase italic">Acceso Preferencial</h3>
                                    <p className="text-xs text-slate-500">Tus cotizaciones guardadas en un solo lugar.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 border-t border-white/10 pt-8 mt-12 italic">
                    Gosu Import • International Logistics
                </div>
            </div>

            {/* PANEL DERECHO (LOGIN) */}
            <div className="w-full lg:w-[55%] flex flex-col p-8 md:p-16 relative bg-white">
                <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-[#070b12] transition-colors w-fit font-black text-xs uppercase italic mb-12">
                    <ChevronLeft size={18} /> Volver al Inicio
                </Link>

                <div className="max-w-md w-full mx-auto my-auto">
                    <div className="text-center mb-10">
                        <h2 className="text-4xl font-black text-[#070b12] tracking-tighter mb-2 italic uppercase">Iniciar Sesión</h2>
                        <p className="text-slate-500 font-bold text-sm italic uppercase">Accede a tu casillero gratuito</p>
                    </div>

                    {/* 🌈 BOTÓN DE GOOGLE (Diseño Mejorado) */}
                    <button 
                        type="button"
                        onClick={handleGoogleLogin}
                        className="w-full border border-slate-200 rounded-xl py-3.5 flex items-center justify-center gap-3 font-bold text-slate-700 bg-white hover:bg-slate-50 hover:shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all duration-300 mb-8 shadow-sm"
                    >
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                        Continuar con Google
                    </button>

                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-px bg-slate-200 flex-1"></div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">O USA TU CORREO</span>
                        <div className="h-px bg-slate-200 flex-1"></div>
                    </div>

                    {/* ALERTAS */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-xs font-black uppercase text-center animate-in fade-in">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="mb-6 p-4 bg-green-50 border border-green-100 text-green-700 rounded-xl text-xs font-black uppercase text-center flex items-center justify-center gap-2">
                            <CheckCircle size={18} /> ¡Bienvenido, redireccionando!
                        </div>
                    )}

                    {/* FORMULARIO DE CORREO */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 italic">Email</label>
                            <div className="relative group">
                                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#22c55e] transition-colors" />
                                <input 
                                    type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                                    placeholder="tu@correo.com"
                                    className="w-full border border-slate-200 rounded-xl py-4 pl-12 pr-4 text-[#070b12] font-bold focus:border-[#22c55e] outline-none transition-all placeholder:text-slate-300 placeholder:font-normal placeholder:italic"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <div className="flex justify-between items-center">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 italic">Contraseña</label>
                                <button type="button" className="text-[10px] font-bold text-slate-400 hover:text-[#22c55e] uppercase italic transition-colors">¿Olvidaste tu clave?</button>
                            </div>
                            <div className="relative group">
                                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#22c55e] transition-colors" />
                                <input 
                                    type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full border border-slate-200 rounded-xl py-4 pl-12 pr-4 text-[#070b12] font-bold focus:border-[#22c55e] outline-none transition-all placeholder:text-slate-300 placeholder:font-normal placeholder:italic"
                                />
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full bg-[#070b12] text-white py-4 rounded-xl font-black uppercase tracking-widest hover:bg-[#22c55e] hover:text-[#070b12] transition-all shadow-[0_10px_30px_rgba(0,0,0,0.1)] hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
                        >
                            {loading ? <Loader2 className="animate-spin" size={20} /> : <><LogIn size={18} /> INGRESAR AHORA</>}
                        </button>
                    </form>

                    <p className="text-center text-sm font-bold text-slate-500 mt-10 italic uppercase tracking-tighter">
                        ¿Nuevo en Gosu? <Link href="/register" className="text-[#22c55e] hover:underline ml-1">Crea tu cuenta aquí</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};