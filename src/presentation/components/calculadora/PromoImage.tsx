import React from 'react';

interface Props {
    method: 'viajero' | 'courier';
}

export const PromoImage = ({ method }: Props) => {
    const images = {
        viajero: "https://res.cloudinary.com/df7ezgej5/image/upload/v1741235123/viajero_vv4rip.jpg",
        courier: "https://res.cloudinary.com/df7ezgej5/image/upload/v1741235123/cajas_xuq1j4.jpg"
    };

    return (
        <div className="relative h-[850px] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl backdrop-blur">
            <img 
                src={method === 'viajero' ? images.viajero : images.courier} 
                className="w-full h-full object-cover transition-opacity duration-500"
                alt="Logística Gosu Import"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1118] via-[#0b1118]/60 to-transparent"></div>
            <div className="absolute bottom-12 left-10 right-10 text-center space-y-3">
                <div className="inline-block bg-[#22c55e]/15 text-[#22c55e] font-black uppercase italic tracking-widest px-6 py-2 rounded-full text-xs border border-[#22c55e]/20">
                    Importaciones Premium
                </div>
                <h3 className="text-white text-3xl font-black italic uppercase tracking-tighter">
                    {method === 'viajero' ? 'Tecnología Directa y Segura' : 'Cotiza, Compara y Gana'}
                </h3>
            </div>
        </div>
    );
};