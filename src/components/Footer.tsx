import { useEffect, useRef, useState } from "react";
import { Clock } from 'lucide-react'; // ✅ Agregado

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative bg-gradient-to-br from-[#000000] via-[#1A1A1A] to-[#2D2D2D] text-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Fondo con textura animada */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#CEA663]/10 via-transparent to-[#C4B497]/10 animate-float"></div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#CEA663]/20 rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#C4B497]/20 rounded-full blur-2xl animate-float" style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className={`transition-all duration-800 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {/* Logo/Nombre */}
          <h3 className="font-pinyon text-4xl lg:text-5xl text-[#CEA663] mb-4">
            Dra. Blanca Romero
          </h3>

          {/* Frase de marca */}
          <p className="font-taviraj text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed">
            Belleza regenerativa, bienestar integral
          </p>

          {/* Línea decorativa */}
          <div className="w-24 h-1 bg-gradient-to-r from-[#CEA663] to-[#C4B497] rounded-full mx-auto mb-8"></div>

          {/* Información de contacto */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className={`transition-all duration-800 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <div className="w-12 h-12 bg-[#CEA663]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-[#CEA663]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h4 className="font-taviraj font-semibold text-white mb-2">Ubicación</h4>
              <p className="font-quicksand text-white/80 text-sm leading-relaxed">
                Plaza Altabrisa<br />
                Calzada del Tecnológico #13999<br />
                Int. B-104, C.P. 22420<br />
                Tijuana, B.C., México
              </p>
            </div>

            {/* ✅ SECCIÓN DE HORARIO — ahora con icono de Clock */}
            <div className={`transition-all duration-800 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <div className="w-12 h-12 bg-[#CEA663]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-[#CEA663]" />
              </div>
              <h4 className="font-taviraj font-semibold text-white mb-2">Horario</h4>
              <p className="font-quicksand text-white/80 text-sm leading-relaxed">
                Lunes a viernes: 8:00 AM – 4:00 PM<br />
                Sábados: 7:00 AM – 2:00 PM<br />
                Domingos: Cerrado
              </p>
            </div>

            <div className={`transition-all duration-800 delay-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <div className="w-12 h-12 bg-[#CEA663]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-[#CEA663]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 1.99 2H20c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z" />
                </svg>
              </div>
              <h4 className="font-taviraj font-semibold text-white mb-2">Contacto</h4>
              <div className="font-quicksand text-white/80 text-sm space-y-1">
                <p>
                  <a
                    href="tel:+526645748899"
                    className="hover:text-[#CEA663] transition-colors underline underline-offset-2"
                  >
                    (664) 574-8899
                  </a>
                </p>
                <p>
                  <a
                    href="https://wa.me/526645748899"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#CEA663] transition-colors underline underline-offset-2"
                  >
                    WhatsApp
                  </a>
                </p>
                <p>
                  <a
                    href="mailto:soy_tudoctora@hotmail.com" // ✅ Corregido con mailto:
                    className="hover:text-[#CEA663] transition-colors underline underline-offset-2"
                  >
                    soy_tudoctora@hotmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Redes sociales */}
          <div className={`transition-all duration-800 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="mb-8">
              <h4 className="font-taviraj font-semibold text-white/90 mb-3">Síguenos</h4>
              <div className="flex justify-center gap-4">
                <a
                  href="https://www.instagram.com/drablankitarom/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#CEA663]/20 flex items-center justify-center text-[#CEA663] hover:bg-[#CEA663]/40 transition-all"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="https://www.tiktok.com/@drablankitaromero"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#CEA663]/20 flex items-center justify-center text-[#CEA663] hover:bg-[#CEA663]/40 transition-all"
                  aria-label="TikTok"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84 0 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.46.08-2.92-.32-4.04-1.22-2.01-1.66-3.24-4.15-3.37-6.69-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.4-1.06.03-3.59.01-7.18.02-10.77.01-4.73.01-9.47 0-14.2 0-.29.04-.58.06-.87.13-.48.27-.96.44-1.44H12.53z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Copyright + Made by */}
          <div className={`transition-all duration-800 delay-800 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="border-t border-white/15 pt-6">
              <p className="font-quicksand text-white/70 text-sm">
                © {new Date().getFullYear()} Dra. Blanca Romero. Todos los derechos reservados.
              </p>
              <p className="font-quicksand text-white/50 text-xs mt-1">
                Medicina estética y regenerativa con enfoque humano
              </p>

              {/* Made by APEX Web — 9px */}
              <p className="mt-4">
                <a
                  href="https://web-apex.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-[#00FFA3] hover:text-[#66FFC2] font-quicksand font-medium text-[9px] transition-colors"
                >
                  Made by APEX Web
                  <svg
                    className="ml-1 w-2 h-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}