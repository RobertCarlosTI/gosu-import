"use client";
import React, { useState, useEffect } from 'react';
import { Plane, Package, Smartphone, Tablet, Laptop, Box, Calculator, ShieldCheck, CheckCircle, FileText } from 'lucide-react';

// --- CATÁLOGO DE IPHONES (VIAJERO) ---
const IPHONE_CATALOG = [
    { name: 'IPHONE 13 / 13 PRO', price: 75, estValue: 700 },
    { name: 'IPHONE 13 PRO MAX', price: 80, estValue: 800 },
    { name: 'IPHONE 14 / 14 PRO', price: 85, estValue: 900 },
    { name: 'IPHONE 14 PRO MAX', price: 90, estValue: 1000 },
    { name: 'IPHONE 15 / 15 PRO', price: 95, estValue: 1100 },
    { name: 'IPHONE 15 PRO MAX', price: 100, estValue: 1200 },
    { name: 'IPHONE 16 / 16 PRO', price: 105, estValue: 1300 },
    { name: 'IPHONE 16 PRO MAX', price: 110, estValue: 1400 },
    { name: 'IPHONE 17 / 17 PLUS', price: 115, estValue: 1500 },
    { name: 'IPHONE 17 PRO', price: 125, estValue: 1600 },
    { name: 'IPHONE 17 PRO MAX', price: 135, estValue: 1800 },
];

const TC = 3.4350; 
const NUMERO_WHATSAPP = "51907024684"; // TU NÚMERO
const TARIFA_VIAJERO_KG = 15; 
const MINIMO_VIAJERO = 40; 

const PESO_ESTANDAR = {
    'iPhone': 0.63,
    'iPad': 1.0,
    'Laptops': 3.0
};

