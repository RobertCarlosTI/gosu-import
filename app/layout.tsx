import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import Navbar from './components/Navbar' // Asegúrate de que la ruta sea correcta

export const metadata: Metadata = {
  title: 'GOSU IMPORT',
  description: 'Tu aliado confiable para importaciones desde USA',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // 1. Envolvemos toda la app con Clerk y la configuramos en español
    <ClerkProvider>
      <html lang="es">
        <body className="bg-hero-space min-h-screen antialiased">
          
          {/* 2. Tu Navbar personalizado de Gosu Import */}
          <Navbar /> 
          
          {/* 3. Tu contenedor principal */}
          <main className="bg-transparent"> 
            {children}
          </main>

        </body>
      </html>
    </ClerkProvider>
  )
}