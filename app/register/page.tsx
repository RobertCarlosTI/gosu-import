"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft, User, Mail, Phone, Lock, Clock, ShieldCheck, Box, CheckCircle } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// --- CONEXIÓN A SUPABASE ---
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://scpmnmgdvfdbpuyeiawn.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjcG1ubWdkdmZkYnB1eWVpYXduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU3MjEzNTAsImV4cCI6MjA5MTI5NzM1MH0.VAya1_yOql9DjgPavjhk9nO7tLxUnaokHOwKisBB1eU';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function RegisterPage() {
    const router = useRouter();
    
    // Estados para guardar lo que el usuario escribe
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    
    // Estados para controlar la carga y errores
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    // FUNCIÓN PARA LOGIN CON GOOGLE
    const handleGoogleLogin = async () => {
        setError('');
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    // Esto redirige al catálogo después de que Google aprueba
                    redirectTo: `${window.location.origin}/catalogo`, 
                }
            });
            if (error) throw error;
        } catch (err: any) {
            setError(err.message || 'Error al conectar con Google.');
        }
    };

    // FUNCIÓN PRINCIPAL DE REGISTRO CON CORREO
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault(); // Evita que la página recargue
        setLoading(true);
        setError('');

        try {
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: {
                        full_name: name,
                        phone: phone,
                    }
                }
            });

            if (error) throw error;

            // Si todo sale bien, mostramos éxito y redirigimos al catálogo
            setSuccess(true);
            setTimeout(() => {
                router.push('/catalogo');
            }, 2000);

        } catch (err: any) {
            setError(err.message || 'Ocurrió un error al registrarse.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen font-sans bg-white">
            
            {/* PANEL IZQUIERDO (MARKETING) */}
            <div className="hidden lg:flex w-[45%] bg-[#070b12] text-white p-12 flex-col justify-between relative overflow-hidden">
                {/* Fondo sutil */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#22c55e]/5 rounded-full blur-[120px] pointer-events-none"></div>

                <div>
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group cursor-pointer w-fit">
                        <div className="w-10 h-10 bg-[#22c55e] rounded-lg flex items-center justify-center">
                            <Box size={24} className="text-[#070b12]" />
                        </div>
                        <span className="text-xl font-black italic tracking-widest uppercase">GOSU IMPORT</span>
                    </Link>

                    <div className="mt-32">
                        <h1 className="text-5xl font-black leading-tight mb-6 tracking-tighter">
                            Tu casillero en Miami <span className="text-[#22c55e]">listo en segundos</span>
                        </h1>
                        <p className="text-slate-400 text-lg mb-12">
                            Regístrate hoy y obtén tu dirección propia en USA para comprar en Amazon, eBay y más.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-5 rounded-2xl">
                                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-[#22c55e] shrink-0">
                                    <Clock size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm">Registro Instantáneo</h3>
                                    <p className="text-xs text-slate-400">Tu dirección de casillero al momento</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-5 rounded-2xl">
                                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-[#22c55e] shrink-0">
                                    <ShieldCheck size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm">Seguridad Gosu</h3>
                                    <p className="text-xs text-slate-400">Tus datos y paquetes protegidos</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-slate-500 border-t border-white/10 pt-8 mt-12">
                    <div>
                        <p className="text-[#22c55e] text-xl font-black">100%</p>
                        <p>GRATIS</p>
                    </div>
                    <div>
                        <p className="text-[#22c55e] text-xl font-black">24/7</p>
                        <p>SOPORTE</p>
                    </div>
                    <div>
                        <p className="text-[#22c55e] text-xl font-black">Lima/Prov</p>
                        <p>ENVÍOS</p>
                    </div>
                </div>
            </div>

            {/* PANEL DERECHO (FORMULARIO) */}
            <div className="w-full lg:w-[55%] flex flex-col p-8 md:p-16 relative">
                <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors w-fit font-semibold text-sm mb-12">
                    <ChevronLeft size={20} /> Volver
                </Link>

                <div className="max-w-md w-full mx-auto my-auto">
                    <div className="text-center mb-10">
                        <h2 className="text-4xl font-black text-[#070b12] tracking-tighter mb-2">Crea tu cuenta</h2>
                        <p className="text-slate-500 font-medium text-sm">Completa tus datos para abrir tu casillero gratuito</p>
                    </div>

                    <button 
                        type="button"
                        onClick={handleGoogleLogin}
                        className="w-full border border-slate-200 rounded-xl py-3.5 flex items-center justify-center gap-3 font-bold text-slate-700 bg-white hover:bg-slate-50 hover:shadow-lg hover:-translate-y-1 hover:border-slate-300 active:scale-95 active:shadow-sm transition-all duration-300 mb-8"
                    >
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                        Registrarse con Google
                    </button>

                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-px bg-slate-200 flex-1"></div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">O USA TU CORREO</span>
                        <div className="h-px bg-slate-200 flex-1"></div>
                    </div>

                    {/* MENSAJES DE ERROR O ÉXITO */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-semibold text-center">
                            {error === 'User already registered' ? 'Este correo ya tiene una cuenta.' : error}
                        </div>
                    )}
                    {success && (
                        <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl text-sm font-semibold text-center flex items-center justify-center gap-2">
                            <CheckCircle size={18} /> ¡Cuenta creada! Entrando al catálogo...
                        </div>
                    )}

                    <form onSubmit={handleRegister} className="space-y-5">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">NOMBRE COMPLETO</label>
                            <div className="relative">
                                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input 
                                    type="text" 
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Ej. Robert Pacheco"
                                    className="w-full border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 text-slate-700 font-semibold focus:border-[#22c55e] focus:ring-2 focus:ring-[#22c55e]/20 outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">CORREO ELECTRÓNICO</label>
                            <div className="relative">
                                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input 
                                    type="email" 
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="tu@correo.com"
                                    className="w-full border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 text-slate-700 font-semibold focus:border-[#22c55e] focus:ring-2 focus:ring-[#22c55e]/20 outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">WHATSAPP / CELULAR</label>
                            <div className="relative">
                                <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input 
                                    type="tel" 
                                    required
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="987 654 321"
                                    className="w-full border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 text-slate-700 font-semibold focus:border-[#22c55e] focus:ring-2 focus:ring-[#22c55e]/20 outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">CONTRASEÑA</label>
                            <div className="relative">
                                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input 
                                    type="password" 
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 text-slate-700 font-semibold focus:border-[#22c55e] focus:ring-2 focus:ring-[#22c55e]/20 outline-none transition-all"
                                />
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full bg-[#22c55e] text-[#070b12] py-4 rounded-xl font-black uppercase tracking-widest hover:bg-[#1ea950] transition-all shadow-[0_10px_20px_rgba(34,197,94,0.2)] hover:-translate-y-1 mt-4 disabled:opacity-50"
                        >
                            {loading ? 'CREANDO CUENTA...' : 'CREAR MI CASILLERO'}
                        </button>
                    </form>

                    <p className="text-center text-sm font-medium text-slate-500 mt-8">
                        ¿Ya tienes una cuenta? <Link href="/login" className="text-[#22c55e] hover:underline font-bold">Inicia sesión aquí</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}