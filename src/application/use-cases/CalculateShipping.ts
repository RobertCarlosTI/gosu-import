import { LOGISTICS_CONSTANTS } from "@/src/domain/constants/logistics";

export const calculateRegularCourier = (weight: number, value: number) => {
    const w = weight > 0 ? Math.max(1, weight) : 0;
    const flete = w * 9;
    const desaduanaje = w > 0 ? 9 : 0;
    const taxes = value > 200 ? value * 0.28 : 0;
    
    return {
        flete,
        desaduanaje,
        taxes,
        total: flete + desaduanaje + taxes,
        weightUsed: w
    };
};

export const calculateViajero = (category: string, value: number, weight: number) => {
    const w = weight > 0 ? Math.max(1, weight) : 0;
    let basePrice = 0;

    if (category === 'Laptops') basePrice = value * 0.25;
    else if (category === 'iPad') basePrice = value * 0.20;
    else if (category === 'Otros') basePrice = w * LOGISTICS_CONSTANTS.TARIFA_VIAJERO_KG;

    return basePrice > 0 ? Math.max(LOGISTICS_CONSTANTS.MINIMO_VIAJERO, basePrice) : 0;
};