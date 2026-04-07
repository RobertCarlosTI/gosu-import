import './globals.css'
import Navbar from './components/Navbar'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      {/* 1. Agregamos "bg-hero-space" al body. 
          2. Quitamos "font-sans" para que use el Arial que pusimos en globals.css 
      */}
      <body className="bg-hero-space min-h-screen antialiased">
        <Navbar /> 
        
        {/* Mantenemos el padding-top para el Navbar, 
            pero el main debe ser transparente para ver el fondo del body 
        */}
        <main className="pt-20 bg-transparent"> 
          {children}
        </main>
      </body>
    </html>
  )
}