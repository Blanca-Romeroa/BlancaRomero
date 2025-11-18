import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import { ServicesSection } from "@/components/ServicesSection"; // Asegúrate de que sea así
import TestimonialsSection from "@/components/TestimonialsSection";
import Promise from "@/components/Promise";
import FAQ from "@/components/FAQ";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-transparent">
      <HeroSection />
      <AboutSection />
      <ServicesSection /> {/* Esta debe ser la nueva */}
      <TestimonialsSection />
      <Promise />
      <FAQ />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;