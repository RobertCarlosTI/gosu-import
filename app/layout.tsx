import type { Metadata } from 'next'
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
      <html lang="es">
        <body className="bg-hero-space min-h-screen antialiased">
          
          {/* Tu Navbar personalizado de Gosu Import */}
          <Navbar /> 
          
          {/* Tu contenedor principal */}
          <main className="bg-transparent"> 
            {children}
          </main>

        </body>
      </html>
  )
}