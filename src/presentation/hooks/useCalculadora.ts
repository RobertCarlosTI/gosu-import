import { useState, useEffect } from 'react';
import { LOGISTICS_CONSTANTS, IPHONE_CATALOG } from '@/src/domain/constants/logistics';

export const useCalculadora = () => {
    const [method, setMethod] = useState<'viajero' | 'courier'>('viajero');
    const [vCategory, setVCategory] = useState<'iPhone' | 'iPad' | 'Laptops' | 'Otros'>('iPhone');
    const [vModel, setVModel] = useState<any>(null);
    const [vValue, setVValue] = useState('');
    const [vWeight, setVWeight] = useState('');
    const [vCalculated, setVCalculated] = useState(false);

    const [cValue, setCValue] = useState('');
    const [cWeight, setCWeight] = useState('');
    const [cCalculated, setCCalculated] = useState(false);
    const [cExtras] = useState({ reempaquetado: false, cambio: false, embalaje: false });

    const [selectedMethod, setSelectedMethod] = useState<'viajero' | 'regular' | null>(null);
    const [whatsappMsg, setWhatsappMsg] = useState("");

    const applyMinimumWeight = (wStr: string) => {
        const w = parseFloat(wStr) || 0;
        return w > 0 ? Math.max(1, w) : 0;
    };

    const calculateRegular = (weightStr: string, valueStr: string) => {
        const w = applyMinimumWeight(weightStr);
        const v = parseFloat(valueStr) || 0;
        const flete = w * 9;
        const desaduanaje = w > 0 ? 9 : 0;
        const taxes = v > 200 ? v * 0.28 : 0;
        return { flete, desaduanaje, taxes, total: flete + desaduanaje + taxes, weightUsed: w };
    };

    const calculateViajeroPrice = () => {
        const v = parseFloat(vValue) || 0;
        const w = applyMinimumWeight(vWeight);
        let basePrice = 0;
        if (vCategory === 'Laptops') basePrice = v * 0.25;
        else if (vCategory === 'iPad') basePrice = v * 0.20;
        else if (vCategory === 'Otros') basePrice = w * LOGISTICS_CONSTANTS.TARIFA_VIAJERO_KG;
        return basePrice > 0 ? Math.max(LOGISTICS_CONSTANTS.MINIMO_VIAJERO, basePrice) : 0;
    };

    const getComparisonWeight = () => {
        if (vCategory === 'Otros') return applyMinimumWeight(vWeight);
        return LOGISTICS_CONSTANTS.PESO_ESTANDAR[vCategory as keyof typeof LOGISTICS_CONSTANTS.PESO_ESTANDAR] || 1;
    };

    // Lógica del generador de mensajes de WhatsApp
    useEffect(() => {
        let msg = "";
        const { TC } = LOGISTICS_CONSTANTS;

        if (!selectedMethod && method === 'viajero') {
            msg = `Hola, deseo una cotización. ¿Me confirmas disponibilidad?`;
        } else if (method === 'viajero') {
            if (vCategory === 'iPhone' && vModel) {
                const isRegular = selectedMethod === 'regular';
                const currentMethodName = isRegular ? "Courier Regular" : "Método Viajero";
                msg = `Hola, deseo una cotización - ${currentMethodName}\n\nPaquete: ${vModel.name}\nUSD: $${isRegular ? vModel.estValue.toFixed(2) : vModel.price.toFixed(2)}\nTC: ${TC.toFixed(4)}\n\nMétodo: ${currentMethodName}\n`;
                if (isRegular) {
                    const reg = calculateRegular(LOGISTICS_CONSTANTS.PESO_ESTANDAR['iPhone'].toString(), vModel.estValue.toString());
                    msg += `TOTAL: $${reg.total.toFixed(2)} | S/ ${(reg.total * TC).toFixed(2)}\n\n`;
                } else {
                    msg += `TOTAL: $${vModel.price.toFixed(2)} | S/ ${(vModel.price * TC).toFixed(2)}\n\n`;
                }
            } else if (vCalculated) {
                const val = parseFloat(vValue) || 0;
                const isRegular = selectedMethod === 'regular';
                const currentMethodName = isRegular ? "Courier Regular" : "Método Viajero";
                msg = `Hola, deseo una cotización - ${currentMethodName}\n\nPaquete: ${vCategory}\nUSD: $${val.toFixed(2)}\nTC: ${TC.toFixed(4)}\n\nMétodo: ${currentMethodName}\n`;
                if (isRegular) {
                    const reg = calculateRegular(getComparisonWeight().toString(), vValue);
                    msg += `TOTAL: $${reg.total.toFixed(2)} | S/ ${(reg.total * TC).toFixed(2)}\n\n`;
                } else {
                    const vPrice = calculateViajeroPrice();
                    msg += `TOTAL: $${vPrice.toFixed(2)} | S/ ${(vPrice * TC).toFixed(2)}\n\n`;
                }
            }
            msg += `¿Me confirmas disponibilidad?`;
        } else if (cCalculated) {
            const reg = calculateRegular(cWeight, cValue);
            msg = `Hola, deseo cotización Courier\nPaquete: Envío por peso\nUSD: $${parseFloat(cValue).toFixed(2)}\nPeso: ${reg.weightUsed}kg\nTOTAL: $${reg.total.toFixed(2)}\n¿Disponibilidad?`;
        }
        setWhatsappMsg(msg);
    }, [method, vCategory, vModel, vValue, vWeight, vCalculated, cValue, cWeight, cCalculated, selectedMethod]);

    const handleWhatsAppClick = () => {
        window.open(`https://wa.me/${LOGISTICS_CONSTANTS.WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMsg)}`, '_blank');
    };

    return {
        method, setMethod, vCategory, setVCategory, vModel, setVModel,
        vValue, setVValue, vWeight, setVWeight, vCalculated, setVCalculated,
        cValue, setCValue, cWeight, setCWeight, cCalculated, setCCalculated,
        selectedMethod, setSelectedMethod, whatsappMsg, handleWhatsAppClick,
        travelerPrice: vCategory === 'iPhone' ? vModel?.price || 0 : calculateViajeroPrice(),
        regularPrice: vCategory === 'iPhone' ? calculateRegular(LOGISTICS_CONSTANTS.PESO_ESTANDAR['iPhone'].toString(), vModel?.estValue.toString()).total : calculateRegular(getComparisonWeight().toString(), vValue).total
    };
};