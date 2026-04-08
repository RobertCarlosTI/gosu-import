"use client";
import React from 'react';
import Link from 'next/link';
import { ChevronLeft, ShieldCheck, Clock, Package, User, Mail, Lock, Phone } from 'lucide-react';

export default function RegisterPage() {
  return (
    // h-screen y overflow-hidden para que no haya rectángulos negros ni scroll
    <div className="h-screen w-full flex flex-col lg:flex-row bg-white overflow-hidden">
      
      {/* SECCIÓN IZQUIERDA: Beneficios (Igual al Login para dar confianza) */}
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
            Tu casillero en Miami <span className="text-[#22c55e]">listo en segundos</span>
          </h1>
          <p className="text-slate-400 text-lg mb-10">
            Regístrate hoy y obtén tu dirección propia en USA para comprar en Amazon, eBay y más.
          </p>

          <div className="space-y-4">
            <BenefitCard 
              icon={<Clock className="text-[#22c55e]" />}
              title="Registro Instantáneo"
              desc="Tu dirección de casillero al momento"
            />
            <BenefitCard 
              icon={<ShieldCheck className="text-[#22c55e]" />}
              title="Seguridad Gosu"
              desc="Tus datos y paquetes protegidos"
            />
          </div>
        </div>

        <div className="relative z-10 flex justify-between border-t border-white/10 pt-8">
          <StatBox value="100%" label="Gratis" />
          <StatBox value="24/7" label="Soporte" />
          <StatBox value="Lima/Prov" label="Envíos" />
        </div>
      </div>

      {/* SECCIÓN DERECHA: Formulario de Registro */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 lg:p-16 relative bg-white overflow-y-auto">
        
        <Link href="/" className="absolute top-8 left-8 flex items-center gap-1 text-slate-400 hover:text-[#22c55e] transition-colors text-sm font-medium group">
          <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Volver
        </Link>

        <div className="w-full max-w-[450px] flex flex-col items-center py-10">
          <h2 className="text-4xl font-bold text-slate-900 mb-2 tracking-tight">Crea tu cuenta</h2>
          <p className="text-slate-500 text-center text-sm mb-8">
            Completa tus datos para abrir tu casillero gratuito
          </p>

          {/* Botón Google rápido */}
          <button className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all font-bold text-slate-700 shadow-sm mb-6">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
            Registrarse con Google
          </button>

          <div className="flex items-center w-full mb-6 gap-4">
            <div className="h-[1px] bg-slate-100 flex-1"></div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">o usa tu correo</span>
            <div className="h-[1px] bg-slate-100 flex-1"></div>
          </div>

          {/* Formulario Manual */}
          <form className="w-full space-y-4">
            <InputGroup label="Nombre completo" icon={<User size={18}/>} placeholder="Ej. Robert Pacheco" />
            <InputGroup label="Correo electrónico" icon={<Mail size={18}/>} placeholder="tu@correo.com" type="email" />
            <InputGroup label="WhatsApp / Celular" icon={<Phone size={18}/>} placeholder="987 654 321" type="tel" />
            <InputGroup label="Contraseña" icon={<Lock size={18}/>} placeholder="••••••••" type="password" />

            <button className="w-full bg-[#22c55e] py-4 rounded-2xl text-[#0b1118] font-black text-lg hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_30px_rgba(34,197,94,0.3)] mt-6 uppercase tracking-tight">
              Crear mi casillero
            </button>
          </form>

          <p className="text-center mt-8 text-slate-500 text-sm font-medium">
            ¿Ya tienes una cuenta?{' '}
            <Link href="/login" className="text-[#22c55e] font-bold hover:underline">Inicia sesión aquí</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

// --- SUB-COMPONENTES PARA QUE SEA FÁCIL DE ENTENDER ---

function InputGroup({ label, icon, placeholder, type = "text" }: any) {
  return (
    <div className="w-full space-y-1.5">
      <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider ml-1">{label}</label>
      <div className="relative flex items-center">
        <div className="absolute left-4 text-slate-400">{icon}</div>
        <input 
          type={type}
          placeholder={placeholder}
          className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 text-slate-700 placeholder:text-slate-300 focus:outline-none focus:border-[#22c55e] focus:ring-1 focus:ring-[#22c55e] transition-all font-medium"
        />
      </div>
    </div>
  );
}

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
    <div className="bg-white/5 border border-white/5 p-4 rounded-2xl flex items-center gap-4">
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