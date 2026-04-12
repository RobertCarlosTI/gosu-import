import React from 'react';

// ==========================================
// 1. BASE DE DATOS DE TU TRABAJO
// ==========================================
const PORTFOLIO_DATA = {
    videos: [
        {
            id: 1,
            title: "IMPORTACION DE IPHONE 13 PRO CON CARGADORES AIRPOTS PRO",
            videoSrc: "https://res.cloudinary.com/dq30qb1za/video/upload/v1775601701/WhatsApp_Video_2026-04-07_at_5.03.14_PM_1_cu1hhr.mp4", 
            thumbnail: "https://res.cloudinary.com/dq30qb1za/video/upload/v1775601701/WhatsApp_Video_2026-04-07_at_5.03.14_PM_1_cu1hhr.mp4", 
        },
        {
            id: 2,
            title: "IMPORTACION IPHONE 16 PRO MAX ",
            videoSrc: "https://res.cloudinary.com/dq30qb1za/video/upload/v1775601572/WhatsApp_Video_2026-04-07_at_5.03.14_PM_vpe6dy.mp4",
            thumbnail: "https://res.cloudinary.com/dq30qb1za/video/upload/v1775601572/WhatsApp_Video_2026-04-07_at_5.03.14_PM_vpe6dy.mp4",
        },
        {
            id: 3,
            title: "CONSOLIDADO IPHONE ",
            videoSrc: "https://i.gyazo.com/6b6625df38ffd8a0ec06cec2af806c25.jpg",
            thumbnail: "https://i.gyazo.com/6b6625df38ffd8a0ec06cec2af806c25.jpg",
        }
    ],
    photos: [
        "https://i.gyazo.com/27e732609e05803b6019dc4ea2c5eff9.png",
        "https://i.gyazo.com/10c24d136a040aa665c5b747f3f3cb3f.png",
        "https://i.gyazo.com/eecbbb3ad374a92c560eb430f868b04e.png",
        "https://i.gyazo.com/2a2f1cfc806ab280b9be308128d71daf.png"
    ]
};

export default function OurWork() {
    return (
        <section className="relative z-10 w-full max-w-6xl mx-auto py-24 px-4 bg-transparent text-center">
            
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#22c55e]/20 bg-[#22c55e]/10 text-slate-300 text-sm font-medium mb-6 shadow-[0_0_20px_rgba(34,197,94,0.1)]">
                <span className="text-[#22c55e] text-lg">📦</span> +500 entregas exitosas
            </div>
            
            <h2 className="text-white text-3xl md:text-5xl font-bold mb-4 tracking-tight">Nuestro Trabajo</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-16">
                Miles de clientes satisfechos reciben sus paquetes cada semana. Mira cómo trabajamos.
            </p>

            {/* ==========================================
                SECCIÓN VIDEOS (TAMAÑO FORZADO ESTRICTO)
            ========================================== */}
            <div className="text-left mb-16">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-[#22c55e]/20 rounded-xl flex items-center justify-center text-[#22c55e]">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <h3 className="text-white text-2xl font-bold">Videos de Entregas</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                    {PORTFOLIO_DATA.videos.map((video) => (
                        <div 
                            key={video.id}
                            className="bg-[#111827] border border-white/10 rounded-3xl flex flex-col overflow-hidden shadow-lg group hover:border-[#22c55e]/40 transition-colors"
                        >
                            {/* CONTENEDOR BLINDADO: Altura fija de 400px y fondo negro */}
                            <div className="relative w-full h-[400px] bg-black flex-shrink-0">
                                <video 
                                    src={video.videoSrc} 
                                    poster={video.thumbnail}
                                    controls 
                                    preload="metadata"
                                    className="absolute inset-0 w-full h-full object-contain"
                                >
                                    Tu navegador no soporta el formato de video.
                                </video>
                            </div>
                            
                            {/* Título que ocupa el resto del espacio disponible */}
                            <div className="p-5 bg-gradient-to-t from-[#0b1118] to-[#111827] border-t border-white/5 flex-grow flex items-center justify-center text-center">
                                <span className="text-white text-sm font-bold tracking-wide group-hover:text-[#22c55e] transition-colors line-clamp-2">
                                    {video.title}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ==========================================
                SECCIÓN FOTOS AUTOMATIZADA
            ========================================== */}
            <div className="text-left mb-16">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-[#22c55e]/20 rounded-xl flex items-center justify-center text-[#22c55e] text-xl">
                        📸
                    </div>
                    <h3 className="text-white text-2xl font-bold">Galería Reciente</h3>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {PORTFOLIO_DATA.photos.map((photoUrl, index) => (
                        <div key={index} className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 group cursor-pointer shadow-lg bg-[#111827]">
                            <img 
                                src={photoUrl} 
                                alt={`Entrega Gosu Import ${index + 1}`} 
                                className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" 
                            />
                            <div className="absolute inset-0 bg-[#22c55e]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        </div>
                    ))}
                </div>
            </div>

        </section>
    );
}