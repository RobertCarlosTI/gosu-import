import Hero from '../src/presentation/components/landing/Hero'
import InfoCards from '../src/presentation/components/shared/InfoCards'
import Pricing from '../src/presentation/components/shared/Princind' 
import HowItWorks from '../src/presentation/components/landing/HowItWorks'
import OurWork from '../src/presentation/components/landing/OurWork'
import Testimonials from '../src/presentation/components/landing/Testimonials'
import Faq from '../src/presentation/components/landing/Faq'
import Cta from '../src/presentation/components/landing/Cta'
import Footer from '../src/presentation/components/layout/Footer'

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Ya no necesitas el <Navbar /> aquí, el Layout lo pone por ti */}
      <Hero />
      <InfoCards />
      <Pricing />
      <HowItWorks />
      <OurWork />
      <Testimonials />
      <Faq />
      <Cta />
      <Footer />
    </div>
  )
}