export default function CalculadoraPage() {
    const [method, setMethod] = useState<'viajero' | 'courier'>('viajero');
    
    // Estados Viajero
    const [vCategory, setVCategory] = useState<'iPhone' | 'iPad' | 'Laptops' | 'Otros'>('iPhone');
    const [vModel, setVModel] = useState<{name: string, price: number, estValue: number} | null>(null);
    const [vValue, setVValue] = useState<string>(''); 
    const [vWeight, setVWeight] = useState<string>(''); 
    const [vCalculated, setVCalculated] = useState(false);

    // Estados Courier
    const [cValue, setCValue] = useState<string>('');
    const [cWeight, setCWeight] = useState<string>('');
    const [cCalculated, setCCalculated] = useState(false);
    const [cExtras, setCExtras] = useState({ reempaquetado: false, cambio: false, embalaje: false });
    
    // Selección Final
    const [selectedMethod, setSelectedMethod] = useState<'viajero' | 'regular' | null>(null);
    const [whatsappMsg, setWhatsappMsg] = useState("");

    // --- REGLA LOGÍSTICA: MÍNIMO 1 KG ---
    const applyMinimumWeight = (wStr: string) => {
        const w = parseFloat(wStr) || 0;
        return w > 0 ? Math.max(1, w) : 0; 
    };

    // --- MATEMÁTICA COURIER REGULAR ---
    const calculateRegular = (weightStr: string, valueStr: string, extras = {reempaquetado: false, cambio: false, embalaje: false}) => {
        const w = applyMinimumWeight(weightStr);
        const v = parseFloat(valueStr) || 0;
        const flete = w * 9;
        const desaduanaje = w > 0 ? 9 : 0;
        const taxes = v > 200 ? v * 0.28 : 0; // IMPUESTOS 28%
        const ext = (extras.reempaquetado ? 6 : 0) + (extras.cambio ? 3 : 0) + (extras.embalaje ? 2.5 : 0);
        return { flete, desaduanaje, taxes, ext, total: flete + desaduanaje + taxes + ext, weightUsed: w };
    };

    // --- MATEMÁTICA VIAJERO (CON MÍNIMO DE $40) ---
    const calculateViajeroPrice = () => {
        const v = parseFloat(vValue) || 0;
        const w = applyMinimumWeight(vWeight); 

        let basePrice = 0;
        if (vCategory === 'Laptops') basePrice = v * 0.25;
        else if (vCategory === 'iPad') basePrice = v * 0.20;
        else if (vCategory === 'Otros') basePrice = w * TARIFA_VIAJERO_KG;

        return basePrice > 0 ? Math.max(MINIMO_VIAJERO, basePrice) : 0;
    };

    const getComparisonWeight = () => {
        if (vCategory === 'Otros') return applyMinimumWeight(vWeight);
        return PESO_ESTANDAR[vCategory as keyof typeof PESO_ESTANDAR] || 1;
    };

    // --- WHATSAPP GENERATOR ---
    useEffect(() => {
        let msg = "";
        
        if (!selectedMethod && method === 'viajero') {
             msg = `Hola, deseo una cotización. ¿Me confirmas disponibilidad?`;
             setWhatsappMsg(msg);
             return;
        }

        if (method === 'viajero') {
            if (vCategory === 'iPhone' && vModel) {
                const isRegular = selectedMethod === 'regular';
                const currentMethodName = isRegular ? "Courier Regular" : "Método Viajero";
                
                msg = `Hola, deseo una cotización - ${currentMethodName}\n\n`;
                msg += `Paquete: ${vModel.name}\n`;
                msg += `USD: $${isRegular ? vModel.estValue.toFixed(2) : vModel.price.toFixed(2)}\n`;
                msg += `TC: ${TC.toFixed(4)}\n\n`;
                msg += `Método: ${currentMethodName}\n`;
                
                if (isRegular) {
                     const reg = calculateRegular(PESO_ESTANDAR['iPhone'].toString(), vModel.estValue.toString());
                     msg += `TOTAL: $${reg.total.toFixed(2)} | S/ ${(reg.total * TC).toFixed(2)}\n\n`;
                } else {
                     msg += `TOTAL: $${vModel.price.toFixed(2)} | S/ ${(vModel.price * TC).toFixed(2)}\n\n`;
                }
            } else if (vCategory !== 'iPhone' && vCalculated) {
                const val = parseFloat(vValue) || 0;
                const rawWeight = parseFloat(vWeight) || 0;
                const billedWeight = applyMinimumWeight(vWeight);
                
                const isRegular = selectedMethod === 'regular';
                const currentMethodName = isRegular ? "Courier Regular" : "Método Viajero";

                msg = `Hola, deseo una cotización - ${currentMethodName}\n\n`;
                msg += `Paquete: ${vCategory === 'Otros' ? 'Envío personalizado (Otros)' : vCategory}\n`;
                msg += `USD: $${val.toFixed(2)}\n`;
                
                if (vCategory === 'Otros') {
                    if (rawWeight > 0 && rawWeight < 1) {
                        msg += `Peso: ${rawWeight} kg (Cobrado mínimo 1.00 kg)\n`;
                    } else {
                        msg += `Peso: ${billedWeight.toFixed(2)} kg\n`;
                    }
                }
                
                msg += `TC: ${TC.toFixed(4)}\n\n`;
                msg += `Método: ${currentMethodName}\n`;

                if (isRegular) {
                    const reg = calculateRegular(getComparisonWeight().toString(), vValue);
                    msg += `TOTAL: $${reg.total.toFixed(2)} | S/ ${(reg.total * TC).toFixed(2)}\n\n`;
                } else {
                    const viajeroPrice = calculateViajeroPrice();
                    msg += `TOTAL: $${viajeroPrice.toFixed(2)} | S/ ${(viajeroPrice * TC).toFixed(2)}\n\n`;
                }
            }
            msg += `¿Me confirmas disponibilidad y tiempo de entrega?`;
            
        } else { 
            if (cCalculated) {
                const reg = calculateRegular(cWeight, cValue, cExtras);
                const rawWeight = parseFloat(cWeight) || 0;
                
                msg = `Hola, deseo una cotización - Método Courier Regular\n\n`;
                msg += `Paquete: Envío por peso\n`;
                msg += `USD: $${parseFloat(cValue || "0").toFixed(2)}\n`;
                
                if (rawWeight > 0 && rawWeight < 1) {
                    msg += `Peso: ${rawWeight} kg (Cobrado mínimo 1.00 kg)\n`;
                } else {
                    msg += `Peso: ${reg.weightUsed.toFixed(2)} kg\n`;
                }
                
                msg += `TC: ${TC.toFixed(4)}\n\n`;

                msg += `Método: Método Courier Regular\n`;
                msg += `Flete: $${reg.flete.toFixed(2)}\n`;
                msg += `Desaduanaje: $${reg.desaduanaje.toFixed(2)}\n`;
                if (reg.taxes > 0) msg += `Impuestos (28%): $${reg.taxes.toFixed(2)}\n`;
                if (reg.ext > 0) msg += `Extras: $${reg.ext.toFixed(2)}\n`;
                
                msg += `\nTOTAL: $${reg.total.toFixed(2)} | S/ ${(reg.total * TC).toFixed(2)}\n\n`;
                msg += `¿Me confirmas disponibilidad y tiempo de entrega?`;
            } else {
                 msg = `Hola, deseo una cotización - Método Courier Regular. ¿Me confirman disponibilidad?`;
            }
        }
        
        setWhatsappMsg(msg);
    }, [method, vCategory, vModel, vValue, vWeight, vCalculated, cValue, cWeight, cExtras, cCalculated, selectedMethod]);

    const handleWhatsAppClick = () => {
        const encodedMsg = encodeURIComponent(whatsappMsg);
        window.open(`https://wa.me/${NUMERO_WHATSAPP}?text=${encodedMsg}`, '_blank');
    };

    const canCalculateViajero = vCategory === 'Otros' ? (vValue && vWeight && parseFloat(vValue) > 200) : (vValue && parseFloat(vValue) > 200);

    const getViajeroDescription = () => {
        const finalPrice = calculateViajeroPrice();
        if (finalPrice === MINIMO_VIAJERO && finalPrice > (applyMinimumWeight(vWeight) * TARIFA_VIAJERO_KG)) {
            return "Tarifa mínima garantizada para Viajero.";
        }
        if (vCategory === 'Otros') return `Tarifa Viajero (${applyMinimumWeight(vWeight)}kg x $${TARIFA_VIAJERO_KG}/kg)`;
        return "Tarifa variable por valor del equipo.";
    };

    // --- IMÁGENES DINÁMICAS PARA CLOUDINARY ---
    const imageLinks = {
        viajero: "https://res.cloudinary.com/df7ezgej5/image/upload/v1741235123/viajero_vv4rip.jpg", // Foto iPhones / Viajero
        courier: "https://res.cloudinary.com/df7ezgej5/image/upload/v1741235123/cajas_xuq1j4.jpg"  // Foto Cajas / Courier
    };

    return (
        <main className="flex flex-col min-h-screen pt-24 pb-20 overflow-x-hidden bg-[#0b1118] relative">
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 opacity-30" style={{ backgroundImage: `radial-gradient(1.5px 1.5px at 15% 15%, white, transparent), radial-gradient(1px 1px at 25% 45%, white, transparent)`, backgroundSize: '400px 400px' }}></div>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#22c55e]/10 rounded-full blur-[120px]"></div>
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-4">
                
                <div className="mb-12 text-center lg:text-left flex flex-col lg:flex-row items-center gap-4">
                    <div className="w-16 h-16 bg-[#22c55e]/10 rounded-2xl flex items-center justify-center text-[#22c55e] shrink-0 border border-[#22c55e]/20 backdrop-blur">
                        <Calculator size={32} />
                    </div>
                    <div>
                        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase italic">
                            Calcula tu <span className="text-[#22c55e]">Ahorro</span>
                        </h1>
                        <p className="text-slate-400 font-medium mt-1">Define el producto y cotiza al instante.</p>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-10">
                    
                    <div className="w-full lg:w-3/5 space-y-6">
                        
                        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 md:p-8">
                            <h2 className="text-white text-xs font-black uppercase tracking-widest mb-4">Paso 1. Método de Envío</h2>
                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <button 
                                    onClick={() => { setMethod('viajero'); setVCalculated(false); setSelectedMethod(null); }}
                                    className={`py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all border ${method === 'viajero' ? 'bg-[#22c55e] text-[#0b1118] border-[#22c55e] shadow-[0_0_20px_rgba(34,197,94,0.3)]' : 'bg-[#0b1118] text-slate-400 border-white/10 hover:border-[#22c55e]/50'}`}
                                >
                                    <Plane size={20} /> Método Viajero
                                </button>
                                <button 
                                    onClick={() => { setMethod('courier'); setCCalculated(false); setSelectedMethod('regular'); }}
                                    className={`py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all border ${method === 'courier' ? 'bg-[#22c55e] text-[#0b1118] border-[#22c55e] shadow-[0_0_20px_rgba(34,197,94,0.3)]' : 'bg-[#0b1118] text-slate-400 border-white/10 hover:border-[#22c55e]/50'}`}
                                >
                                    <Package size={20} /> Método Courier
                                </button>
                            </div>

                            {method === 'viajero' && (
                                <>
                                    <h2 className="text-white text-xs font-black uppercase tracking-widest mb-4">Paso 2. Tipo de Cotización</h2>
                                    <div className="flex flex-wrap gap-3">
                                        {[
                                            { id: 'iPhone', icon: <Smartphone size={16}/> },
                                            { id: 'iPad', icon: <Tablet size={16}/> },
                                            { id: 'Laptops', icon: <Laptop size={16}/> },
                                            { id: 'Otros', icon: <Box size={16}/> }
                                        ].map((cat) => (
                                            <button 
                                                key={cat.id}
                                                onClick={() => { setVCategory(cat.id as any); setVModel(null); setVCalculated(false); setSelectedMethod(null); }}
                                                className={`px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition-all border ${vCategory === cat.id ? 'bg-[#22c55e]/10 text-[#22c55e] border-[#22c55e]' : 'bg-slate-900/50 text-slate-400 border-white/5 hover:bg-white/5'}`}
                                            >
                                                {cat.icon} {cat.id}
                                            </button>
                                        )) }
                                    </div>
                                </>
                            )}
                        </div>

                        {method === 'viajero' && (
                            <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 md:p-10 shadow-2xl">
                                {vCategory === 'iPhone' ? (
                                    <div className="animate-fade-in">
                                        <h2 className="text-white text-sm font-black uppercase tracking-widest mb-4">Selecciona tu modelo</h2>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
                                            {IPHONE_CATALOG.map((mod, idx) => (
                                                <button 
                                                    key={idx}
                                                    onClick={() => { setVModel(mod); setVCalculated(true); setSelectedMethod('viajero'); }}
                                                    className={`p-4 rounded-xl text-center transition-all border ${vModel?.name === mod.name ? 'bg-[#22c55e]/10 border-[#22c55e] shadow-[0_0_15px_rgba(34,197,94,0.15)]' : 'bg-slate-900/50 border-white/5 hover:border-white/20'}`}
                                                >
                                                    <div className={`text-[10px] font-bold uppercase tracking-wide leading-tight ${vModel?.name === mod.name ? 'text-white' : 'text-slate-400'}`}>{mod.name}</div>
                                                </button>
                                            ))}
                                        </div>
                                        
                                        {vModel && (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 animate-fade-in border-t border-white/10 pt-8">
                                                <button 
                                                    onClick={() => setSelectedMethod('viajero')}
                                                    className={`relative group bg-slate-900/40 backdrop-blur-xl border rounded-[2rem] p-6 text-left transition-all duration-300 ${selectedMethod === 'viajero' ? 'border-[#22c55e] shadow-[0_0_20px_rgba(34,197,94,0.1)] scale-105 z-10' : 'border-white/10 hover:border-[#22c55e]/30'}`}
                                                >
                                                    {selectedMethod === 'viajero' && <CheckCircle className="absolute top-5 right-5 text-[#22c55e]" size={24}/>}
                                                    <h3 className="text-white text-xs font-black uppercase tracking-widest mb-4">Cotización Viajero</h3>
                                                    <div className="text-4xl font-black text-[#22c55e] tracking-tighter mb-1">
                                                        ${vModel.price.toFixed(2)}
                                                    </div>
                                                    <div className="text-slate-300 font-bold text-sm mb-4">
                                                        S/ {(vModel.price * TC).toFixed(2)}
                                                    </div>
                                                    <p className="text-slate-500 text-[11px] mt-auto">Tarifa fija exclusiva por modelo.</p>
                                                </button>

                                                <button 
                                                    onClick={() => setSelectedMethod('regular')}
                                                    className={`relative group bg-slate-900/40 backdrop-blur-xl border rounded-[2rem] p-6 text-left transition-all duration-300 ${selectedMethod === 'regular' ? 'border-[#22c55e] shadow-[0_0_20px_rgba(34,197,94,0.1)] scale-105 z-10' : 'border-white/10 hover:border-[#22c55e]/30'}`}
                                                >
                                                    {selectedMethod === 'regular' && <CheckCircle className="absolute top-5 right-5 text-[#22c55e]" size={24}/>}
                                                    <h3 className="text-slate-400 text-xs font-black uppercase tracking-widest mb-4">Courier Regular</h3>
                                                    <div className="text-4xl font-black text-white tracking-tighter mb-1 opacity-50 line-through decoration-red-500 decoration-2">
                                                        ${calculateRegular(PESO_ESTANDAR['iPhone'].toString(), vModel.estValue.toString()).total.toFixed(2)}
                                                    </div>
                                                    <div className="text-slate-500 font-bold text-sm mb-4">
                                                        S/ {(calculateRegular(PESO_ESTANDAR['iPhone'].toString(), vModel.estValue.toString()).total * TC).toFixed(2)}
                                                    </div>
                                                    <div className="space-y-1 text-[10px] font-medium text-slate-500 border-t border-white/5 pt-3">
                                                        <div className="flex justify-between"><span>Flete (1kg Mínimo) + Trámite:</span> <span>${(calculateRegular(PESO_ESTANDAR['iPhone'].toString(), vModel.estValue.toString()).flete + calculateRegular(PESO_ESTANDAR['iPhone'].toString(), vModel.estValue.toString()).desaduanaje).toFixed(2)}</span></div>
                                                        <div className="flex justify-between text-red-500/70"><span>Impuestos (28%):</span> <span>${calculateRegular(PESO_ESTANDAR['iPhone'].toString(), vModel.estValue.toString()).taxes.toFixed(2)}</span></div>
                                                    </div>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="space-y-6 animate-fade-in">
                                        <h2 className="text-white text-sm font-black uppercase tracking-widest mb-4">Ingresa los datos</h2>
                                        
                                        {vCategory === 'Otros' ? (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2 block">Valor del producto (USD)</label>
                                                    <input 
                                                        type="number" value={vValue} 
                                                        onChange={(e) => { setVValue(e.target.value); setVCalculated(false); }}
                                                        className={`w-full bg-slate-900/50 border rounded-xl py-4 px-5 text-white font-bold text-lg outline-none transition-colors ${parseFloat(vValue) <= 200 && vValue !== '' ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-[#22c55e]'}`}
                                                        placeholder="Ej: 345"
                                                    />
                                                    {parseFloat(vValue) <= 200 && vValue !== '' && (
                                                        <p className="text-red-500 text-[10px] mt-2 font-bold flex items-center gap-1"><ShieldCheck size={12}/> Debe ser mayor a $200 USD.</p>
                                                    )}
                                                </div>
                                                <div>
                                                    <label className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2 block">Peso (kg)</label>
                                                    <input 
                                                        type="number" value={vWeight} 
                                                        onChange={(e) => { setVWeight(e.target.value); setVCalculated(false); }}
                                                        className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-4 px-5 text-white font-bold text-lg focus:border-[#22c55e] outline-none transition-colors"
                                                        placeholder="Ej: 0.5"
                                                    />
                                                    {parseFloat(vWeight) > 0 && parseFloat(vWeight) < 1 && (
                                                        <p className="text-amber-500 text-[10px] mt-2 italic">Se cobrará como 1 kg (Peso mínimo logístico).</p>
                                                    )}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="w-full">
                                                <label className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2 block">Valor del producto (USD)</label>
                                                <input 
                                                    type="number" value={vValue} 
                                                    onChange={(e) => { setVValue(e.target.value); setVCalculated(false); }}
                                                    className={`w-full bg-slate-900/50 border rounded-xl py-4 px-5 text-white font-bold text-lg outline-none transition-colors ${parseFloat(vValue) <= 200 && vValue !== '' ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-[#22c55e]'}`}
                                                    placeholder="Ej: 1200"
                                                />
                                                {parseFloat(vValue) <= 200 && vValue !== '' && (
                                                    <p className="text-red-500 text-[10px] mt-2 font-bold flex items-center gap-1"><ShieldCheck size={12}/> El Método Viajero aplica para compras mayores a $200 USD.</p>
                                                )}
                                            </div>
                                        )}
                                        
                                        <div className="flex gap-4">
                                            <button 
                                                onClick={() => { if(canCalculateViajero) { setVCalculated(true); setSelectedMethod(null); } }} 
                                                className="bg-amber-500 text-[#0b1118] px-8 py-3 rounded-xl font-black uppercase italic hover:bg-amber-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                disabled={!canCalculateViajero}
                                            >
                                                Calcular Opciones
                                            </button>
                                        </div>

                                        {vCalculated && (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 animate-fade-in border-t border-white/10 pt-8">
                                                <button 
                                                    onClick={() => setSelectedMethod('viajero')}
                                                    className={`relative group bg-slate-900/40 backdrop-blur-xl border rounded-[2rem] p-6 text-left transition-all duration-300 ${selectedMethod === 'viajero' ? 'border-[#22c55e] shadow-[0_0_20px_rgba(34,197,94,0.1)] scale-105 z-10' : 'border-white/10 hover:border-[#22c55e]/30'}`}
                                                >
                                                    {selectedMethod === 'viajero' && <CheckCircle className="absolute top-5 right-5 text-[#22c55e]" size={24}/>}
                                                    <h3 className="text-white text-xs font-black uppercase tracking-widest mb-4">Cotización Viajero</h3>
                                                    <div className="text-4xl font-black text-[#22c55e] tracking-tighter mb-1">
                                                        ${calculateViajeroPrice().toFixed(2)}
                                                    </div>
                                                    <div className="text-slate-300 font-bold text-sm mb-4">
                                                        S/ {(calculateViajeroPrice() * TC).toFixed(2)}
                                                    </div>
                                                    <p className="text-slate-500 text-[11px] mt-auto">{getViajeroDescription()}</p>
                                                </button>

                                                <button 
                                                    onClick={() => setSelectedMethod('regular')}
                                                    className={`relative group bg-slate-900/40 backdrop-blur-xl border rounded-[2rem] p-6 text-left transition-all duration-300 ${selectedMethod === 'regular' ? 'border-[#22c55e] shadow-[0_0_20px_rgba(34,197,94,0.1)] scale-105 z-10' : 'border-white/10 hover:border-[#22c55e]/30'}`}
                                                >
                                                    {selectedMethod === 'regular' && <CheckCircle className="absolute top-5 right-5 text-[#22c55e]" size={24}/>}
                                                    <h3 className="text-slate-400 text-xs font-black uppercase tracking-widest mb-4">Courier Regular</h3>
                                                    <div className="text-4xl font-black text-white tracking-tighter mb-1 opacity-50 line-through decoration-red-500 decoration-2">
                                                        ${calculateRegular(getComparisonWeight().toString(), vValue).total.toFixed(2)}
                                                    </div>
                                                    <div className="text-slate-500 font-bold text-sm mb-4">
                                                        S/ {(calculateRegular(getComparisonWeight().toString(), vValue).total * TC).toFixed(2)}
                                                    </div>
                                                    <div className="space-y-1 text-[10px] font-medium text-slate-500 border-t border-white/5 pt-3">
                                                        <div className="flex justify-between"><span>Flete (Est. {applyMinimumWeight(getComparisonWeight().toString())}kg) + Trámite:</span> <span>${(calculateRegular(getComparisonWeight().toString(), vValue).flete + calculateRegular(getComparisonWeight().toString(), vValue).desaduanaje).toFixed(2)}</span></div>
                                                        {calculateRegular(getComparisonWeight().toString(), vValue).taxes > 0 && (
                                                            <div className="flex justify-between text-red-500/70"><span>Impuestos (28%):</span> <span>${calculateRegular(getComparisonWeight().toString(), vValue).taxes.toFixed(2)}</span></div>
                                                        )}
                                                    </div>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}

                        {method === 'courier' && (
                            <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 md:p-10 shadow-2xl animate-fade-in">
                                <h2 className="text-white text-sm font-black uppercase tracking-widest mb-4">Ingresa los datos</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <label className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2 block">Valor del producto (USD)</label>
                                        <input 
                                            type="number" 
                                            max="200"
                                            value={cValue} 
                                            onChange={(e) => {
                                                setCValue(e.target.value);
                                                setCCalculated(false); 
                                            }}
                                            className={`w-full bg-[#0b1118] border rounded-xl py-3 px-4 text-white font-bold outline-none transition-colors ${parseFloat(cValue) > 200 ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-[#22c55e]'}`}
                                            placeholder="Ej: 150"
                                        />
                                        {parseFloat(cValue) > 200 && (
                                            <p className="text-red-500 text-[10px] mt-2 font-bold flex items-center gap-1">
                                                <ShieldCheck size={12}/> El valor no puede ser mayor a $200 USD para Courier.
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2 block">Peso (kg)</label>
                                        <input 
                                            type="number" value={cWeight} onChange={(e) => setCWeight(e.target.value)}
                                            className="w-full bg-[#0b1118] border border-white/10 rounded-xl py-3 px-4 text-white font-bold focus:border-[#22c55e] outline-none transition-colors"
                                            placeholder="Ej: 0.5"
                                        />
                                        {parseFloat(cWeight) > 0 && parseFloat(cWeight) < 1 && (
                                            <p className="text-amber-500 text-[10px] mt-2 italic">Se cobrará como 1 kg (Peso mínimo).</p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <button 
                                        onClick={() => { if(cValue && cWeight && parseFloat(cValue) <= 200) setCCalculated(true); }} 
                                        disabled={parseFloat(cValue) > 200 || !cValue || !cWeight}
                                        className="bg-amber-500 text-[#0b1118] px-8 py-3 rounded-xl font-black uppercase italic hover:bg-amber-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Calcular
                                    </button>
                                </div>

                                {cCalculated && (
                                    <div className="mt-8 animate-fade-in">
                                        <div className="bg-[#0b1118] border border-[#22c55e]/30 rounded-2xl p-6 relative overflow-hidden">
                                            <div className="absolute top-0 left-0 w-1 h-full bg-[#22c55e]"></div>
                                            <h3 className="text-white text-sm font-black uppercase tracking-widest mb-4">Cotización Regular</h3>
                                            <div className="text-4xl font-black text-[#22c55e] tracking-tighter mb-1">${calculateRegular(cWeight, cValue, cExtras).total.toFixed(2)}</div>
                                            <div className="text-slate-400 font-bold mb-4">S/ {(calculateRegular(cWeight, cValue, cExtras).total * TC).toFixed(2)}</div>
                                            
                                            <div className="space-y-1 text-sm font-medium text-slate-300">
                                                <div className="flex justify-between"><span>Flete ({calculateRegular(cWeight, cValue).weightUsed}kg × $9):</span> <span>${calculateRegular(cWeight, cValue, cExtras).flete.toFixed(2)}</span></div>
                                                <div className="flex justify-between"><span>Desaduanaje Fijo:</span> <span>${calculateRegular(cWeight, cValue, cExtras).desaduanaje.toFixed(2)}</span></div>
                                                {calculateRegular(cWeight, cValue, cExtras).taxes > 0 && <div className="flex justify-between text-red-400"><span>Impuestos (28%):</span> <span>${calculateRegular(cWeight, cValue, cExtras).taxes.toFixed(2)}</span></div>}
                                                {calculateRegular(cWeight, cValue, cExtras).ext > 0 && <div className="flex justify-between text-amber-400"><span>Servicios Extra:</span> <span>${calculateRegular(cWeight, cValue, cExtras).ext.toFixed(2)}</span></div>}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 md:p-8 shadow-xl">
                            <h3 className="text-white text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                                <FileText size={16} className="text-[#22c55e]"/> Mensaje listo para WhatsApp
                            </h3>
                            
                            <textarea 
                                readOnly 
                                value={whatsappMsg}
                                className="w-full h-48 bg-slate-900/50 border border-white/5 rounded-xl p-4 text-slate-300 text-sm font-mono focus:outline-none resize-none mb-6 custom-scrollbar"
                            />

                            <button 
                                onClick={handleWhatsAppClick}
                                disabled={method === 'viajero' ? !selectedMethod : !cCalculated}
                                className="w-full sm:w-auto mx-auto bg-[#ea580c] text-white px-10 py-5 rounded-xl font-black text-lg hover:bg-[#c2410c] transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 uppercase italic"
                            >
                                Contactar por WhatsApp
                            </button>
                            <p className="text-center text-slate-500 text-[10px] mt-3">Selecciona una cotización para habilitar el botón.</p>
                        </div>
                    </div>

                    <div className="hidden lg:block lg:w-2/5 relative">
                        <div className="absolute -inset-4 bg-[#22c55e] transform translate-x-4 translate-y-4 rounded-[3rem] opacity-20 blur-xl"></div>
                        <div className="relative h-[850px] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl backdrop-blur">
                            
                            {/* IMAGEN DINÁMICA BASADA EN EL MÉTODO SELECCIONADO */}
                            <img 
                                src={method === 'viajero' 
                                    ? imageLinks.viajero 
                                    : imageLinks.courier} 
                                alt={method === 'viajero' ? "Premium Courier GOSU - Viajero" : "Premium Courier GOSU - Cajas"} 
                                className="w-full h-full object-cover transition-opacity duration-300"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1118] via-[#0b1118]/60 to-transparent"></div>
                            
                             <div className="absolute top-8 left-8">
                                <span className="text-4xl font-extrabold text-white opacity-20 px-4 py-1.5 rounded-xl border border-white/5">GOSU</span>
                            </div>

                            <div className="absolute bottom-12 left-10 right-10 text-center space-y-3">
                                <div className="inline-block bg-[#22c55e]/15 text-[#22c55e] font-black uppercase italic tracking-widest px-6 py-2 rounded-full text-xs shadow-[0_0_20px_rgba(34,197,94,0.3)] border border-[#22c55e]/20">
                                    Importaciones Premium
                                </div>
                                <h3 className="text-white text-3xl font-black italic uppercase tracking-tighter">
                                    {method === 'viajero' ? 'Tecnología Directa y Segura' : 'Cotiza, Compara y Gana'}
                                </h3>
                                <p className="text-slate-300 font-medium text-sm drop-shadow-md">
                                    GOSU IMPORT te ofrece las mejores opciones de importación directa desde Miami. Sin complicaciones, al instante.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}