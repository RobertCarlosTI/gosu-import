import React from 'react';

export default function Footer() {
    return (
        <footer className="relative z-10 w-full border-t border-white/10 bg-[#070b12]/50 backdrop-blur-md pt-16 pb-8 px-4 mt-20">
            <div className="max-w-6xl mx-auto">
                
                {/* Contenedor Principal (3 Columnas) */}
                <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-10 md:gap-8 mb-12">
                    
                    {/* COLUMNA 1: Logo y Descripción */}
                    <div className="flex flex-col pr-0 md:pr-12">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 bg-[#22c55e] rounded-lg flex items-center justify-center text-[#0b1118]">
                                {/* Ícono de caja en verde */}
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1-.557-.939V4.227c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 .557.939v8.561ZM12 22.816a1.125 1.125 0 0 1-1.125.04l-7.108-4.061a1.125 1.125 0 0 1-.557-.939V9.295c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 .557.939v8.561Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.51v.001" />
                                </svg>
                            </div>
                            <span className="text-white text-xl font-black tracking-tight">GOSU <span className="text-[#22c55e]">IMPORT</span></span>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-sm">
                            Tu aliado confiable para importaciones desde Estados Unidos. Envío express en 3-7 días, tarifa plana de $12/kg, y ahorro del 7% en impuestos americanos.
                        </p>
                        {/* Redes Sociales */}
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-slate-400 hover:text-[#22c55e] hover:border-[#22c55e]/50 transition-all">
                                {/* Facebook SVG */}
                                <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-slate-400 hover:text-[#22c55e] hover:border-[#22c55e]/50 transition-all">
                                {/* Instagram SVG */}
                                <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"/></svg>
                            </a>
                        </div>
                    </div>

                    {/* COLUMNA 2: Enlaces Rápidos */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Enlaces rápidos</h4>
                        <ul className="flex flex-col gap-4 text-sm text-slate-400">
                            <li><a href="#" className="hover:text-[#22c55e] transition-colors">Mi primera Impo</a></li>
                            <li><a href="#" className="hover:text-[#22c55e] transition-colors">Servicios</a></li>
                            <li><a href="#" className="hover:text-[#22c55e] transition-colors">Cómo funciona</a></li>
                            <li><a href="#" className="hover:text-[#22c55e] transition-colors">Preguntas frecuentes</a></li>
                        </ul>
                    </div>

                    {/* COLUMNA 3: Contacto */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Contacto</h4>
                        <ul className="flex flex-col gap-5 text-sm text-slate-400">
                            {/* Email */}
                            <li className="flex items-start gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[#22c55e] shrink-0">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                </svg>
                                <a href="mailto:gosu.import01@gmail.com" className="hover:text-[#22c55e] transition-colors">gosu.import01@gmail.com</a>
                            </li>
                            {/* Teléfonos */}
                            <li className="flex items-start gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[#22c55e] shrink-0 mt-0.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.54-4.24-7.136-7.136l1.292-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                                </svg>
                                <div>
                                    <p>+51 907 024 684 (Perú)</p>
                                    <p>(786) 205-1018 (Miami)</p>
                                </div>
                            </li>
                            {/* Dirección */}
                            <li className="flex items-start gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[#22c55e] shrink-0 mt-0.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                                </svg>
                                <div>
                                    <p className="text-white font-medium mb-1">Almacén Miami:</p>
                                    <p>7255 NW 68th ST, Ste 14</p>
                                    <p>Miami, FL 33166</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Línea inferior (Copyright y legales) */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                    <p>© 2026 GOSU IMPORT. Todos los derechos reservados.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-[#22c55e] transition-colors">Términos y condiciones</a>
                        <a href="#" className="hover:text-[#22c55e] transition-colors">Política de privacidad</a>
                    </div>
                </div>

            </div>
        </footer>
    );
}