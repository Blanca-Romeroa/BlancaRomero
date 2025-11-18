import SectionWrapper from "./SectionWrapper";
import { useEffect, useRef, useState } from "react";

export default function Promise() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <SectionWrapper id="promise" bgColor="transparent">
      <div className="max-w-3xl mx-auto text-center px-2 md:px-0" ref={sectionRef}>
        <div className={`transition-all duration-800 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {/* ✅ Título — igual que en Hero */}
          <h2 className="font-pinyon text-4xl sm:text-5xl lg:text-6xl text-[#CEA663] mb-4 leading-tight">
            Nuestra Promesa
          </h2>

          {/* ✅ Línea decorativa */}
          <div className="w-20 h-1 bg-gradient-to-r from-[#CEA663] to-[#C4B497] rounded-full mx-auto mb-8"></div>

          <div className="bg-[#000000]/50 backdrop-blur-sm p-6 md:p-12 rounded-lg border border-[#CEA663]/20 hover-glow transition-all duration-300">
            {/* ✅ Texto en font-taviraj (como el subtítulo del Hero), no quicksand */}
            <p className="font-taviraj text-lg sm:text-xl md:text-2xl text-[#D4BAAC] leading-relaxed mb-6">
              Queremos que cada paciente sienta cercanía, confianza y seguridad en cada paso de su tratamiento.
            </p>

            <p className="font-taviraj text-lg sm:text-xl md:text-2xl text-white leading-relaxed">
              Nuestro compromiso es brindar atención personalizada, científicamente fundamentada, con un toque humano que te haga sentir valorada.
            </p>

            <p className="font-taviraj text-lg sm:text-xl md:text-2xl text-[#C4B497] leading-relaxed mt-6 italic">
              Porque creemos que la verdadera belleza surge cuando te sientes bien contigo misma.
            </p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}