// src/domain/logic/calculatorLogic.ts

export const TARIFA_CATALOGO = 12.00;

/**
 * Lógica para determinar la tarifa de flete general según el volumen mensual
 */
export const getTarifaByVolume = (volume: number): number => {
  if (volume >= 800) return 9.5;
  if (volume >= 700) return 10.5;
  if (volume >= 300) return 11.0;
  return 12.0; 
};

/**
 * Lógica de impuestos (Aduanas Perú)
 * FOB > $200 paga impuestos (aprox 28% total entre aranceles e IGV)
 * Se declara UNA SOLA VEZ para evitar el error 2451
 */
export const calculateTax = (fob: number): number => {
  return fob > 200 ? fob * 0.28 : 0;
};

// --- LÓGICA ESPECÍFICA PARA IPHONES (MÉTODO VIAJERO) ---

export type iPhoneModel = 
    | '13' | '13 Pro Max' 
    | '14' | '14 Pro Max' 
    | '15' | '15 Pro Max' 
    | '16' | '16 Pro Max' 
    | '17' | '17 Pro' | '17 Pro Max';

const TARIFAS_IPHONE: Record<iPhoneModel, { vip: number; normal: number }> = {
    '13': { vip: 60, normal: 75 },
    '13 Pro Max': { vip: 65, normal: 80 },
    '14': { vip: 70, normal: 85 },
    '14 Pro Max': { vip: 75, normal: 90 },
    '15': { vip: 80, normal: 95 },
    '15 Pro Max': { vip: 85, normal: 100 },
    '16': { vip: 90, normal: 105 },
    '16 Pro Max': { vip: 95, normal: 110 },
    '17': { vip: 100, normal: 115 },
    '17 Pro': { vip: 110, normal: 125 },
    '17 Pro Max': { vip: 120, normal: 135 },
};

export const getTarifaIphone = (modelo: iPhoneModel, esVip: boolean): number => {
    const precios = TARIFAS_IPHONE[modelo];
    // Manejo de error por si el modelo no existe en el registro
    if (!precios) return 12.0; 
    return esVip ? precios.vip : precios.normal;
};