"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, Star } from "lucide-react";

const testimonials = [
  {
    text: "Excelente atención, resultados naturales y muy profesionales.",
    author: "Ana R.",
    rating: 5,
  },
  {
    text: "Confianza total, trato humano y resultados visibles.",
    author: "Laura M.",
    rating: 5,
  },
  {
    text: "Mi piel rejuveneció sin perder naturalidad.",
    author: "Patricia L.",
    rating: 5,
  },
  {
    text: "La Dra. Romero es una verdadera profesional, escucha y entiende tus necesidades.",
    author: "Mariana T.",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Observador para animación al hacer scroll
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

  // Auto-rotación
  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  // ✅ Función para abrir ventana emergente de reseñas
  const openGoogleReview = () => {
    window.open(
      "https://search.google.com/local/writereview?placeid=ChIJHz1aYqFH2YARxKalhSAUSgU",
      "_blank",
      "width=600,height=600"
    );
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 sm:py-32 bg-transparent relative overflow-hidden"
      id="testimonios"
    >
      {/* Background accent */}
      <div className="absolute -left-40 bottom-20 w-96 h-96 bg-[#CEA663]/10 rounded-full blur-3xl" />
      <div className="absolute top-20 right-20 w-64 h-64 bg-[#C4B497]/10 rounded-full blur-3xl animate-float"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div
            className={`transition-all duration-800 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="font-pinyon text-4xl sm:text-5xl lg:text-6xl text-[#CEA663] mb-4 leading-tight">
              Lo que dicen nuestros pacientes
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#CEA663] to-[#C4B497] rounded-full mx-auto mb-6"></div>
            <p className="font-taviraj text-xl sm:text-2xl lg:text-3xl text-[#D4BAAC] max-w-3xl mx-auto leading-relaxed">
              Historias reales de transformación y satisfacción
            </p>
          </div>
        </div>

        {/* Testimonial Slider */}
        <div className="max-w-4xl mx-auto">
          <div
            className="relative bg-[#000000]/50 backdrop-blur-sm rounded-2xl p-8 sm:p-12 border border-[#CEA663]/20 transition-all duration-500 shadow-lg hover-glow"
            onMouseEnter={() => setIsAutoPlay(false)}
            onMouseLeave={() => setIsAutoPlay(true)}
          >
            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {Array(testimonials[activeIndex].rating)
                .fill(0)
                .map((_, i) => (
                  <span key={i} className="text-[#CEA663] text-xl">
                    ★
                  </span>
                ))}
            </div>

            {/* Testimonial Text */}
            <p className="text-xl sm:text-2xl text-white mb-8 leading-relaxed italic">
              "{testimonials[activeIndex].text}"
            </p>

            {/* Author */}
            <p className="text-lg text-gray-300 font-semibold">— {testimonials[activeIndex].author}</p>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-3 mt-8">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveIndex(idx);
                    setIsAutoPlay(false);
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    idx === activeIndex ? "bg-[#CEA663] w-8" : "bg-[#CEA663]/30 hover:bg-[#CEA663]/60"
                  }`}
                  aria-label={`Ir al testimonio ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Additional testimonial cards below */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {testimonials.slice(0, 3).map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-[#000000]/50 backdrop-blur-sm rounded-xl p-6 border border-[#CEA663]/20 hover:border-[#CEA663]/50 transition-all duration-300 hover-glow"
              >
                <div className="flex gap-1 mb-4">
                  {Array(testimonial.rating)
                    .fill(0)
                    .map((_, i) => (
                      <span key={i} className="text-[#CEA663] text-sm">
                        ★
                      </span>
                    ))}
                </div>
                <p className="text-gray-300 text-sm mb-4 line-clamp-3">"{testimonial.text}"</p>
                <p className="text-white font-semibold text-sm">{testimonial.author}</p>
              </div>
            ))}
          </div>

          {/* ✅ NUEVA SECCIÓN: Invitación a reseñas en Google — Versión Popup Funcional */}
          <div
            className={`mt-16 text-center transition-all duration-800 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="inline-block bg-[#000000]/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-[#CEA663]/20 hover-glow">
              <div className="flex flex-col items-center">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-[#CEA663] fill-[#CEA663]" />
                  ))}
                </div>
                <h3 className="font-taviraj text-2xl md:text-3xl font-bold text-[#CEA663] mb-3">
                  ¿Te gustó tu experiencia?
                </h3>
                <p className="font-quicksand text-gray-300 max-w-2xl mb-4 leading-relaxed">
                  Ayúdanos a crecer compartiendo tu opinión en Google. Tu reseña marca la diferencia.
                </p>
                <Button
                  size="lg"
                  className="bg-[#CEA663] hover:bg-[#C4A490] text-black font-quicksand font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  onClick={openGoogleReview}
                >
                  Dejar una reseña en Google
                  <ExternalLink className="ml-2 w-5 h-5" />
                </Button>
                <p className="font-quicksand text-xs text-gray-500 mt-2">
                  ⭐ Se abrirá una ventana emergente con el formulario de reseñas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}