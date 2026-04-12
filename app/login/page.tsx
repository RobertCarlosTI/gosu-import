import React from 'react';

// Lo dejamos genérico (any) para que acepte los datos sin chocar
export const ProductCard = (props: any) => {

    // 1. EL TRUCO MAESTRO: Atrapamos el perfume sin importar si tu catálogo
    // se lo pasa como 'prod', 'producto', 'product' o 'item'.
    const perfume = props.prod || props.producto || props.product || props.item;

    // 2. FILTRO DE SEGURIDAD: Si por error de la base de datos llega un perfume vacío,
    // simplemente no dibujamos la tarjeta y evitamos la pantalla roja de error.
    if (!perfume) return null;

    // 3. LÓGICA DE STOCK (Ahora sí, 100% seguro)
    const isAgotado = perfume.stock <= 0;

    return (
        <div className="bg-[#111620] rounded-[1.5rem] p-4 flex flex-col items-start border border-white/5 relative overflow-hidden group hover:border-amber-400/20 transition-colors">

            {/* FOTO DEL PERFUME */}
            <div className="w-full h-48 bg-gradient-to-b from-[#1a202c] to-[#0b0f1a] rounded-xl flex items-center justify-center mb-4 p-4 relative">
                {/* Si está agotado, bajamos opacidad y ponemos blanco y negro */}
                <img 
                    src={perfume.image || perfume.imagen_url} 
                    alt={perfume.name || perfume.nombre} 
                    className={`w-full h-full object-contain transition-all ${isAgotado ? 'opacity-40 grayscale' : 'group-hover:scale-105'}`} 
                />

                {/* SELLO DE AGOTADO */}
                {isAgotado && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="bg-red-500 text-white font-black uppercase tracking-widest text-xs px-4 py-1.5 rounded-lg border border-red-400 shadow-[0_0_15px_rgba(239,68,68,0.5)] transform -rotate-12">
                            Agotado
                        </span>
                    </div>
                )}
            </div>

            {/* MARCA */}
            <p className="text-[#22c55e] font-black text-[10px] uppercase tracking-widest mb-1">
                {perfume.marca || 'LATTAFA'}
            </p>

            {/* NOMBRE DEL PERFUME */}
            <h3 className="text-sm font-bold text-slate-200 leading-tight mb-4 min-h-[40px]">
                {perfume.name || perfume.nombre}
            </h3>

            {/* PRECIO Y BOTÓN DE ACCIÓN */}
            <div className="mt-auto w-full space-y-4">
                <p className="text-2xl font-black text-white italic tracking-tighter">
                    S/ {Number(perfume.price || perfume.precio).toFixed(2)}
                </p>

                <button
                    disabled={isAgotado}
                    // Ejecuta la función del carrito solo si existe
                    onClick={() => props.onAdd && props.onAdd(perfume)} 
                    className={`w-full py-3.5 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all ${
                        isAgotado
                            ? 'bg-red-500/10 text-red-500 cursor-not-allowed border border-red-500/20' 
                            : 'bg-[#1a2333] hover:bg-amber-400 hover:text-black text-slate-300 border border-white/10 shadow-lg'
                    }`}
                >
                    {isAgotado ? 'Sin Stock' : 'Agregar al Pedido'}
                </button>
            </div>
            
        </div>
    );
};