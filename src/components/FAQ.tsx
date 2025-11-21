import SectionWrapper from "./SectionWrapper";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";

// Todas las preguntas frecuentes (40 en total) - solo sueroterapia, células madre, implante de placenta y pellet hormonal
const allFaqs = [
  // Sueroterapia (10 preguntas)
  {
    id: "sueroterapia-1",
    question: "¿Qué es la sueroterapia IV y cómo funciona?",
    answer: "La sueroterapia IV es un tratamiento que permite la administración directa de vitaminas, minerales y medicamentos en el torrente sanguíneo. Este método asegura una absorción completa y rápida de los nutrientes, proporcionando efectos inmediatos y eficaces. Es especialmente útil para personas con problemas de absorción intestinal o necesidades nutricionales elevadas.",
    category: "sueroterapia"
  },
  {
    id: "sueroterapia-2",
    question: "¿Cuáles son los tipos de sueros disponibles?",
    answer: "Ofrecemos varios tipos de sueros: Rejuvemax ($150 USD) para hidratación y energía, Rejuvecell ($150 USD) para anti-envejecimiento, Elixir Oncomax ($300 USD) para condiciones específicas, Quelación ($300 USD) para desintoxicación, Glutatión ($300 USD) para antioxidantes, y NAD+ ($400 USD) para energía mental.",
    category: "sueroterapia"
  },
  {
    id: "sueroterapia-3",
    question: "¿Cuántas sesiones de sueroterapia se necesitan?",
    answer: "El número de sesiones depende del tipo de suero y las necesidades individuales. Algunos sueros se aplican semanalmente, otros mensualmente. Se recomienda un plan personalizado basado en tu evaluación médica inicial y objetivos de salud.",
    category: "sueroterapia"
  },
  {
    id: "sueroterapia-4",
    question: "¿Cuáles son los beneficios generales de la sueroterapia?",
    answer: "Los beneficios generales incluyen desintoxicación del cuerpo, revitalización del organismo, aumento de las defensas para prevenir enfermedades, y mejora de estados de agotamiento y fatiga. Es ideal como complemento en tratamientos oncológicos para disminuir efectos secundarios.",
    category: "sueroterapia"
  },
  {
    id: "sueroterapia-5",
    question: "¿Quién puede recibir sueroterapia?",
    answer: "La sueroterapia es adecuada para la mayoría de las personas, especialmente para aquellas con deficiencias nutricionales, fatiga crónica, estrés, o como apoyo en tratamientos médicos. Se realiza una evaluación previa para determinar la idoneidad y personalizar el tratamiento.",
    category: "sueroterapia"
  },
  {
    id: "sueroterapia-6",
    question: "¿Cuánto tiempo dura una sesión de sueroterapia?",
    answer: "La duración de una sesión de sueroterapia varía entre 30 minutos a 1 hora, dependiendo del tipo de suero y la complejidad del tratamiento. El procedimiento es cómodo y se realiza en un ambiente relajado.",
    category: "sueroterapia"
  },
  {
    id: "sueroterapia-7",
    question: "¿Es dolorosa la aplicación de sueroterapia?",
    answer: "No, la aplicación de sueroterapia no es dolorosa. Solo se siente una pequeña punción al insertar la aguja en la vena. La mayoría de los pacientes reportan una experiencia cómoda y relajante durante la infusión.",
    category: "sueroterapia"
  },
  {
    id: "sueroterapia-8",
    question: "¿Cuándo se empiezan a ver los resultados de la sueroterapia?",
    answer: "Los resultados pueden notarse desde la primera sesión, especialmente en energía y bienestar general. Para beneficios más específicos como anti-envejecimiento o desintoxicación, se recomienda un plan de tratamiento continuo por varias semanas.",
    category: "sueroterapia"
  },
  {
    id: "sueroterapia-9",
    question: "¿Cuáles son las contraindicaciones de la sueroterapia?",
    answer: "Las contraindicaciones incluyen insuficiencia cardíaca grave, hipertensión no controlada, alergias severas a componentes del suero, y ciertas condiciones médicas específicas. Se realiza una evaluación médica completa antes de iniciar el tratamiento.",
    category: "sueroterapia"
  },
  {
    id: "sueroterapia-10",
    question: "¿Cómo se personaliza un tratamiento de sueroterapia?",
    answer: "El tratamiento se personaliza según tu historia clínica, análisis de laboratorio, objetivos de salud y necesidades nutricionales específicas. Cada suero se formula individualmente para maximizar los resultados y garantizar seguridad.",
    category: "sueroterapia"
  },
  // Células Madre (10 preguntas)
  {
    id: "celulas-1",
    question: "¿Qué es la terapia con células madre humanas?",
    answer: "La terapia con células madre humanas es una de las técnicas más avanzadas en medicina regenerativa. Se aplica intravenosamente y se personaliza según la historia clínica del paciente para lograr la restauración de tejidos y órganos con resultados documentados. Tiene una alta tasa de éxito en la mejora de síntomas.",
    category: "celulas"
  },
  {
    id: "celulas-2",
    question: "¿Qué condiciones se pueden tratar con células madre?",
    answer: "Se pueden tratar enfermedades autoinmunes, crónico-degenerativas, diabetes mellitus, trastornos musculoesqueléticos y ansiedad. También se utiliza en tratamientos estéticos para regeneración facial y corporal. El tratamiento se personaliza según la historia clínica del paciente.",
    category: "celulas"
  },
  {
    id: "celulas-3",
    question: "¿Cuál es la tasa de éxito de la terapia con células madre?",
    answer: "La terapia con células madre tiene una alta tasa de éxito en restauración de tejidos y órganos, con mejoría documentada entre 30% y 90% en síntomas, según el caso. Los resultados son personalizados y se evalúan individualmente para cada paciente.",
    category: "celulas"
  },
  {
    id: "celulas-4",
    question: "¿Cómo se personaliza el tratamiento de células madre?",
    answer: "El tratamiento se personaliza según la historia clínica del paciente, tipo de enfermedad o condición a tratar, y objetivos de salud específicos. Se evalúa cada caso individualmente para determinar la dosis y tipo de células madre más adecuados.",
    category: "celulas"
  },
  {
    id: "celulas-5",
    question: "¿Cuánto tiempo dura el efecto de la terapia con células madre?",
    answer: "Los efectos son progresivos y sostenidos. Se observan mejorías desde las primeras semanas, con resultados máximos entre 3 a 6 meses. La duración puede variar según la condición tratada y la respuesta individual del paciente.",
    category: "celulas"
  },
  {
    id: "celulas-6",
    question: "¿De dónde provienen las células madre utilizadas en el tratamiento?",
    answer: "Las células madre utilizadas son de origen humano, obtenidas de tejidos específicos bajo estrictas normas de bioseguridad. Se someten a procesos rigurosos de purificación y caracterización para garantizar su calidad y efectividad.",
    category: "celulas"
  },
  {
    id: "celulas-7",
    question: "¿Es segura la terapia con células madre?",
    answer: "Sí, la terapia con células madre es segura cuando se aplica bajo supervisión médica especializada. Se siguen protocolos estrictos de seguridad y se realiza una evaluación previa para determinar la idoneidad del paciente para el tratamiento.",
    category: "celulas"
  },
  {
    id: "celulas-8",
    question: "¿Cuántas sesiones de células madre se requieren?",
    answer: "El número de sesiones depende de la condición a tratar y la respuesta individual del paciente. Generalmente se requiere una sesión inicial seguida de sesiones de mantenimiento según el plan personalizado de cada paciente.",
    category: "celulas"
  },
  {
    id: "celulas-9",
    question: "¿Cuáles son los posibles efectos secundarios de la terapia con células madre?",
    answer: "Los efectos secundarios son mínimos y raros. Pueden incluir ligera inflamación en el sitio de aplicación o reacciones leves. Se realizan controles médicos rigurosos para garantizar la seguridad del paciente en todo momento.",
    category: "celulas"
  },
  {
    id: "celulas-10",
    question: "¿Cómo se monitorea la evolución del paciente con células madre?",
    answer: "La evolución se monitorea mediante evaluaciones médicas regulares, análisis de laboratorio y seguimiento de síntomas. Se documentan los progresos y se ajustan los planes de tratamiento según sea necesario para optimizar los resultados.",
    category: "celulas"
  },
  // Placenta Liofilizada (10 preguntas)
  {
    id: "placenta-1",
    question: "¿Qué es el implante de placenta liofilizada?",
    answer: "El implante de placenta liofilizada es un biológico derivado de placenta humana que ha sido sometido a procesos físicos y químicos rigurosos para preservar sus propiedades y garantizar seguridad. Se implanta subdérmicamente y libera sus componentes activos de forma gradual, funcionando como una 'batería biológica'.",
    category: "placenta"
  },
  {
    id: "placenta-2",
    question: "¿Cuáles son las indicaciones terapéuticas del implante de placenta?",
    answer: "Indicaciones degenerativas: diabetes tipo 1/2, hipertensión, insuficiencia renal, infarto, insuficiencia cardíaca, cirrosis, hepatitis, EPOC, fibrosis pulmonar. Autoinmunes: artritis reumatoide, lupus, esclerosis múltiple, vitiligo. Hormonales: climaterio, menopausia, pérdida de libido.",
    category: "placenta"
  },
  {
    id: "placenta-3",
    question: "¿Cuánto tiempo duran los efectos del implante de placenta?",
    answer: "Los efectos se inician en la primera semana con proteínas de rápida absorción. Los efectos sostenidos se observan entre 1 a 4 meses, incluyendo mejor sueño, memoria, vitalidad, control de peso, hidratación cutánea y regulación menstrual. También se observan mejorías en laboratorios.",
    category: "placenta"
  },
  {
    id: "placenta-4",
    question: "¿Cómo funciona el implante de placenta como 'batería biológica'?",
    answer: "El implante funciona como una 'batería biológica' al reactivar células decadentes mediante estimuladores biógenos. Se libera gradualmente: miligramos o nanogramos de hormonas y proteínas en el tejido adiposo periumbilical con alta vascularización.",
    category: "placenta"
  },
  {
    id: "placenta-5",
    question: "¿Qué componentes activos contiene el implante de placenta?",
    answer: "Contiene factores de crecimiento, interleucinas y neuropeptidos, aminoácidos, factores antitumorales e inmunomoduladores, y eritropoyetina. Estos componentes promueven la regeneración y restauración del equilibrio corporal.",
    category: "placenta"
  },
  {
    id: "placenta-6",
    question: "¿Cómo se aplica el implante de placenta liofilizada?",
    answer: "El implante se aplica subdérmicamente en el tejido adiposo periumbilical con anestesia local. Es un procedimiento ambulatorio de pocos minutos que permite la liberación gradual de componentes activos durante semanas o meses.",
    category: "placenta"
  },
  {
    id: "placenta-7",
    question: "¿Cuáles son los beneficios estéticos del implante de placenta?",
    answer: "Los beneficios estéticos incluyen hidratación cutánea mejorada, reducción de arrugas y líneas de expresión, mejora en la textura y luminosidad de la piel, aumento de la elasticidad y firmeza, y rejuvenecimiento facial y corporal natural.",
    category: "placenta"
  },
  {
    id: "placenta-8",
    question: "¿Cuáles son los beneficios hormonales del implante de placenta?",
    answer: "Los beneficios hormonales incluyen regulación del ciclo menstrual, mejora en la libido y deseo sexual, equilibrio hormonal durante la menopausia, reducción de síntomas climatéricos, y mejora en el estado de ánimo y energía general.",
    category: "placenta"
  },
  {
    id: "placenta-9",
    question: "¿Es seguro el implante de placenta liofilizada?",
    answer: "Sí, es seguro cuando se aplica por profesionales especializados. El proceso incluye estrictos controles de calidad y seguridad, y se utilizan productos certificados. Se realiza una evaluación previa para determinar la idoneidad del paciente.",
    category: "placenta"
  },
  {
    id: "placenta-10",
    question: "¿Cuánto tiempo dura el procedimiento de implante de placenta?",
    answer: "El procedimiento dura aproximadamente 10-15 minutos y es ambulatorio. Se realiza con anestesia local para garantizar comodidad, y el paciente puede retomar sus actividades normales inmediatamente después del tratamiento.",
    category: "placenta"
  },
  // Pellets Hormonales (10 preguntas)
  {
    id: "pellets-1",
    question: "¿Qué son los pellets hormonales?",
    answer: "Los pellets hormonales son implantes subdérmicos que liberan hormonas de forma constante y natural durante aproximadamente 6 meses. Son un procedimiento ambulatorio de solo 10 minutos que permite un equilibrio hormonal sostenido y efectivo. Se personalizan según las necesidades hormonales de cada paciente.",
    category: "pellets"
  },
  {
    id: "pellets-2",
    question: "¿Cómo se aplica el pellet hormonal?",
    answer: "El pellet se implanta subdérmicamente en el glúteo con anestesia local. Es un procedimiento ambulatorio de 10 minutos que libera hormonas de forma constante durante aproximadamente 6 meses. Se adapta a las necesidades hormonales específicas de cada paciente.",
    category: "pellets"
  },
  {
    id: "pellets-3",
    question: "¿Qué beneficios tiene el pellet hormonal en mujeres?",
    answer: "En mujeres, especialmente durante la menopausia, el pellet hormonal recupera e incrementa la libido, aumenta masa magra y reduce grasa corporal, alivia ansiedad, depresión, irritabilidad y nerviosismo, y mejora memoria, claridad mental y corrige insomnio.",
    category: "pellets"
  },
  {
    id: "pellets-4",
    question: "¿Qué beneficios tiene el pellet hormonal en hombres?",
    answer: "En hombres, el pellet hormonal aumenta la energía y el enfoque mental, mejora la memoria y concentración, alivia síntomas de dolor y abstinencia, combate la depresión, y tiene efecto antienvejecimiento. También mejora la función sexual y el bienestar general.",
    category: "pellets"
  },
  {
    id: "pellets-5",
    question: "¿Cuáles son los efectos secundarios del pellet hormonal?",
    answer: "Los efectos secundarios son mínimos y raros. Pueden incluir ligera inflamación en el sitio de implantación o ajustes temporales en el estado de ánimo mientras el cuerpo se adapta a los niveles hormonales equilibrados. Son generalmente leves y de corta duración.",
    category: "pellets"
  },
  {
    id: "pellets-6",
    question: "¿Cuánto tiempo dura el efecto del pellet hormonal?",
    answer: "El efecto del pellet hormonal dura aproximadamente 6 meses en mujeres y 4-5 meses en hombres. La duración puede variar según el metabolismo individual y las necesidades hormonales específicas de cada paciente.",
    category: "pellets"
  },
  {
    id: "pellets-7",
    question: "¿Cómo se personaliza el pellet hormonal para cada paciente?",
    answer: "El pellet se personaliza según los análisis de laboratorio, historia clínica, síntomas presentados y objetivos de salud de cada paciente. Se determina la dosis exacta de hormonas necesarias para lograr un equilibrio óptimo.",
    category: "pellets"
  },
  {
    id: "pellets-8",
    question: "¿Qué hormonas se pueden incluir en los pellets?",
    answer: "Los pellets pueden contener estrógenos (estradiol), progesterona, testosterona y otras hormonas según las necesidades específicas de cada paciente. La combinación se personaliza para lograr el equilibrio hormonal deseado.",
    category: "pellets"
  },
  {
    id: "pellets-9",
    question: "¿Quién puede recibir pellets hormonales?",
    answer: "Los pellets hormonales son adecuados para personas con desequilibrios hormonales, especialmente durante la menopausia, andropausia o deficiencias hormonales. Se requiere una evaluación médica completa para determinar la idoneidad del tratamiento.",
    category: "pellets"
  },
  {
    id: "pellets-10",
    question: "¿Cuáles son las ventajas del pellet hormonal sobre otras formas de terapia?",
    answer: "Las ventajas incluyen liberación constante de hormonas, evita picos y valles hormonales, no requiere aplicación diaria, efectos sostenidos por meses, personalización exacta de la dosis, y resultados más estables y predecibles que otras formas de terapia hormonal.",
    category: "pellets"
  }
];

