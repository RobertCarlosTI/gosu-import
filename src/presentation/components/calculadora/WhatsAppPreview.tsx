import React from 'react';
import { FileText } from 'lucide-react';

interface Props {
    message: string;
    onSend: () => void;
    disabled: boolean;
}

export const WhatsAppPreview = ({ message, onSend, disabled }: Props) => {
    return (
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 md:p-8 shadow-xl mt-6">
            <h3 className="text-white text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                <FileText size={16} className="text-[#22c55e]"/> Previsualización del pedido
            </h3>
            
            <textarea 
                readOnly 
                value={message}
                className="w-full h-40 bg-slate-900/50 border border-white/5 rounded-xl p-4 text-slate-300 text-sm font-mono focus:outline-none resize-none mb-6 custom-scrollbar"
            />

            <button 
                onClick={onSend}
                disabled={disabled}
                className="w-full bg-[#ea580c] text-white px-10 py-5 rounded-xl font-black text-lg hover:bg-[#c2410c] transition-all shadow-lg active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-3 uppercase italic"
            >
                Contactar por WhatsApp
            </button>
        </div>
    );
};