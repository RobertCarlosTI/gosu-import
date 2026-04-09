"use client";

import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const paginaActual = usePathname();
  const paginasDondeMeEscondo = ["/login", "/register", "/sign-in", "/sign-up"];

  if (paginasDondeMeEscondo.includes(paginaActual)) {
    return null;
  }

  return (
    <nav className="fixed top-0 w-full z-[100] bg-[#070b12]/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-[1440px] mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo - Tu marca GOSU */}
          <Link href="/" className="flex items-center gap-2 group cursor-pointer shrink-0">
            <span className="text-[#22c55e] text-5xl font-black italic tracking-tighter transform group-hover:scale-105 transition-transform mt-1">
              G
            </span>
            <div className="flex flex-col justify-center">
              <span className="text-2xl font-black text-white tracking-widest leading-none uppercase">
                GOSU
              </span>
              <span className="text-[11px] font-medium text-white tracking-[0.3em] mt-1 leading-none uppercase">
                IMPORT
              </span>
            </div>
          </Link>

          {/* Menú Central - AJUSTADO PARA QUE NO SE AMONTONE */}
          <div className="hidden lg:flex items-center gap-5 text-[12px] font-bold text-slate-300 uppercase italic whitespace-nowrap">
            <Link href="/#guia" className="hover:text-[#22c55e] transition-colors">
                Mi primera Impo
            </Link>
            <Link href="/#servicios" className="hover:text-[#22c55e] transition-colors">
                Servicios
            </Link>
            <Link href="/#proceso" className="hover:text-[#22c55e] transition-colors">
                Cómo funciona
            </Link>
            
            <Link href="/calculadora" className={`flex items-center gap-1.5 transition-colors ${paginaActual === '/calculadora' ? 'text-[#22c55e]' : 'hover:text-[#22c55e]'}`}>
                <span>🔢</span> Calculadora
            </Link>

            {/* SECCIÓN NUEVA: CATÁLOGO MAYORISTA */}
            <Link href="/catalogo" className={`flex items-center gap-1.5 transition-colors ${paginaActual === '/catalogo' ? 'text-[#22c55e]' : 'hover:text-[#22c55e]'}`}>
                <span>✨</span> Catálogo
            </Link>

            <Link href="/vip" className={`flex items-center gap-1.5 transition-colors ${paginaActual === '/vip' ? 'text-amber-400' : 'text-amber-500/80 hover:text-amber-400'}`}>
                <span>👑</span> Club VIP
            </Link>
            
            <Link href="/#faq" className="hover:text-[#22c55e] transition-colors">
                FAQ
            </Link>

            {/* CONTACTO: AHORA LLEVA AL COMPONENTE CTA */}
            <Link href="/#contacto" className="hover:text-[#22c55e] transition-colors">
                Contacto
            </Link>
          </div>
          

          {/* Botones Derecha - COMPLETAMENTE LIMPIOS DE CLERK */}
          <div className="flex items-center gap-4 shrink-0">
            <Link href="/login" className="hidden md:block text-slate-300 font-bold hover:text-white transition-colors text-[11px] uppercase italic whitespace-nowrap">
              Iniciar sesión
            </Link>
            <Link href="/register" className="px-5 py-2.5 bg-[#22c55e] text-[#0b1118] rounded-xl font-black text-[11px] hover:bg-[#1ea950] transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:scale-105 uppercase italic whitespace-nowrap">
              Registrarse
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
}