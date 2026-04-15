"use client";
import React from 'react';
import { useCalculadora } from "@/src/presentation/hooks/useCalculadora";
import { Header } from "@/src/presentation/components/calculadora/Header";
import { MethodSelector } from "@/src/presentation/components/calculadora/MethodSelector";
import { CategorySelector } from "@/src/presentation/components/calculadora/CategorySelector";
import { ViajeroForm } from "@/src/presentation/components/calculadora/ViajeroForm";
import { PriceComparison } from "@/src/presentation/components/calculadora/PriceComparison";
import { WhatsAppPreview } from "@/src/presentation/components/calculadora/WhatsAppPreview";
import { PromoImage } from "@/src/presentation/components/calculadora/PromoImage";
import { RecommendedVendors } from "@/src/presentation/components/calculadora/RecommendedVendors";

export default function CalculadoraPage() {
    // TODA la lógica, VIP y cálculos vienen limpios desde tu Hook
    const hookData = useCalculadora();

    return (
        <main className="flex flex-col min-h-screen pt-24 pb-20 bg-[#0b1118] relative">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#22c55e]/5 rounded-full blur-[120px] pointer-events-none"></div>
            
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4">
                <Header title="Calcula tu Ahorro" />
                
                <div className="flex flex-col lg:flex-row gap-10 mt-10">
                    {/* COLUMNA IZQUIERDA: CONTROLES */}
                    <div className="w-full lg:w-3/5 space-y-6">
                        
                        <MethodSelector method={hookData.method} setMethod={hookData.handleMethodChange} />
                        
                        {hookData.method === 'viajero' && (
                            <>
                                <CategorySelector 
                                    category={hookData.vCategory} 
                                    setCategory={(c) => { hookData.setVCategory(c); hookData.setVCalculated(false); }} 
                                />
                                {hookData.vCategory === 'iPhone' && <ViajeroForm hookData={hookData} />}
                            </>
                        )}

                        {hookData.vCalculated && hookData.method === 'viajero' && (
                            <PriceComparison 
                                travelerPrice={hookData.displayTravelerTotal} 
                                regularPrice={hookData.displayRegularTotal} 
                                tc={hookData.TC_ACTUAL}
                                selectedMethod={hookData.selectedMethod}
                                onSelect={hookData.setSelectedMethod}
                            />
                        )}

                        {hookData.vCalculated && (
                            <WhatsAppPreview 
                                message={hookData.finalMsg} 
                                onSend={hookData.handleSend} 
                                disabled={!!hookData.errorViajero} 
                            />
                        )}
                    </div>
                    
                    {/* COLUMNA DERECHA: IMÁGENES Y PROVEEDORES */}
                    <div className="hidden lg:flex lg:flex-col lg:w-2/5 space-y-6">
                        <PromoImage method={hookData.method} />
                        <RecommendedVendors method={hookData.method} category={hookData.vCategory} />
                    </div>
                </div>
            </div>
        </main>
    );
}