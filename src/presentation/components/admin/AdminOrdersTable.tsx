"use client";
import React, { useState } from 'react';
import { useAdminOrders } from "@/src/presentation/hooks/useAdminOrders";
import { Package, Loader2, Trash2, Calendar, Image as ImageIcon, Copy, CheckCircle2 } from 'lucide-react';

export const AdminOrdersTable = () => {
    const { orders, loading, handleUpdateStatus, handleDeleteOrder } = useAdminOrders();
    const [copiadoId, setCopiadoId] = useState<string | null>(null);

    const handleCopiarDatos = (order: any) => {
        const detalles = order.detalle_orden_perfumes?.map((d: any) => `- ${d.cantidad}x ${d.nombre_perfume}`).join('\n') || 'Sin detalles';
        // Agregamos el método de pago al mensaje de WhatsApp
        const texto = `📦 *PEDIDO GOSU IMPORT*\n\n👤 *Cliente:* ${order.nombre_cliente || 'Sin Nombre'}\n📱 *Teléfono:* ${order.telefono || 'No registrado'}\n💳 *DNI:* ${order.dni || 'No registrado'}\n💸 *Pago:* ${order.metodo_pago?.toUpperCase() || 'NO ESPECIFICADO'}\n\n📍 *Envío:* ${order.tipo_envio?.toUpperCase() || 'NO DEFINIDO'}\n🏙️ *Destino:* ${order.distrito || order.sucursal_shalom || 'No especificado'}\n🏠 *Dirección Exacta:* ${order.direccion || 'N/A'}\n\n🛍️ *MERCADERÍA:*\n${detalles}\n\n💰 *TOTAL A COBRAR:* S/ ${Number(order.inversion_total || 0).toFixed(2)}`;
        
        navigator.clipboard.writeText(texto);
        setCopiadoId(order.id);
        setTimeout(() => setCopiadoId(null), 2000);
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center p-20 space-y-4">
            <Loader2 className="animate-spin text-amber-400" size={40} />
            <p className="text-slate-500 font-black uppercase tracking-widest text-xs italic">Generando Panel de Despacho...</p>
        </div>
    );

    return (
        <div className="flex flex-col gap-6 animate-in fade-in duration-500">
            {orders.length === 0 ? (
                <div className="bg-[#161b22] p-20 rounded-[2rem] text-center border border-dashed border-white/10">
                    <p className="text-slate-500 font-black uppercase italic tracking-widest">No hay órdenes para despachar.</p>
                </div>
            ) : (
                orders.map((order) => (
                    <div key={order.id} className="bg-[#161b22] rounded-[2rem] border border-white/5 p-6 md:p-8 flex flex-col lg:flex-row gap-8 hover:border-amber-400/30 transition-all shadow-xl relative overflow-hidden">
                        
                        {/* Indicador lateral de estado */}
                        <div className={`absolute left-0 top-0 w-1.5 h-full ${order.estado_pago === 'Completado' ? 'bg-green-500' : order.estado_pago === 'Enviado' ? 'bg-blue-500' : 'bg-amber-400'}`}></div>

                        {/* =========================================
                            COLUMNA IZQUIERDA: RESUMEN WHATSAPP
                        ========================================= */}
                        <div className="w-full lg:w-1/3 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/5 pb-6 lg:pb-0 lg:pr-8 pl-4">
                            
                            <div className="bg-black/20 p-6 rounded-2xl border border-white/5 space-y-4 shadow-inner">
                                
                                {/* Bloque 1: Cliente y Finanzas */}
                                <div className="space-y-2 border-b border-white/5 pb-4">
                                    <p className="text-sm text-slate-300 flex items-center gap-3">
                                        <span className="text-lg">👤</span> 
                                        <span className="font-bold text-slate-500 uppercase w-20">Cliente:</span> 
                                        <span className="font-black text-white uppercase italic truncate">{order.nombre_cliente || 'Sin Nombre'}</span>
                                    </p>
                                    <p className="text-sm text-slate-300 flex items-center gap-3">
                                        <span className="text-lg">📱</span> 
                                        <span className="font-bold text-slate-500 uppercase w-20">Teléfono:</span> 
                                        <span className="font-bold text-amber-400">{order.telefono || 'No registrado'}</span>
                                    </p>
                                    <p className="text-sm text-slate-300 flex items-center gap-3">
                                        <span className="text-lg">💳</span> 
                                        <span className="font-bold text-slate-500 uppercase w-20">DNI:</span> 
                                        <span className="font-bold text-slate-200">{order.dni || 'No registrado'}</span>
                                    </p>
                                    {/* NUEVO: Método de Pago */}
                                    <p className="text-sm text-slate-300 flex items-center gap-3">
                                        <span className="text-lg">💸</span> 
                                        <span className="font-bold text-slate-500 uppercase w-20">Pago:</span> 
                                        <span className="font-black text-green-400 uppercase">{order.metodo_pago?.replace('_', ' ') || 'NO REGISTRADO'}</span>
                                    </p>
                                </div>

                                {/* Bloque 2: Logística */}
                                <div className="space-y-2 pt-1">
                                    <p className="text-sm text-slate-300 flex items-center gap-3">
                                        <span className="text-lg">📍</span> 
                                        <span className="font-bold text-slate-500 uppercase w-20">Envío:</span> 
                                        <span className="font-black text-white uppercase">{order.tipo_envio || 'NO DEFINIDO'}</span>
                                    </p>
                                    <p className="text-sm text-slate-300 flex items-start gap-3">
                                        <span className="text-lg">🏙️</span> 
                                        <span className="font-bold text-slate-500 uppercase w-20">Destino:</span> 
                                        <span className="font-bold text-amber-400">{order.distrito || order.sucursal_shalom || 'No especificado'}</span>
                                    </p>
                                    {order.direccion && (
                                        <div className="flex items-start gap-3 mt-2 bg-white/5 p-3 rounded-xl border border-white/10">
                                            <span className="text-lg">🏠</span> 
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-0.5">Dirección Exacta</span>
                                                <span className="text-sm font-medium italic text-slate-300">{order.direccion}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Fecha de registro */}
                                <div className="pt-2 flex items-center gap-2 text-[10px] text-slate-500 font-bold italic uppercase justify-end">
                                    <Calendar size={12} /> {new Date(order.created_at).toLocaleDateString()} - {new Date(order.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                </div>
                            </div>

                        </div>

                        {/* =========================================
                            COLUMNA DERECHA: PERFUMES Y FINANZAS
                        ========================================= */}
                        <div className="w-full lg:w-2/3 flex flex-col">
                            
                            {/* Cabecera Perfumes */}
                            <div className="flex justify-between items-center mb-4">
                                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest flex items-center gap-2">
                                    <Package size={14} className="text-amber-400"/> Detalle de Mercadería ({order.detalle_orden_perfumes?.length || 0})
                                </p>
                                <button 
                                    onClick={() => handleCopiarDatos(order)}
                                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-white/5 hover:bg-amber-400 hover:text-black text-slate-400 px-3 py-1.5 rounded-lg transition-colors border border-white/10"
                                >
                                    {copiadoId === order.id ? <><CheckCircle2 size={14}/> Copiado</> : <><Copy size={14}/> Copiar Info</>}
                                </button>
                            </div>

                            {/* Lista de Perfumes a todo lo ancho */}
                            <div className="flex-1 space-y-2 mb-6 select-none max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                {order.detalle_orden_perfumes?.map((d: any) => {
                                    const imgUrl = d.perfumes?.imagen_url || d.perfumes?.image || null;
                                    return (
                                        <div key={d.id} className="bg-black/20 p-3 rounded-xl flex items-center gap-4 border border-white/5 hover:bg-white/5 transition-colors">
                                            <div className="w-12 h-12 bg-[#0b0f1a] rounded-lg border border-white/10 flex items-center justify-center shrink-0 overflow-hidden">
                                                {imgUrl ? <img src={imgUrl} alt={d.nombre_perfume} className="w-full h-full object-cover" /> : <ImageIcon size={20} className="text-slate-600" />}
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-bold text-white uppercase tracking-wide">
                                                    {d.nombre_perfume}
                                                </p>
                                            </div>
                                            <div className="px-4 text-right">
                                                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Cant.</p>
                                                <p className="text-lg font-black text-amber-400">x{d.cantidad}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Footer: Finanzas y Controles */}
                            <div className="mt-auto border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                                
                                {/* Monto Total */}
                                <div>
                                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Total a Recaudar</p>
                                    <p className="text-3xl font-black text-white italic tracking-tighter">
                                        S/ <span className="text-amber-400">{Number(order.inversion_total || 0).toFixed(2)}</span>
                                    </p>
                                </div>

                                {/* Controles de Acción */}
                                <div className="flex items-center gap-3 w-full md:w-auto">
                                    <select 
                                        value={order.estado_pago || 'Pendiente WhatsApp'}
                                        onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                                        className={`flex-1 md:w-48 border rounded-xl p-3.5 text-xs font-black uppercase outline-none cursor-pointer transition-colors shadow-lg
                                            ${order.estado_pago === 'Completado' ? 'bg-green-500/10 border-green-500/30 text-green-400' : 
                                              order.estado_pago === 'Enviado' ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' : 
                                              'bg-[#0b0f1a] border-amber-400/30 text-amber-400 focus:border-amber-400'}`}
                                    >
                                        <option value="Pendiente WhatsApp">⚠️ Pendiente</option>
                                        <option value="Pago Verificado">✅ Verificado</option>
                                        <option value="Enviado">🚚 Enviado</option>
                                        <option value="Completado">🏆 Completado</option>
                                    </select>

                                    <button 
                                        onClick={() => handleDeleteOrder(order.id)}
                                        className="bg-[#0b0f1a] border border-white/10 p-3.5 rounded-xl text-slate-500 hover:text-red-500 hover:border-red-500/50 hover:bg-red-500/10 transition-all flex-shrink-0 shadow-lg group"
                                        title="Eliminar Orden"
                                    >
                                        <Trash2 size={18} className="group-hover:scale-110 transition-transform" />
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                ))
            )}
        </div>
    );
};