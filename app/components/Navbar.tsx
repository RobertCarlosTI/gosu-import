"use client";

import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation'; // 1. El "Sensor de habitación"
import { Show, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  // 2. Le preguntamos al sensor: "¿En qué página estamos ahorita?"
  const paginaActual = usePathname();

  // 3. Hacemos una lista de las páginas donde el Navbar debe ser INVISIBLE
  const paginasDondeMeEscondo = ["/login", "/register", "/sign-in", "/sign-up"];

  // 4. EL TRUCO DE MAGIA: Si estamos en una de esas páginas... ¡PUFF! Desaparece.
  if (paginasDondeMeEscondo.includes(paginaActual)) {
    return null; // "null" significa que no dibuje nada en la pantalla
  }

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#070b12]/70 backdrop-blur-lg border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo - Tu marca GOSU */}
          <Link href="/" className="flex items-center gap-2 group cursor-pointer">
            <span className="text-[#22c55e] text-5xl font-black italic tracking-tighter transform group-hover:scale-105 transition-transform mt-1">
              G
            </span>
            <div className="flex flex-col justify-center">
              <span className="text-2xl font-black text-white tracking-widest leading-none">
                GOSU
              </span>
              <span className="text-[11px] font-medium text-white tracking-[0.3em] mt-1 leading-none">
                IMPORT
              </span>
            </div>
          </Link>

          {/* Menú Central */}
          <div className="hidden md:flex items-center gap-8 text-[14px] font-medium text-slate-300">
            <a href="#" className="hover:text-[#22c55e] transition-colors">Mi primera Impo</a>
            <a href="#" className="hover:text-[#22c55e] transition-colors">Servicios</a>
            <a href="#" className="hover:text-[#22c55e] transition-colors">Cómo funciona</a>
            
            <Link href="/vip" className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 transition-colors">
                <span>👑</span> Club VIP
            </Link>
            
            <a href="#" className="hover:text-[#22c55e] transition-colors">FAQ</a>
            <a href="#" className="hover:text-[#22c55e] transition-colors">Contacto</a>
          </div>

          {/* Botones Derecha */}
          <div className="flex items-center gap-6">
            <Show when="signed-out">
              <Link href="/login" className="hidden md:block text-slate-300 font-medium hover:text-white transition-colors text-sm">
                Iniciar sesión
              </Link>
              <Link href="/register" className="px-6 py-2.5 bg-[#22c55e] text-[#0b1118] rounded-xl font-bold text-sm hover:bg-[#1ea950] transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:scale-105">
                Registrarse
              </Link>
            </Show>

            <Show when="signed-in">
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10 border-2 border-[#22c55e]/50 hover:border-[#22c55e] transition-all"
                  }
                }}
              />
            </Show>
          </div>
        </div>
      </div>
    </nav>
  );
}