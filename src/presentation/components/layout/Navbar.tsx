"use client";

import Link from 'next/link';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { LogOut, LayoutGrid, ShieldCheck, Calculator, Star, Package, LogIn, UserPlus } from 'lucide-react';

export default function Navbar() {
  const paginaActual = usePathname();
  
  // Estados temporales. En el siguiente paso los conectaremos a tu nueva Auth local.
  const [user, setUser] = useState<any>(null);
  const [isVIP, setIsVIP] = useState(false);

  const handleLogout = () => {
    // Aquí luego limpiaremos la cookie o el token local
    setUser(null);
    window.location.href = '/';
  };

  const esAdmin = user?.email === 'gosu.import01@gmail.com';

  // No mostramos el navbar en las rutas de acceso
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

        {/* MENÚ CENTRAL */}
        <div className="hidden lg:flex items-center gap-8 text-[11px] font-black text-slate-400 uppercase italic tracking-wider">
          <Link href="/#servicios" className="hover:text-[#22c55e] transition-colors">Servicios</Link>
          <Link href="/calculadora" className={`flex items-center gap-1.5 ${paginaActual === '/calculadora' ? 'text-[#22c55e]' : 'hover:text-[#22c55e]'}`}>
            <Calculator size={14} /> Calculadora
          </Link>
          <Link href="/catalogo" className={`flex items-center gap-1.5 ${paginaActual === '/catalogo' ? 'text-[#22c55e]' : 'hover:text-[#22c55e]'}`}>
            <LayoutGrid size={14} /> Catálogo
          </Link>
          <Link href="/vip" className={`flex items-center gap-1.5 ${paginaActual === '/vip' ? 'text-amber-400' : 'hover:text-amber-400'}`}>
            <Star size={14} fill={paginaActual === '/vip' ? "currentColor" : "none"} /> Club VIP
          </Link>
        </div>

        {/* SECCIÓN DERECHA */}
        <div className="flex items-center gap-3 md:gap-5 shrink-0">
          {user ? (
            <>
              {esAdmin ? (
                <Link href="/admin" className="flex items-center gap-2 text-amber-400 font-black italic text-[11px] uppercase bg-amber-400/10 px-4 py-2.5 rounded-xl border border-amber-400/20">
                  <ShieldCheck size={16} /> Panel Admin
                </Link>
              ) : (
                <Link href="/mi-orden" className={`flex items-center gap-2 font-black italic text-[11px] uppercase px-4 py-2.5 rounded-xl border ${isVIP ? 'text-amber-400 bg-amber-400/10 border-amber-400/40' : 'text-slate-300 bg-white/5 border-white/10'}`}>
                  <Package size={16} /> {isVIP ? 'VIP Orden' : 'Mi Orden'}
                </Link>
              )}
              <button onClick={handleLogout} className="px-4 py-2.5 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl font-black text-[10px] uppercase italic hover:bg-red-500 hover:text-white transition-all">
                SALIR
              </button>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-slate-400 font-bold hover:text-white transition-colors text-[11px] uppercase italic">Login</Link>
              <Link href="/register" className="px-6 py-3 bg-[#22c55e] text-[#0b1118] rounded-xl font-black text-[11px] uppercase italic hover:bg-[#1ea950] shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                Casillero Gratis
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}