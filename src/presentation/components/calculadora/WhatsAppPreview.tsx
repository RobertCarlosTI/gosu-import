import React from 'react';
import { FileText, MessageCircle } from 'lucide-react';

interface Props {
    message: string;
    onSend: () => void;
    disabled: boolean;
}

export const WhatsAppPreview = ({ message, onSend, disabled }: Props) => {
    return (
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-6 md:p-8 shadow-2xl mt-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <h3 className="text-white text-[10px] font-black uppercase tracking-[0.2em] mb-6 flex items-center gap-2 italic">
                <FileText size={14} className="text-[#22c55e]"/> Previsualización del pedido Gosu
            </h3>
            
            <textarea 
                readOnly 
                value={message}
                className="w-full h-48 bg-[#070b12] border border-white/5 rounded-[1.5rem] p-6 text-slate-400 text-xs font-mono focus:outline-none resize-none mb-8 custom-scrollbar leading-relaxed"
            />

            <button 
                onClick={onSend}
                disabled={disabled}
                className="w-full bg-[#22c55e] hover:bg-[#1ea950] text-[#070b12] py-6 rounded-[1.5rem] font-black text-sm transition-all shadow-[0_10px_30px_rgba(34,197,94,0.2)] active:scale-95 disabled:opacity-20 disabled:grayscale disabled:cursor-not-allowed flex items-center justify-center gap-3 uppercase italic tracking-widest"
            >
                <MessageCircle size={20} /> Solicitar vía WhatsApp
            </button>
        </div>
    );
};