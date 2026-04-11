"use client"; // Importante: el layout ahora maneja estados
import React, { useState, useEffect } from 'react';
import './globals.css';
import Navbar from './components/Navbar';
import LoadingScreen from './components/LoadingScreen'; // El que creamos antes

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
  const yaCargo = sessionStorage.getItem('gosu_loaded');
  
  if (yaCargo) {
    setIsLoading(false); // Si ya entró antes, quitamos el delay
  } else {
    const timer = setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem('gosu_loaded', 'true');
    }, 3500);
    return () => clearTimeout(timer);
  }
}, []);

  return (
    <html lang="es">
      <body className="bg-[#070b12] min-h-screen antialiased">
        
        {/* PANTALLA DE CARGA */}
        {isLoading && <LoadingScreen />}

        {/* CONTENIDO DE LA WEB */}
        <div className={`transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
          <Navbar /> 
          <main className="bg-transparent"> 
            {children}
          </main>
        </div>

      </body>
    </html>
  );
}