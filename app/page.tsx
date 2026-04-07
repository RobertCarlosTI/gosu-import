import Navbar from './components/Navbar'
import Hero from './components/Hero'
import InfoCards from './components/InfoCards'
import MiamiAddress from './components/MiamiAddress'
import Pricing from './components/Princind' // O Pricing si lo renombras
import HowItWorks from './components/HowItWorks'
import FirstImport from './components/FirstImport'
import OurWork from './components/OurWork'
import Testimonials from './components/Testimonials'
import Faq from './components/Faq'
import Cta from './components/Cta'
import Footer from './components/Footer'

export default function Home() {
  return (
    <main className="flex flex-col">
      <Navbar />
      <Hero />
      <InfoCards />
      <MiamiAddress />
      <Pricing />
      <HowItWorks />
      <FirstImport />
      <OurWork />
      <Testimonials />
      <Faq />
      <Cta />
      <Footer />
    </main>
  )
}