"use client";

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { LogOut, LayoutGrid, ShieldCheck, Calculator, Star, UserPlus, Package } from 'lucide-react';
// 🚀 Usamos tu cliente centralizado para consistencia total
import { supabase } from '@/src/infrastructure/database/supabaseClient';

export default function Navbar() {
  const paginaActual = usePathname();
  const [user, setUser] = useState<any>(null);
  const [isVIP, setIsVIP] = useState(false);

  useEffect(() => {
    // 1. Verificar sesión inicial
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      if (session?.user) checkVipStatus(session.user.id);
    };

    getInitialSession();

    // 2. Escuchar cambios de autenticación en tiempo real
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      if (session?.user) {
        checkVipStatus(session.user.id);
      } else {
        setIsVIP(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Función para verificar el rol VIP en la base de datos
  const checkVipStatus = async (userId: string) => {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .single();
    
    if (profile?.role === 'vip') setIsVIP(true);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  // --- LÓGICA DE SEGURIDAD GOSU ---
  const esAdmin = user?.email === 'gosu.import01@gmail.com';

  // 🚀 ACTUALIZADO: Ocultamos el navbar en tus rutas reales de auth
  const paginasOcultas = ["/login", "/register"];
  if (paginasOcultas.includes(paginaActual)) return null;

  return (
    <nav className="fixed top-0 w-full z-[110] bg-[#070b12]/90 backdrop-blur-xl border-b border-white/5 h-20">
      <div className="max-w-[1440px] mx-auto px-6 h-full flex justify-between items-center">
        
        {/* LOGO GOSU */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <span className="text-[#22c55e] text-5xl font-black italic transform group-hover:scale-105 transition-transform leading-none">G</span>
          <div className="flex flex-col justify-center">
            <span className="text-2xl font-black text-white leading-none tracking-tight">GOSU</span>
            <span className="text-[10px] font-medium text-white tracking-[0.3em] mt-1 leading-none uppercase">IMPORT</span>
          </div>
        </Link>

        {/* MENÚ CENTRAL - Desktop */}
        <div className="hidden lg:flex items-center gap-8 text-[11px] font-black text-slate-400 uppercase italic tracking-wider">
          <Link href="/#servicios" className="hover:text-[#22c55e] transition-colors">Servicios</Link>
          <Link href="/calculadora" className={`flex items-center gap-1.5 ${paginaActual === '/calculadora' ? 'text-[#22c55e]' : 'hover:text-[#22c55e]'}`}>
            <Calculator size={14} /> Calculadora
          </Link>
          <Link href="/catalogo" className={`flex items-center gap-1.5 ${paginaActual === '/catalogo' ? 'text-[#22c55e]' : 'hover:text-[#22c55e]'}`}>
            <LayoutGrid size={14} /> Catálogo
          </Link>
          <Link href="/vip" className={`flex items-center gap-1.5 ${paginaActual === '/vip' ? 'text-amber-400' : 'hover:text-amber-400'}`}>
            <Star size={14} /> Club VIP
          </Link>
        </div>

        {/* SECCIÓN DERECHA - DINÁMICA */}
        <div className="flex items-center gap-3 md:gap-5 shrink-0">
          {user ? (
            <>
              {esAdmin ? (
                <Link 
                  href="/admin" 
                  className="flex items-center gap-2 text-amber-400 font-black italic text-[10px] md:text-[11px] uppercase hover:text-white transition-all bg-amber-400/10 px-3 md:px-4 py-2.5 rounded-xl border border-amber-400/20 shadow-[0_0_20px_rgba(245,158,11,0.1)]"
                >
                  <ShieldCheck size={16} className="hidden xs:block" /> Panel Admin
                </Link>
              ) : (
                <Link 
                  href="/mi-orden" 
                  className={`flex items-center gap-2 font-black italic text-[10px] md:text-[11px] uppercase transition-all px-3 md:px-4 py-2.5 rounded-xl border ${
                    isVIP 
                    ? 'text-amber-400 bg-amber-400/10 border-amber-400/40 shadow-[0_0_20px_rgba(251,191,36,0.2)]' 
                    : 'text-slate-300 bg-white/5 border-white/10'
                  } hover:text-white`}
                >
                  <Package size={16} className="hidden xs:block" /> 
                  {isVIP ? 'VIP Orden' : 'Mi Orden'}
                </Link>
              )}

              <button 
                onClick={handleLogout}
                className="px-4 py-2.5 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl font-black text-[10px] uppercase italic hover:bg-red-500 hover:text-white transition-all flex items-center gap-2 group"
              >
                <LogOut size={14} className="group-hover:translate-x-1 transition-transform" /> 
                <span className="hidden sm:inline">Salir</span>
              </button>
            </>
          ) : (
            <div className="flex items-center gap-4">
              {/* 🚀 RUTAS CORREGIDAS: /login y /register directamente */}
              <Link href="/login" className="hidden md:block text-slate-400 font-bold hover:text-white transition-colors text-[11px] uppercase italic">
                Iniciar Sesión
              </Link>
              <Link href="/register" className="px-6 py-3 bg-[#22c55e] text-[#0b1118] rounded-xl font-black text-[11px] uppercase italic hover:bg-[#1ea950] transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:scale-105 flex items-center gap-2">
                <UserPlus size={14} /> Registrarse
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}