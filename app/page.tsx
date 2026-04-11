import Hero from './components/Hero'
import InfoCards from './components/InfoCards'
import MiamiAddress from './components/MiamiAddress'
import Pricing from './components/Princind' 
import HowItWorks from './components/HowItWorks'
import FirstImport from './components/FirstImport'
import OurWork from './components/OurWork'
import Testimonials from './components/Testimonials'
import Faq from './components/Faq'
import Cta from './components/Cta'
import Footer from './components/Footer'

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Ya no necesitas el <Navbar /> aquí, el Layout lo pone por ti */}
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
    </div>
  )
}