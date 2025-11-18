import { useEffect, useRef, useState } from "react";

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Imagen de la doctora */}
          <div className={`transition-all duration-800 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="relative">
              <div className="aspect-[4/5] bg-gradient-to-br from-[#CEA663]/20 to-[#CEA663]/30 rounded-2xl shadow-elegant overflow-hidden backdrop-blur-sm">
                <div className="w-full h-full bg-gradient-to-br from-[#CEA663]/40 to-[#CEA663]/60 flex items-center justify-center p-2">
                  <div className="text-center text-[#CEA663]/60 w-full h-full">
                    <div className="w-full h-full flex items-center justify-center">
                      <img 
                        src="/doctora-blanca-romero.webp" 
                        alt="Dra. Blanca Romero" 
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>
                    <p className="font-taviraj text-lg text-white mt-2">Dra. Blanca Romero</p>
                  </div>
                </div>
              </div>
              {/* Elemento decorativo */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-[#CEA663]/20 rounded-full blur-xl"></div>
            </div>
          </div>

          {/* Contenido de texto */}
          <div className={`transition-all duration-800 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="space-y-6">
              {/* ✅ Título con la misma tipografía que en HeroSection */}
              <h2 className="font-pinyon text-4xl sm:text-5xl lg:text-6xl text-[#CEA663] leading-tight">
                Dra. Blanca Romero
              </h2>
              
              <div className="w-20 h-1 bg-[#CEA663] rounded-full"></div>
              
              <p className="font-quicksand text-lg text-gray-200 leading-relaxed">
                Especialista en medicina estética y regenerativa, la Dra. Blanca Romero combina 
                la ciencia avanzada con un enfoque profundamente humano y personalizado.
              </p>
              
              <p className="font-quicksand text-lg text-gray-200 leading-relaxed">
                Su objetivo es restaurar y potenciar la belleza natural de cada paciente, 
                ayudándolos a verse y sentirse mejor a través de tratamientos innovadores 
                que respetan la individualidad de cada persona.
              </p>
              
              <p className="font-quicksand text-lg text-gray-200 leading-relaxed">
                Con años de experiencia y una formación continua en las últimas técnicas 
                de medicina regenerativa, la Dra. Romero ofrece un enfoque integral que 
                une la ciencia, la estética y el bienestar.
              </p>
              
              {/* Valores destacados */}
              <div className="grid grid-cols-3 gap-4 pt-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#CEA663]/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <svg className="w-6 h-6 text-[#CEA663]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <p className="font-taviraj font-semibold text-[#CEA663]">Confianza</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#CEA663]/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <svg className="w-6 h-6 text-[#CEA663]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <p className="font-taviraj font-semibold text-[#CEA663]">Calidad</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#CEA663]/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <svg className="w-6 h-6 text-[#CEA663]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                    </svg>
                  </div>
                  <p className="font-taviraj font-semibold text-[#CEA663]">Empatía</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}