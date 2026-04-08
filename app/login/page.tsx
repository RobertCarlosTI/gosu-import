"use client";
import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, ShieldCheck, Clock, Package, MessageCircle } from 'lucide-react';

export default function LoginPage() {
  return (
    /* CAMBIO AQUÍ: Usamos h-screen y overflow-hidden para que NO salga la barra de scroll */
    <div className="h-screen w-full flex flex-col lg:flex-row bg-white overflow-hidden">
      
      {/* SECCIÓN IZQUIERDA: Beneficios */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#070b12] relative overflow-hidden p-12 flex-col justify-between">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#22c55e]/10 rounded-full blur-[120px]" />
        
        <div className="relative z-10 flex items-center gap-2">
          <div className="w-10 h-10 bg-[#22c55e] rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(34,197,94,0.4)]">
            <Package className="text-[#070b12] w-6 h-6" />
          </div>
          <span className="text-white font-black tracking-tighter text-xl italic uppercase">Gosu Import</span>
        </div>

        <div className="relative z-10 max-w-md">
          <h1 className="text-4xl font-bold text-white leading-tight mb-4">
            Importa desde Estados Unidos con <span className="text-[#22c55e]">garantía total</span>
          </h1>
          <p className="text-slate-400 text-lg mb-10">
            Tu casillero exclusivo en Miami. Tarifa plana de $12/kg con envío express garantizado.
          </p>

          <div className="space-y-4">
            <BenefitCard 
              icon={<Clock className="text-[#22c55e]" />}
              title="Envío Express"
              desc="3-7 días hábiles garantizados"
            />
            <BenefitCard 
              icon={<ShieldCheck className="text-[#22c55e]" />}
              title="Ahorra 7% en impuestos"
              desc="Almacén exonerado en Florida"
            />
            <BenefitCard 
              icon={<Package className="text-[#22c55e]" />}
              title="Consolidación Gratis"
              desc="Hasta 5 paquetes en uno"
            />
          </div>
        </div>

        <div className="relative z-10 flex justify-between border-t border-white/10 pt-8">
          <StatBox value="500+" label="Envíos mensuales" />
          <StatBox value="$12" label="Por kilogramo" />
          <StatBox value="3-7" label="Días de envío" />
        </div>
      </div>

      {/* SECCIÓN DERECHA: Formulario */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 sm:p-12 relative bg-white">
        
        <Link href="/" className="absolute top-8 left-8 flex items-center gap-1 text-slate-400 hover:text-[#22c55e] transition-colors text-sm font-medium group">
          <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Volver al inicio
        </Link>

        <div className="w-full max-w-[400px] flex flex-col items-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-2 tracking-tight">Bienvenido</h2>
          <p className="text-slate-500 text-center text-sm mb-10">
            Inicia sesión con tu cuenta de Google para acceder a tu casillero y gestionar tus envíos
          </p>

          <button className="w-full flex items-center justify-center gap-3 py-4 px-4 border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all font-bold text-slate-700 shadow-sm mb-8 active:scale-[0.98]">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
            Continuar con Google
          </button>

          <label className="flex items-center gap-3 w-full mb-8 cursor-pointer group justify-center lg:justify-start">
            <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-slate-300 text-[#22c55e] focus:ring-[#22c55e] cursor-pointer" />
            <div className="flex flex-col text-left">
              <span className="text-sm font-bold text-slate-700">Mantener mi sesión iniciada</span>
              <span className="text-[11px] text-slate-400 font-medium">Tu sesión permanecerá activa por 60 días</span>
            </div>
          </label>

          <div className="w-full bg-[#f0fdf4] border border-[#dcfce7] p-5 rounded-[2rem] flex gap-4 mb-8 text-left">
            <ShieldCheck className="text-[#22c55e] shrink-0" size={24} />
            <div className="space-y-1">
              <p className="text-sm font-black text-[#166534]">Inicio de sesión seguro</p>
              <p className="text-xs text-[#166534]/80 leading-relaxed font-medium">
                Usamos autenticación segura de Google. Después de iniciar sesión, completarás un breve formulario con tus datos de envío.
              </p>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 text-center leading-relaxed">
            Al continuar, aceptas nuestros <Link href="#" className="underline font-bold hover:text-slate-600 transition-colors">Términos de servicio</Link> y <Link href="#" className="underline font-bold hover:text-slate-600 transition-colors">Política de privacidad</Link>
          </p>
        </div>

        <div className="absolute bottom-8 w-full text-center">
          <p className="text-xs text-slate-400 font-medium">
            ¿Tienes problemas? <Link href="#" className="text-[#22c55e] hover:underline font-bold">Contáctanos</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

// Sub-componentes para que el código principal sea más corto
function StatBox({ value, label }: { value: string, label: string }) {
  return (
    <div>
      <p className="text-2xl font-black text-[#22c55e]">{value}</p>
      <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{label}</p>
    </div>
  );
}

function BenefitCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="bg-white/5 border border-white/5 p-4 rounded-2xl flex items-center gap-4 hover:bg-white/10 transition-colors">
      <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-white font-bold text-sm">{title}</p>
        <p className="text-slate-500 text-xs font-medium">{desc}</p>
      </div>
    </div>
  );
}