"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, User, Mail, Phone, Lock, Clock, ShieldCheck, Box, CheckCircle, Loader2 } from 'lucide-react';
import { useAuth } from "../../hooks/useAuth";

export const RegisterForm = () => {
    const { register, handleGoogleLogin, loading, error, success } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        register(email, password, name, phone);
    };

    return (
        <div className="flex min-h-screen font-sans bg-white">
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
                        <h1 className="text-5xl font-black leading-tight mb-6 tracking-tighter italic">Tu casillero en Miami <span className="text-[#22c55e]">listo en segundos</span></h1>
                        <div className="space-y-6">
                            <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-sm">
                                <Clock className="text-[#22c55e]" size={24} />
                                <div><h3 className="font-bold text-sm uppercase italic">Registro Instantáneo</h3><p className="text-xs text-slate-500 font-medium">Tu dirección propia al momento</p></div>
                            </div>
                            <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-sm">
                                <ShieldCheck className="text-[#22c55e]" size={24} />
                                <div><h3 className="font-bold text-sm uppercase italic">Seguridad Gosu</h3><p className="text-xs text-slate-500 font-medium">Tus datos y paquetes 100% protegidos</p></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-500 border-t border-white/10 pt-8 mt-12 italic">
                    <div><p className="text-[#22c55e] text-xl italic font-black">100%</p><p>GRATIS</p></div>
                    <div><p className="text-[#22c55e] text-xl italic font-black">24/7</p><p>SOPORTE</p></div>
                    <div><p className="text-[#22c55e] text-xl italic font-black">Lima/Prov</p><p>ENVÍOS</p></div>
                </div>
            </div>

            <div className="w-full lg:w-[55%] flex flex-col p-8 md:p-16 relative bg-white">
                <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors w-fit font-black text-xs uppercase italic mb-12"><ChevronLeft size={18} /> Volver</Link>
                <div className="max-w-md w-full mx-auto my-auto">
                    <div className="text-center mb-10"><h2 className="text-4xl font-black text-[#070b12] tracking-tighter mb-2 italic uppercase">Crea tu cuenta</h2><p className="text-slate-500 font-bold text-sm italic uppercase tracking-tighter">Tu casillero premium de importación</p></div>
                    <button onClick={handleGoogleLogin} type="button" className="w-full border border-slate-200 rounded-xl py-3.5 flex items-center justify-center gap-3 font-bold text-slate-700 bg-white hover:bg-slate-50 hover:shadow-lg transition-all mb-8 active:scale-95"><img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" /> Registrarse con Google</button>
                    <div className="flex items-center gap-4 mb-8"><div className="h-px bg-slate-200 flex-1"></div><span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">O USA TU CORREO</span><div className="h-px bg-slate-200 flex-1"></div></div>
                    {error && <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-black uppercase text-center">{error}</div>}
                    {success && <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl text-xs font-black uppercase text-center flex items-center justify-center gap-2"><CheckCircle size={18} /> Cuenta Creada</div>}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-1.5"><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 italic">Nombre Completo</label><div className="relative"><User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" /><input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Ej. Robert Pacheco" className="w-full border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 text-slate-700 font-bold focus:border-[#22c55e] outline-none transition-all placeholder:text-slate-300 placeholder:font-normal placeholder:italic" /></div></div>
                        <div className="space-y-1.5"><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 italic">Email</label><div className="relative"><Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" /><input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@correo.com" className="w-full border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 text-slate-700 font-bold focus:border-[#22c55e] outline-none transition-all placeholder:text-slate-300 placeholder:font-normal placeholder:italic" /></div></div>
                        <div className="space-y-1.5"><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 italic">WhatsApp</label><div className="relative"><Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" /><input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="987 654 321" className="w-full border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 text-slate-700 font-bold focus:border-[#22c55e] outline-none transition-all placeholder:text-slate-300 placeholder:font-normal placeholder:italic" /></div></div>
                        <div className="space-y-1.5"><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 italic">Password</label><div className="relative"><Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" /><input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 text-slate-700 font-bold focus:border-[#22c55e] outline-none transition-all placeholder:text-slate-300 placeholder:font-normal placeholder:italic" /></div></div>
                        <button type="submit" disabled={loading} className="w-full bg-[#070b12] text-white py-4 rounded-xl font-black uppercase tracking-widest hover:bg-[#1ea950] hover:text-[#070b12] transition-all shadow-xl mt-4 active:scale-95 flex items-center justify-center gap-2">{loading ? <Loader2 className="animate-spin" /> : 'UNIRME AHORA'}</button>
                    </form>
                    <p className="text-center text-sm font-bold text-slate-500 mt-8 italic uppercase tracking-tighter">¿Ya tienes cuenta? <Link href="/login" className="text-[#22c55e] hover:underline ml-1">Inicia sesión</Link></p>
                </div>
            </div>
        </div>
    );
};