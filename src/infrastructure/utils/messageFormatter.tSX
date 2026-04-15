// 🚀 Esta función se encarga UNICAMENTE de construir el texto
export const formatWhatsAppMessage = (data: any) => {
    const { method, isUserVIP, fob, peso, TC_ACTUAL, fleteCourier, TARIFA_KG, TARIFA_DESADUANAJE, impuestos, totalCourierServicio, clientType, vCategory, vModel, fleteViajero, displayTravelerTotal } = data;

    // --- CASO COURIER ---
    if (method === 'courier') {
        return `Hola, deseo una cotización - *Método Courier*
        
*Tipo Cliente:* ${isUserVIP ? 'VIP' : 'Normal'}
*USD:* $ ${fob.toFixed(2)}
*Peso:* ${peso.toFixed(2)} kg
*TC:* ${TC_ACTUAL.toFixed(2)}

*Flete ($${TARIFA_KG}/kg):* $ ${fleteCourier.toFixed(2)}
*Desaduanaje:* $ ${TARIFA_DESADUANAJE.toFixed(2)}${impuestos > 0 ? `\n*Impuestos (SUNAT):* $ ${impuestos.toFixed(2)}` : ''}

*TOTAL:* $ ${totalCourierServicio.toFixed(2)} | S/ ${(totalCourierServicio * TC_ACTUAL).toFixed(2)}

¿Me confirman si procedemos?`;
    } 

    // --- CASO VIAJERO (Limpio de peso como pediste) ---
    const tipoCliente = clientType === 'vip' ? 'VIP' : 'Normal';
    const producto = vCategory === 'iPhone' ? vModel?.name : vCategory;

    return `Hola Gosu, quiero cotizar un pedido por *Método Viajero*:

*Producto:* ${producto} (${tipoCliente})
*Valor Equipo (FOB):* $${fob.toFixed(2)}
*TC:* ${TC_ACTUAL.toFixed(2)}

*Inversión Total:* $${displayTravelerTotal.toFixed(2)} | S/ ${(displayTravelerTotal * TC_ACTUAL).toFixed(2)}

¿Me confirman si procedemos?`;
};