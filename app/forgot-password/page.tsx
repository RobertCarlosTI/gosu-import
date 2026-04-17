"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, ChevronLeft, Send, Loader2 } from 'lucide-react';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const response = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                body: JSON.stringify({ email }),
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                setSent(true);
            }
        } catch (err) {
            console.error("Error enviando correo");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#070b12] flex items-center justify-center p-6">
            <div className="max-w-md w-full bg-white rounded-3xl p-10 shadow-2xl">
                <Link href="/login" className="flex items-center gap-2 text-slate-400 hover:text-slate-900 mb-8 font-black text-[10px] uppercase italic">
                    <ChevronLeft size={16} /> Volver al Login
                </Link>
                
                {!sent ? (
                    <>
                        <h2 className="text-3xl font-black text-[#070b12] italic uppercase mb-2 italic">¿Olvidaste tu clave?</h2>
                        <p className="text-slate-500 text-[10px] font-bold mb-8 uppercase italic tracking-tighter">Ingresa tu email de Gosu Import para recuperarla.</p>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="relative">
                                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input 
                                    type="email" 
                                    required 
                                    placeholder="tu@correo.com" 
                                    className="w-full border border-slate-200 rounded-xl py-4 pl-12 pr-4 text-slate-700 font-bold focus:border-[#22c55e] outline-none transition-all"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <button className="w-full bg-[#070b12] text-white py-4 rounded-xl font-black uppercase italic tracking-widest hover:bg-[#22c55e] hover:text-[#070b12] transition-all flex items-center justify-center gap-2 shadow-xl active:scale-95">
                                {loading ? <Loader2 className="animate-spin" /> : <><Send size={18} /> ENVIAR ACCESO</>}
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="text-center py-8">
                        <div className="w-20 h-20 bg-green-100 text-[#22c55e] rounded-full flex items-center justify-center mx-auto mb-6">
                            <Send size={40} />
                        </div>
                        <h3 className="text-2xl font-black text-[#070b12] italic uppercase mb-2">¡Revisa tu correo!</h3>
                        <p className="text-slate-500 text-xs font-bold uppercase italic tracking-tighter">Hemos enviado las instrucciones a:<br/><span className="text-[#070b12]">{email}</span></p>
                    </div>
                )}
            </div>
        </div>
    );
}