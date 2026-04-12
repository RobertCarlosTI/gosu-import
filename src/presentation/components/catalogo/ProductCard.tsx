import React from 'react';
import { Plus, Minus, ShoppingBag } from 'lucide-react'; // Agregamos ShoppingBag para el icono

interface Props {
    product: any;
    qty: number;
    onAdd: (id: string) => void;
    onRemove: (id: string) => void;
}

export const ProductCard = ({ product, qty, onAdd, onRemove }: Props) => {
    // Verificación de seguridad visual (solo visual, no afecta tu lógica)
    const isAgotado = product.stock <= 0;

    return (
        <div className={`bg-[#0b0f1a] rounded-[1.5rem] p-4 flex flex-col items-start border transition-all duration-300 shadow-xl group ${qty > 0 ? 'border-amber-400/50 shadow-[0_0_15px_rgba(251,191,36,0.1)]' : 'border-white/5 hover:border-amber-400/30'}`}>

            {/* IMAGEN DEL PERFUME (Con el fondo blanco que pediste) */}
            <div className="w-full h-48 bg-white rounded-xl flex items-center justify-center mb-4 p-4 relative overflow-hidden shrink-0">
                <img 
                    src={product.image || product.imagen_url} 
                    alt={product.name} 
                    className={`w-full h-full object-contain transition-transform duration-300 ${isAgotado ? 'opacity-40 grayscale' : 'group-hover:scale-110'}`} 
                />
                
                {/* Sello visual de Agotado (Por si acaso lo necesitas) */}
                {isAgotado && (
                    <div className="absolute inset-0 bg-black/10 flex items-center justify-center backdrop-blur-[1px]">
                        <span className="bg-red-600 text-white font-black uppercase tracking-widest text-[10px] px-4 py-1.5 rounded-lg border border-red-400 shadow-2xl transform -rotate-12">
                            Agotado
                        </span>
                    </div>
                )}
            </div>

            {/* TEXTOS DE LA TARJETA */}
            <div className="flex flex-col flex-1 w-full">
                
                {/* MARCA EN VERDE */}
                <p className="text-[#22c55e] font-black text-[10px] uppercase tracking-widest mb-1">
                    {product.brand || product.marca || 'LATTAFA'}
                </p>
                
                {/* NOMBRE EN BLANCO */}
                <h3 className="font-bold text-sm leading-tight mb-4 h-10 line-clamp-2 text-white">
                    {product.name || product.nombre}
                </h3>
                
                {/* PRECIO EN BLANCO ITALICO */}
                <p className="text-2xl font-black italic mb-4 text-white">
                    S/ {Number(product.price || 0).toFixed(2)}
                </p>

                {/* CONTROLES DE CARRITO (Exactamente tu lógica) */}
                <div className="mt-auto w-full">
                    {isAgotado ? (
                        <button disabled className="w-full py-3.5 rounded-xl font-black text-[11px] uppercase tracking-widest bg-red-500/10 text-red-500 border border-red-500/20 cursor-not-allowed">
                            Sin Stock
                        </button>
                    ) : qty > 0 ? (
                        /* ESTADO: CUANDO YA AGREGASTE AL MENOS 1 (CONTADOR) */
                        <div className="flex items-center justify-between bg-amber-400 text-black rounded-xl p-1 shadow-[0_0_15px_rgba(251,191,36,0.3)]">
                            <button onClick={() => onRemove(product.id)} className="w-10 h-10 flex items-center justify-center hover:bg-black/10 rounded-lg transition-colors">
                                <Minus size={18} />
                            </button>
                            <span className="font-black text-sm">{qty}</span>
                            <button onClick={() => onAdd(product.id)} className="w-10 h-10 flex items-center justify-center hover:bg-black/10 rounded-lg transition-colors">
                                <Plus size={18} />
                            </button>
                        </div>
                    ) : (
                        /* ESTADO INICIAL: BOTÓN AMARILLO GOSU */
                        <button 
                            onClick={() => onAdd(product.id)} 
                            className="w-full py-3.5 rounded-xl font-black text-[11px] uppercase tracking-widest bg-amber-400 text-black hover:bg-amber-500 transition-all shadow-[0_0_15px_rgba(251,191,36,0.2)] hover:shadow-[0_0_20px_rgba(251,191,36,0.4)] flex items-center justify-center gap-2"
                        >
                            <ShoppingBag size={14} /> Agregar al pedido
                        </button>
                    )}
                </div>

            </div>
        </div>
    );
};