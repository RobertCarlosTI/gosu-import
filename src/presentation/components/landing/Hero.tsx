"use client";
import React, { useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
// 1. CAMBIO: Usamos el router de Next.js, no de react-router-dom
import { useRouter } from "next/navigation"; 

export default function Hero() {
    // 2. CAMBIO: Inicializamos el router de Next.js
    const router = useRouter(); 
    
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const moveX = (clientX / window.innerWidth - 0.5) * 40;
            const moveY = (clientY / window.innerHeight - 0.5) * 40;
            mouseX.set(moveX);
            mouseY.set(moveY);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <section className="bg-transparent min-h-[90vh] flex flex-col items-center justify-center pt-20 relative w-full overflow-hidden">
            {/* FONDO ESPACIAL (Estrellas y Nebulosas) */}
            <motion.div style={{ x: springX, y: springY }} className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 opacity-40"
                    style={{
                        backgroundImage: `radial-gradient(1.5px 1.5px at 15% 15%, white, transparent),
                                radial-gradient(1px 1px at 25% 45%, white, transparent),
                                radial-gradient(2px 2px at 45% 75%, white, transparent),
                                radial-gradient(1.5px 1.5px at 65% 25%, white, transparent),
                                radial-gradient(1px 1px at 85% 35%, white, transparent),
                                radial-gradient(2px 2px at 95% 65%, white, transparent),
                                radial-gradient(1.2px 1.2px at 35% 85%, white, transparent)`,
                        backgroundSize: '400px 400px'
                    }}>
                </div>
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#22c55e]/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]"></div>
            </motion.div>

            {/* COHETE ANIMADO */}
            <div className="fixed top-[45%] left-[-20%] animate-rocket-fly z-30 pointer-events-none">
                <div className="relative">
                    <span className="text-5xl filter drop-shadow-[0_0_15px_rgba(34,197,94,0.8)]">🚀</span>
                    <div className="absolute top-1/2 right-full h-[2px] w-40 bg-gradient-to-l from-[#22c55e] to-transparent blur-sm"></div>
                </div>
            </div>

            {/* CONTENIDO HERO */}
            <div className="relative z-10 max-w-5xl mx-auto text-center text-white px-4">
                <div className="flex items-center justify-center gap-5 mb-8">
                    <img src="https://flagcdn.com/w80/us.png" alt="USA" className="w-10 h-7 object-cover rounded-md shadow-lg border border-white/10" />
                    <span className="text-white/20 font-thin text-2xl">→</span>
                    <img src="https://flagcdn.com/w80/pe.png" alt="Peru" className="w-10 h-7 object-cover rounded-md shadow-lg border border-white/10" />
                </div>

                <div className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sm font-medium mb-8 mx-auto w-max">
                    <span className="text-[#22c55e] animate-pulse">⚡</span> Envío Express 3-7 días a todo Perú
                </div>

                <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-tight italic uppercase">
                    Importa desde USA <br />
                    <span className="text-white/40">con garantía total</span>
                </h1>

                <p className="text-lg md:text-xl text-white/70 mb-8 max-w-2xl mx-auto leading-relaxed">
                    Tu casillero exclusivo en Miami. Tarifa plana de <span className="text-[#22c55e] font-bold">$12/kg</span>. <br />
                    Sin peso volumétrico. Consolidación gratis.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                    <button
                        // 3. CAMBIO: Usamos router.push para ir al registro
                        onClick={() => router.push("/register")}
                        className="bg-[#22c55e] text-[#0b1118] px-10 py-4 rounded-2xl font-black text-lg hover:bg-[#1ea950] transition-all shadow-[0_0_30px_rgba(34,197,94,0.4)] hover:scale-105 active:scale-95 uppercase italic"
                    >
                        Obtén tu casillero gratis →
                    </button>
                    <button className="text-white/80 font-bold text-lg hover:text-white transition-colors">
                        Mi primera Impo
                    </button>
                </div>
            </div>
        </section>
    );
}