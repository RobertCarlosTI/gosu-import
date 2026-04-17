import { useState } from 'react';
import { getTarifaIphone, calculateTax } from '@/src/domain/logic/calculatorLogic';

export const useCalculadora = () => {
    const [modelo, setModelo] = useState<any>('16 Pro Max');
    const [fob, setFob] = useState<number>(0);
    const [esVip, setEsVip] = useState<boolean>(false);

    const fleteTotal = getTarifaIphone(modelo, esVip);
    const impuestos = calculateTax(fob);
    const total = fleteTotal + impuestos;

    return {
        modelo, setModelo,
        fob, setFob,
        esVip, setEsVip,
        results: {
            fleteTotal,
            impuestos,
            total,
            fob
        }
    };
};