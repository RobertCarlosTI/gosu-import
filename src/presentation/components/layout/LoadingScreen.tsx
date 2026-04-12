"use client";
import React, { useEffect, useState } from 'react';

// Definimos qué datos puede recibir el componente
interface LoadingScreenProps {
  mensaje?: string; // El '?' significa que es opcional
}

export default function LoadingScreen({ mensaje = "Importaciones de otro nivel" }: LoadingScreenProps) {
  const [progreso, setProgreso] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setProgreso((prev) => {
        if (prev >= 100) {
          clearInterval(intervalo);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="fixed inset-0 z-[999] bg-[#070b12] flex flex-col items-center justify-center font-sans">
      {/* LOGO CENTRAL */}
      <div className="mb-8">
        <h1 className="text-white text-6xl md:text-8xl font-black tracking-tighter uppercase italic flex items-baseline">
          <span className="text-[#22c55e]">G</span>OSU
        </h1>
      </div>

      {/* BARRA Y PORCENTAJE */}
      <div className="w-64 md:w-80">
        <div className="flex justify-center mb-2">
          <span className="text-white text-sm font-bold">{progreso}%</span>
        </div>
        <div className="h-[2px] w-full bg-white/10 relative overflow-hidden">
          <div 
            className="h-full bg-white transition-all duration-75 ease-out"
            style={{ width: `${progreso}%` }}
          />
        </div>
      </div>

      {/* TEXTO INFERIOR DINÁMICO */}
      <div className="mt-12 px-4 text-center">
        <p className="text-slate-500 text-[10px] uppercase tracking-[0.3em] font-bold italic">
          {mensaje}
        </p>
      </div>
    </div>
  );
}