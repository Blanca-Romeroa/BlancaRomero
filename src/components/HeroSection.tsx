import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contacto');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent">
      {/* Fondo con gradiente animado - ahora transparente */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-[#D4BAAC]/10 animate-float"></div>
      </div>
      
      {/* Contenido principal */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Imagen logo - 50% más grande y bajado un poco */}
          <div className="mb-6">
            <img 
              src="/logo.webp" 
              alt="Logo Dra. Blanca Romero" 
              className="w-72 h-72 mx-auto rounded-full object-cover shadow-lg"
            />
          </div>
          
          {/* Título principal */}
          <h1 className="font-pinyon text-5xl sm:text-6xl lg:text-7xl text-yellow-500 mb-6 leading-tight">
            Dra. Blanca Romero
          </h1>
          
          {/* Subtítulo */}
          <p className="font-taviraj text-xl sm:text-2xl lg:text-3xl text-[#D4BAAC] mb-8 max-w-3xl mx-auto leading-relaxed">
            Medicina estética y regenerativa con un enfoque humano y personalizado
          </p>
          
          {/* Botón CTA */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Button 
              size="lg" 
              className="bg-[#D4BAAC] hover:bg-[#C4A490] text-black font-quicksand font-semibold px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              onClick={scrollToContact}
            >
              Agendar cita
            </Button>
          </div>
        </div>
      </div>
      
      {/* Elementos decorativos */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-[#D4BAAC]/20 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-[#C4A490]/20 rounded-full blur-xl animate-float" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-[#D4BAAC]/30 rounded-full blur-lg animate-float" style={{animationDelay: '2s'}}></div>
    </section>
  );
}