export default function FAQ() {
  const [startIndex, setStartIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentFaqs, setCurrentFaqs] = useState(allFaqs.slice(0, 5));
  const [nextFaqs, setNextFaqs] = useState<typeof allFaqs>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  // Filtrar preguntas por búsqueda
  const filteredFaqs = allFaqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCurrentFaqs = () => {
    if (searchTerm !== "") return filteredFaqs.slice(0, 5);
    return allFaqs.slice(startIndex, startIndex + 5);
  };

  // Cargar siguientes 5 preguntas con animación profesional
  const loadNextFaqs = () => {
    if (isTransitioning) return;

    if (searchTerm !== "") {
      setSearchTerm("");
      setNextFaqs(allFaqs.slice(0, 5));
      setStartIndex(0);
    } else {
      const nextIndex = (startIndex + 5) % allFaqs.length;
      setNextFaqs(allFaqs.slice(nextIndex, nextIndex + 5));
      setStartIndex(nextIndex);
    }

    setIsTransitioning(true);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  // Actualizar preguntas activas tras transición
  useEffect(() => {
    if (!isTransitioning) {
      setCurrentFaqs(getCurrentFaqs());
    }
  }, [startIndex, searchTerm, isTransitioning]);

  return (
    <SectionWrapper id="faq" bgColor="transparent">
      <div className="max-w-3xl mx-auto px-2 md:px-0" ref={sectionRef}>
        <div className={`transition-all duration-800 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {/* ✅ Título — igual que en Hero */}
          <h2 className="font-pinyon text-4xl sm:text-5xl lg:text-6xl text-[#CEA663] mb-4 leading-tight text-center">
            Preguntas Frecuentes
          </h2>

          {/* ✅ Línea decorativa */}
          <div className="w-20 h-1 bg-gradient-to-r from-[#CEA663] to-[#C4B497] rounded-full mx-auto mb-6"></div>

          {/* ✅ Subtítulo — igual que en Hero */}
          <p className="font-taviraj text-xl sm:text-2xl lg:text-3xl text-[#D4BAAC] max-w-2xl mx-auto mb-10 text-center leading-relaxed">
            Resolvemos tus dudas
          </p>

          {/* BUSCADOR */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-[#CEA663] mb-2">
              Buscar por palabra clave:
            </label>
            <Input
              placeholder="Escribe una palabra clave..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-[#000000]/50 border-[#CEA663]/30 focus:border-[#CEA663] text-white placeholder:text-gray-500"
            />
          </div>

          {/* CONTENEDOR CON ANIMACIÓN DE ENTRADA/SALIDA */}
          <div className="relative overflow-hidden">
            <div
              className={`transition-all duration-500 ease-in-out ${
                isTransitioning ? "translate-x-[-120%] opacity-0" : "translate-x-0 opacity-100"
              }`}
            >
              <Accordion type="single" collapsible className="space-y-3 md:space-y-4">
                {currentFaqs.map((faq) => (
                  <AccordionItem
                    key={faq.id}
                    value={faq.id}
                    className="bg-[#000000]/40 backdrop-blur-sm border border-[#CEA663]/20 rounded-lg overflow-hidden"
                  >
                    <AccordionTrigger className="text-white font-taviraj text-sm md:text-base py-3 px-4 md:px-6 hover:text-[#CEA663] transition-colors">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-300 font-quicksand text-xs md:text-sm pb-3 px-4 md:px-6">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {isTransitioning && (
              <div className="absolute top-0 left-0 w-full transition-all duration-500 ease-in-out translate-x-[120%] opacity-0">
                <Accordion type="single" collapsible className="space-y-3 md:space-y-4">
                  {nextFaqs.map((faq) => (
                    <AccordionItem
                      key={faq.id}
                      value={faq.id}
                      className="bg-[#000000]/40 backdrop-blur-sm border border-[#CEA663]/20 rounded-lg overflow-hidden"
                    >
                      <AccordionTrigger className="text-white font-taviraj text-sm md:text-base py-3 px-4 md:px-6 hover:text-[#CEA663] transition-colors">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-300 font-quicksand text-xs md:text-sm pb-3 px-4 md:px-6">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}
          </div>

          {/* BOTÓN */}
          <div className="text-center mt-8">
            <button
              onClick={loadNextFaqs}
              disabled={isTransitioning}
              className={`bg-[#CEA663] hover:bg-[#C4A490] text-black px-6 py-3 rounded-full font-quicksand font-semibold shadow-sm transition-all duration-300 hover:scale-105 active:scale-95 ${
                isTransitioning ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {searchTerm === "" ? "Ver más preguntas frecuentes" : "Mostrar todas las preguntas"}
            </button>
          </div>

          {/* Sin resultados */}
          {filteredFaqs.length === 0 && searchTerm !== "" && (
            <div className="text-center mt-8 text-gray-300 font-quicksand">
              <p>No se encontraron preguntas que coincidan con &quot;{searchTerm}&quot;</p>
            </div>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
}