"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ChevronLeft, ShieldCheck, Clock, Package, Mail, 
  Lock, Eye, EyeOff, Loader2, AlertCircle 
} from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import LoadingScreen from '@/app/components/LoadingScreen'; // <--- Importamos tu cargador

// --- CONEXIÓN A SUPABASE ---
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://scpmnmgdvfdbpuyeiawn.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'TU_ANON_KEY_AQUI';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) throw error;
        
        // REDIRECCIÓN INTELIGENTE
        if (data.user?.email === 'gosu.import01@gmail.com') {
            router.push('/admin'); // El jefe va a su torre de control
        } else {
            router.push('/catalogo'); // El cliente va a comprar
        }
        
    } catch (err: any) {
        setError(err.message || 'Credenciales incorrectas.');
        setLoading(false);
    }
};

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true); // <--- Activamos el LoadingScreen para Google
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/catalogo`,
        }
      });
      if (error) throw error;
    } catch (err: any) {
      setError(err.message || 'Error al conectar con Google.');
      setLoading(false);
    }
  };

  return (
    <>
      {/* 1. DISPARADOR DEL CARGADOR GOSU */}
      {loading && <LoadingScreen mensaje="Validando credenciales Gosu..." />}

      <div className={`h-screen w-full flex flex-col lg:flex-row bg-white overflow-hidden font-sans transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        
        {/* SECCIÓN IZQUIERDA: Beneficios */}
        <div className="hidden lg:flex lg:w-1/2 bg-[#070b12] relative p-12 flex-col justify-between overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#22c55e]/10 rounded-full blur-[120px]" />
          
          <div className="relative z-10 flex items-center gap-2">
            <div className="w-10 h-10 bg-[#22c55e] rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(34,197,94,0.4)]">
              <Package className="text-[#070b12] w-6 h-6" />
            </div>
            <span className="text-white font-black tracking-tighter text-xl italic uppercase">Gosu Import</span>
          </div>

          <div className="relative z-10 max-w-md">
            <h1 className="text-4xl font-bold text-white leading-tight mb-4">
              Importa con <span className="text-[#22c55e]">garantía total</span> a todo el Perú
            </h1>
            <p className="text-slate-400 text-lg mb-10">
              Accede a precios mayoristas y gestiona tus importaciones en un solo lugar.
            </p>

            <div className="space-y-4">
              <BenefitCard icon={<Clock className="text-[#22c55e]" />} title="Rapidez Garantizada" desc="Envío express de 3 a 7 días." />
              <BenefitCard icon={<ShieldCheck className="text-[#22c55e]" />} title="Seguridad B2B" desc="Tus datos y pedidos 100% protegidos." />
            </div>
          </div>

          <div className="relative z-10 flex justify-between border-t border-white/10 pt-8">
            <StatBox value="500+" label="Socios" />
            <StatBox value="S/" label="Precios Soles" />
            <StatBox value="24/7" label="Soporte" />
          </div>
        </div>

        {/* SECCIÓN DERECHA: Formulario */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 sm:p-12 relative bg-white overflow-y-auto">
          
          <Link href="/" className="absolute top-8 left-8 flex items-center gap-1 text-slate-400 hover:text-[#22c55e] transition-colors text-sm font-bold group">
            <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Volver
          </Link>

          <div className="w-full max-w-[380px] flex flex-col">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight uppercase italic">Bienvenido</h2>
              <p className="text-slate-500 text-sm">Ingresa tus credenciales para continuar</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-xl text-xs font-bold flex items-center gap-3">
                <AlertCircle size={18} /> {error}
              </div>
            )}

            <form onSubmit={handleEmailLogin} className="space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Correo Electrónico</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 text-slate-400" size={18} />
                  <input 
                    required
                    type="email"
                    placeholder="ejemplo@correo.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:border-[#22c55e] focus:bg-white transition-all text-slate-700 font-medium"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-end px-1">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Contraseña</label>
                  <Link href="#" className="text-[10px] font-bold text-[#22c55e] hover:underline">¿Olvidaste tu contraseña?</Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-3.5 text-slate-400" size={18} />
                  <input 
                    required
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-12 pr-12 outline-none focus:border-[#22c55e] focus:bg-white transition-all text-slate-700 font-medium"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-3.5 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button 
                disabled={loading}
                className="w-full bg-[#070b12] text-white font-black py-4 rounded-2xl hover:bg-[#1a1f2e] transition-all shadow-lg active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="animate-spin" /> : 'INICIAR SESIÓN'}
              </button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
              <div className="relative flex justify-center text-[10px] uppercase font-black text-slate-400 bg-white px-4 tracking-widest">O continúa con</div>
            </div>

            <button 
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 py-4 px-4 border border-slate-200 rounded-2xl bg-white hover:bg-slate-50 transition-all font-bold text-slate-700"
            >
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
              Google
            </button>

            <p className="mt-10 text-center text-xs text-slate-400 font-medium">
              ¿Eres nuevo emprendedor? <Link href="/register" className="text-[#22c55e] font-black hover:underline">Regístrate gratis</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

// Sub-componentes
function StatBox({ value, label }: { value: string, label: string }) {
  return (
    <div>
      <p className="text-2xl font-black text-[#22c55e] leading-none mb-1">{value}</p>
      <p className="text-[9px] uppercase tracking-[0.2em] text-slate-500 font-black italic">{label}</p>
    </div>
  );
}

function BenefitCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="bg-white/5 border border-white/5 p-4 rounded-2xl flex items-center gap-4">
      <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center shrink-0">{icon}</div>
      <div>
        <p className="text-white font-bold text-sm italic uppercase">{title}</p>
        <p className="text-slate-500 text-xs">{desc}</p>
      </div>
    </div>
  );
}