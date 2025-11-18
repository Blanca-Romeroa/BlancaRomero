import SectionWrapper from "./SectionWrapper";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";

// Todas las preguntas frecuentes (40 en total)
const allFaqs = [
  {
    id: "sueroterapia-1",
    question: "¿Qué es la sueroterapia IV y cómo funciona?",
    answer: "La sueroterapia IV es un tratamiento que permite la administración directa de vitaminas, minerales y medicamentos en el torrente sanguíneo. Este método asegura una absorción completa y rápida de los nutrientes, proporcionando efectos inmediatos y eficaces. Es especialmente útil para personas con problemas de absorción intestinal o necesidades nutricionales elevadas.",
    category: "sueroterapia"
  },
  {
    id: "celulas-1",
    question: "¿Qué es la terapia con células madre humanas?",
    answer: "La terapia con células madre humanas es una de las técnicas más avanzadas en medicina regenerativa. Se aplica intravenosamente y se personaliza según la historia clínica del paciente para lograr la restauración de tejidos y órganos con resultados documentados. Tiene una alta tasa de éxito en la mejora de síntomas.",
    category: "celulas"
  },
  {
    id: "placenta-1",
    question: "¿Qué es el implante de placenta liofilizada?",
    answer: "El implante de placenta liofilizada es un biológico derivado de placenta humana que ha sido sometido a procesos físicos y químicos rigurosos para preservar sus propiedades y garantizar seguridad. Se implanta subdérmicamente y libera sus componentes activos de forma gradual, funcionando como una 'batería biológica'.",
    category: "placenta"
  },
  {
    id: "pellets-1",
    question: "¿Qué son los pellets hormonales?",
    answer: "Los pellets hormonales son implantes subdérmicos que liberan hormonas de forma constante y natural durante aproximadamente 6 meses. Son un procedimiento ambulatorio de solo 10 minutos que permite un equilibrio hormonal sostenido y efectivo. Se personalizan según las necesidades hormonales de cada paciente.",
    category: "pellets"
  },
  {
    id: "estetica-1",
    question: "¿Qué incluye la medicina estética facial?",
    answer: "La medicina estética facial incluye tratamientos anti-envejecimiento como botox y rellenos dérmicos, hidratación profunda con ácido hialurónico y plasma rico en plaquetas, lifting no quirúrgico con radiofrecuencia, tratamiento de arrugas y líneas de expresión, y contorneado facial personalizado para realzar la belleza natural.",
    category: "estetica"
  },
  // Sueroterapia (4 preguntas adicionales)
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
  // Células Madre (4 preguntas adicionales)
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
  // Placenta Liofilizada (4 preguntas adicionales)
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
  // Pellets Hormonales (4 preguntas adicionales)
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
  // Medicina Estética Facial (4 preguntas adicionales)
  {
    id: "estetica-2",
    question: "¿Qué resultados se pueden esperar de la medicina estética facial?",
    answer: "Se pueden esperar resultados como rejuvenecimiento facial, reducción de arrugas y líneas de expresión, mejora de la textura y luminosidad de la piel, contorneado facial definido, y un aspecto más descansado y juvenil. Los resultados son naturales y respetan la identidad facial.",
    category: "estetica"
  },
  {
    id: "estetica-3",
    question: "¿Cuánto dura el efecto de los tratamientos estéticos faciales?",
    answer: "La duración varía según el tratamiento. El botox dura 3-6 meses, los rellenos dérmicos 6-18 meses, y los tratamientos de radiofrecuencia pueden tener efectos duraderos con sesiones de mantenimiento. Se personaliza el plan de mantenimiento según cada paciente.",
    category: "estetica"
  },
  {
    id: "estetica-4",
    question: "¿Qué técnicas se utilizan en medicina estética facial?",
    answer: "Técnicas utilizadas: botox para arrugas y líneas de expresión, rellenos dérmicos para volúmenes y contornos, plasma rico en plaquetas para regeneración, radiofrecuencia para lifting no quirúrgico, hilos tensores para elevación, y tratamientos personalizados según las necesidades de cada paciente.",
    category: "estetica"
  },
  {
    id: "estetica-5",
    question: "¿Es seguro el botox y los rellenos dérmicos?",
    answer: "Sí, son completamente seguros cuando se aplican por profesionales capacitados. Utilizamos productos de primera calidad y seguridad comprobada. Los tratamientos son mínimamente invasivos y los resultados son naturales, manteniendo la identidad facial del paciente.",
    category: "estetica"
  },
  // Tratamientos Corporales (5 preguntas)
  {
    id: "corporal-1",
    question: "¿Qué incluyen los tratamientos corporales?",
    answer: "Los tratamientos corporales incluyen modelado corporal para reducción de contorno y volumen, tratamientos anti-celulíticos para reducción de nódulos y textura irregular, reducción de grasa localizada sin cirugía, hidratación y nutrición profunda para mejorar elasticidad y textura, y drenaje linfático para eliminación de toxinas.",
    category: "corporal"
  },
  {
    id: "corporal-2",
    question: "¿Cuántas sesiones se necesitan para ver resultados corporales?",
    answer: "Los resultados son visibles desde la primera sesión, pero se recomienda un plan de tratamiento personalizado que puede incluir entre 4 a 10 sesiones según los objetivos específicos. Se evalúa individualmente para cada paciente y se ajusta según la evolución.",
    category: "corporal"
  },
  {
    id: "corporal-3",
    question: "¿Qué beneficios tiene el drenaje linfático?",
    answer: "El drenaje linfático mejora la circulación, elimina toxinas, reduce la retención de líquidos, alivia la sensación de piernas cansadas, y potencia los resultados de otros tratamientos corporales. Es relajante y promueve el bienestar general.",
    category: "corporal"
  },
  {
    id: "corporal-4",
    question: "¿Se puede combinar varios tratamientos corporales?",
    answer: "Sí, se pueden combinar tratamientos corporales para potenciar los resultados. Por ejemplo, drenaje linfático con tratamientos reductores, o hidratación profunda con radiofrecuencia. Se crea un plan personalizado según los objetivos y necesidades individuales.",
    category: "corporal"
  },
  {
    id: "corporal-5",
    question: "¿Quién puede recibir tratamientos corporales?",
    answer: "Los tratamientos corporales son adecuados para la mayoría de las personas que buscan tonificar, moldear y rejuvenecer su cuerpo. Se realiza una evaluación previa para determinar la idoneidad y personalizar el plan de tratamiento según las condiciones médicas y objetivos específicos.",
    category: "corporal"
  },
  // Nutrición y Suplementación (5 preguntas)
  {
    id: "nutricion-1",
    question: "¿Qué incluye la evaluación nutricional completa?",
    answer: "La evaluación incluye análisis de hábitos alimenticios, objetivos de salud, condiciones médicas, estilo de vida, y mediciones antropométricas. Se consideran factores como intolerancias, alergias, y necesidades específicas para crear un plan nutricional personalizado.",
    category: "nutricion"
  },
  {
    id: "nutricion-2",
    question: "¿Cómo se personaliza la suplementación?",
    answer: "La suplementación se personaliza según la evaluación nutricional, deficiencias detectadas, objetivos de salud, y condiciones médicas. Se seleccionan vitaminas, minerales y compuestos bioactivos específicos para cada paciente, considerando su metabolismo y necesidades individuales.",
    category: "nutricion"
  },
  {
    id: "nutricion-3",
    question: "¿Qué alimentos se recomiendan en la nutrición funcional?",
    answer: "Se recomiendan alimentos funcionales como frutas ricas en antioxidantes, verduras de hoja verde, pescados grasos, nueces, semillas, aceite de oliva virgen extra y especias antiinflamatorias. El plan se adapta a tus necesidades específicas y objetivos de salud.",
    category: "nutricion"
  },
  {
    id: "nutricion-4",
    question: "¿Cuál es el seguimiento nutricional?",
    answer: "El seguimiento incluye evaluación mensual de progreso, ajustes al plan nutricional según necesidades, educación nutricional continua, recetas saludables y soporte personalizado. También se monitorean biomarcadores relevantes para asegurar resultados óptimos.",
    category: "nutricion"
  },
  {
    id: "nutricion-5",
    question: "¿Cómo se combina la nutrición con otros tratamientos?",
    answer: "La nutrición se combina con otros tratamientos para maximizar resultados. Proporciona la base nutricional necesaria para que otros tratamientos como sueroterapia, células madre y pellets hormonales funcionen de manera más efectiva y sostenible.",
    category: "nutricion"
  },
  // Terapia Antiedad (5 preguntas)
  {
    id: "antiedad-1",
    question: "¿Qué incluye la evaluación antiedad?",
    answer: "La evaluación antiedad incluye análisis de marcadores biológicos, estilo de vida, historia clínica, objetivos personales, y factores genéticos. Se evalúan indicadores como inflamación, estrés oxidativo, niveles hormonales, y estado inmunológico para crear un plan integral.",
    category: "antiedad"
  },
  {
    id: "antiedad-2",
    question: "¿Cómo se personaliza la terapia antiedad?",
    answer: "La terapia antiedad se personaliza mediante una evaluación de marcadores biológicos y estilo de vida. Se combinan medicina regenerativa, nutrición, suplementación y tratamientos estéticos para ofrecer programas completos que ralentizan y revertir signos de envejecimiento a nivel celular.",
    category: "antiedad"
  },
  {
    id: "antiedad-3",
    question: "¿Qué tratamientos se incluyen en la medicina regenerativa antiedad?",
    answer: "La medicina regenerativa antiedad incluye células madre, sueroterapia, factores de crecimiento, suplementación antiedad con antioxidantes y péptidos, y tratamientos estéticos para mantener apariencia juvenil. Todo se adapta a las necesidades individuales de cada paciente.",
    category: "antiedad"
  },
  {
    id: "antiedad-4",
    question: "¿Cuáles son los resultados esperados de la terapia antiedad?",
    answer: "Los resultados incluyen aumento de energía y vitalidad, mejora de la memoria y concentración, reducción de fatiga, mejor calidad del sueño, aumento de la masa muscular y reducción de grasa corporal, y una apariencia más joven y saludable.",
    category: "antiedad"
  },
  {
    id: "antiedad-5",
    question: "¿Cómo se mantiene el seguimiento en la terapia antiedad?",
    answer: "El seguimiento incluye evaluación de biomarcadores y progreso, educación en bienestar y hábitos para envejecimiento saludable, apoyo psicológico para bienestar emocional y mental, y programas de mantenimiento para resultados sostenidos a largo plazo.",
    category: "antiedad"
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