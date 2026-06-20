import Navbar from "./_components/Navbar.tsx";
import Hero from "./_components/Hero.tsx";
import LabsSection from "./_components/LabsSection.tsx";
import ProductsSection from "./_components/ProductsSection.tsx";
import StatsSection from "./_components/StatsSection.tsx";
import TestimonialsSection from "./_components/TestimonialsSection.tsx";
import PartnersSection from "./_components/PartnersSection.tsx";
import CtaSection from "./_components/CtaSection.tsx";
import Footer from "./_components/Footer.tsx";

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <StatsSection />
      <LabsSection />
      <ProductsSection />
      <TestimonialsSection />
      <PartnersSection />
      <CtaSection />
      <Footer />
    </div>
  );
}
