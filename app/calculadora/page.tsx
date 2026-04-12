"use client";
import React from 'react';
import { useCalculadora } from "@/src/presentation/hooks/useCalculadora";
import { Header } from "@/src/presentation/components/calculadora/Header";
import { MethodSelector } from "@/src/presentation/components/calculadora/MethodSelector";
import { CategorySelector } from "@/src/presentation/components/calculadora/CategorySelector";
import { PriceComparison } from "@/src/presentation/components/calculadora/PriceComparison";
import { WhatsAppPreview } from "@/src/presentation/components/calculadora/WhatsAppPreview";
import { PromoImage } from "@/src/presentation/components/calculadora/PromoImage";
import { IPHONE_CATALOG, LOGISTICS_CONSTANTS } from '@/src/domain/constants/logistics';

export default function CalculadoraPage() {
    const { 
        method, setMethod, vCategory, setVCategory, vModel, setVModel,
        vValue, setVValue, vWeight, setVWeight, vCalculated, setVCalculated,
        selectedMethod, setSelectedMethod, whatsappMsg, handleWhatsAppClick,
        travelerPrice, regularPrice
    } = useCalculadora();

    return (
        <main className="flex flex-col min-h-screen pt-24 pb-20 bg-[#0b1118] relative">
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4">
                <Header title="Calcula tu Ahorro" />
                <div className="flex flex-col lg:flex-row gap-10">
                    <div className="w-full lg:w-3/5 space-y-6">
                        <MethodSelector method={method} setMethod={setMethod} />
                        
                        {method === 'viajero' && (
                            <>
                                <CategorySelector category={vCategory} setCategory={setVCategory} />
                                {vCategory === 'iPhone' ? (
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 bg-slate-900/40 p-6 rounded-[2rem] border border-white/10">
                                        {IPHONE_CATALOG.map((mod, i) => (
                                            <button key={i} onClick={() => { setVModel(mod); setVCalculated(true); setSelectedMethod('viajero'); }}
                                                className={`p-3 rounded-xl text-[10px] font-bold border transition-all ${vModel?.name === mod.name ? 'border-[#22c55e] bg-[#22c55e]/10' : 'border-white/5 bg-slate-900'}`}>
                                                {mod.name}
                                            </button>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="bg-slate-900/40 p-8 rounded-[2rem] border border-white/10 space-y-4">
                                        <input type="number" placeholder="Valor USD" value={vValue} onChange={e => setVValue(e.target.value)} className="w-full bg-slate-900 border border-white/10 p-4 rounded-xl" />
                                        <button onClick={() => setVCalculated(true)} className="bg-amber-500 text-black font-black p-4 rounded-xl w-full">CALCULAR</button>
                                    </div>
                                )}
                            </>
                        )}

                        {(vCalculated || method === 'courier') && (
                            <PriceComparison 
                                travelerPrice={travelerPrice} 
                                regularPrice={regularPrice} 
                                tc={LOGISTICS_CONSTANTS.TC}
                                selectedMethod={selectedMethod}
                                onSelect={setSelectedMethod}
                            />
                        )}

                        <WhatsAppPreview message={whatsappMsg} onSend={handleWhatsAppClick} disabled={!whatsappMsg.includes('TOTAL')} />
                    </div>
                    <div className="hidden lg:block lg:w-2/5"><PromoImage method={method} /></div>
                </div>
            </div>
        </main>
    );
}