import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion, type Transition } from 'framer-motion';
import ServiceDetailModal from './ServiceDetailModal';

interface Service {
  title: string;
  description: string;
  features: string[];
  detailedDescription: string;
  detailedFeatures: string[];
  image: string;
}

const easeOutFunction: [number, number, number, number] = [0, 0, 0.58, 1];

export const ServicesSection: React.FC = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLearnMoreClick = (service: Service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  // ✅ Nueva función: scroll suave a contacto
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const services: Service[] = [
    {
      title: "Sueroterapia IV",
      description: "Revitaliza, desintoxica y fortalece desde dentro.",
      features: [
        "Desintoxica el cuerpo",
        "Revitaliza el organismo",
        "Sube las defensas",
        "Mejora fatiga y agotamiento"
      ],
      detailedDescription: "La sueroterapia IV es un tratamiento que permite la administración directa de vitaminas, minerales y medicamentos en el torrente sanguíneo. Este método asegura una absorción completa y rápida de los nutrientes, proporcionando efectos inmediatos y eficaces.",
      detailedFeatures: [
        "Beneficios generales aplicables a todos los sueros:",
        "Desintoxica el cuerpo",
        "Revitaliza el organismo",
        "Sube las defensas para prevenir enfermedades",
        "Mejora estados de agotamiento y fatiga",
        "Tipos de sueros disponibles:",
        "Rejuvemax: Mejora la hidratación, aporta vitaminas y corrige deficiencias nutricionales, proporciona energía inmediata, alivia síntomas de resaca, fortalece el sistema inmune",
        "Rejuvecell: Aumenta la energía, desacelera el envejecimiento, reduce molestias musculares y articulares, mejora la calidad del sueño y el rendimiento deportivo",
        "Elixir Oncomax: Ayuda en fatiga, migraña, gastritis, artrosis, depresión, estrés, fibromialgia, insomnio, infecciones virales y respiratorias (gripas recurrentes, rinitis, sinusitis), estreñimiento",
        "Quelación: Mejora la circulación y reduce la presión arterial, reduce carga de metales pesados, disminuye colesterol y triglicéridos, desintoxica y elimina radicales libres",
        "Glutatión: Efecto antioxidante potente, mejora apariencia de piel, uñas y cabello, retrasa el envejecimiento, reactiva funciones del hígado, páncreas y vesícula biliar",
        "NAD+: Mayor energía y enfoque mental, mejora la memoria y concentración, alivia síntomas de dolor y abstinencia, combate la depresión y tiene efecto antienvejecimiento",
        "Ideal como complemento en tratamientos oncológicos: disminuye los efectos secundarios de la quimioterapia y radioterapia."
      ],
      image: "/Sueroterapia IV.webp",
    },
    {
      title: "Células Madre",
      description: "Regeneración profunda, personalizada y segura.",
      features: [
        "Regeneración profunda",
        "Tratamiento personalizado",
        "Alta tasa de éxito",
        "Seguridad garantizada"
      ],
      detailedDescription: "La terapia con células madre humanas es una de las técnicas más avanzadas en medicina regenerativa. Se aplica intravenosamente y se personaliza según la historia clínica del paciente para lograr la restauración de tejidos y órganos con resultados documentados.",
      detailedFeatures: [
        "Aplicación intravenosa de células madre humanas, personalizadas según la historia clínica del paciente",
        "Alta tasa de éxito en restauración de tejidos y órganos",
        "Mejoría documentada entre 30% y 90% en síntomas, según caso",
        "Condiciones que se pueden tratar:",
        "Enfermedades autoinmunes",
        "Enfermedades crónico-degenerativas",
        "Diabetes mellitus",
        "Trastornos musculoesqueléticos",
        "Ansiedad (y uso estético en regeneración facial/corporal)",
        "Presupuesto personalizado bajo solicitud."
      ],
      image: "/CelulasMadre.webp",
    },
    {
      title: "Implante de Placenta Liofilizada",
      description: "Un impulso biológico natural para restablecer el equilibrio corporal.",
      features: [
        "Impulso biológico natural",
        "Restablece equilibrio corporal",
        "Liberación gradual",
        "Efectos sostenidos"
      ],
      detailedDescription: "El implante de placenta liofilizada es un biológico derivado de placenta humana que ha sido sometido a procesos físicos y químicos rigurosos para preservar sus propiedades y garantizar seguridad. Se implanta subdérmicamente y libera sus componentes activos de forma gradual.",
      detailedFeatures: [
        "¿Qué es?: Biológico derivado de placenta humana, sometido a procesos físicos y químicos rigurosos para preservar sus propiedades y garantizar seguridad",
        "Mecanismo de acción: Se implanta subdérmicamente en tejido adiposo periumbilical (alta vascularización), se libera gradualmente: miligramos o nanogramos de hormonas y proteínas, funciona como una 'batería biológica': reactiva células decadentes mediante estimuladores biógenos",
        "Contenido activo:",
        "Factores de crecimiento",
        "Interleucinas y neuropeptidos",
        "Aminoácidos",
        "Factores antitumorales e inmunomoduladores",
        "Eritropoyetina",
        "Resultados esperados:",
        "Primera semana: mejoría por proteínas de rápida absorción",
        "1–4 meses: efectos sostenidos —mejor sueño, memoria, vitalidad, control de peso, hidratación cutánea, regulación menstrual",
        "Mejoría en laboratorios: glucosa, lípidos, factor reumatoide, autoanticuerpos, carga viral",
        "Indicaciones terapéuticas:",
        "Degenerativas: Diabetes tipo 1/2, hipertensión, insuficiencia renal (incluso con diálisis), infarto, insuficiencia cardíaca, cirrosis, hepatitis, EPOC, fibrosis pulmonar",
        "Autoinmunes: Artritis reumatoide, lupus, esclerosis múltiple, vitiligo, psoriasis, dermatomiositis, esclerodermia, hepatitis autoinmune, síndrome de Sjögren, uveítis, Addison",
        "Hormonales: Climaterio/menopausia, disfunción eréctil, pérdida de libido, trastornos menstruales, sequedad/flacidez cutánea, envejecimiento prematuro",
        "Generales / Preventivas: Antienvejecimiento, fatiga crónica, estrés, ansiedad, insomnio, déficit de memoria, apoyo pre/post quirúrgico, quimio/radioterapia, inmunosupresión"
      ],
      image: "/ImplantedePlacenta.webp",
    },
    {
      title: "Pellet Hormonal",
      description: "Equilibrio hormonal duradero en solo 10 minutos.",
      features: [
        "Equilibrio hormonal",
        "Duradero",
        "Procedimiento rápido",
        "Mejoras notables"
      ],
      detailedDescription: "El pellet hormonal es un implante subdérmico que libera hormonas de forma constante y natural durante aproximadamente 6 meses. Es un procedimiento ambulatorio de solo 10 minutos que permite un equilibrio hormonal sostenido y efectivo.",
      detailedFeatures: [
        "¿Cómo se aplica?: Implante subdérmico en glúteo con anestesia local, procedimiento ambulatorio de 10 minutos, efectos duran ~6 meses, con mejorías notables desde las primeras semanas",
        "Beneficios:",
        "Reducción de fatiga y mejora del humor",
        "Piel más saludable",
        "Desaparición de ataques de pánico, depresión y bochornos",
        "Mejora del sueño, concentración y bienestar general",
        "Fortalecimiento del sistema inmunológico",
        "Específicamente en mujeres (menopausia):",
        "Recupera/incrementa la libido",
        "Aumenta masa magra y reduce grasa corporal",
        "Alivia ansiedad, depresión, irritabilidad y nerviosismo",
        "Mejora memoria, claridad mental y corrige insomnio",
        "Ideal para mujeres y hombres que buscan recuperar energía, control emocional y calidad de vida."
      ],
      image: "/PelletHormonal.webp",
    }
  ];

  const pelletHombresService: Service = {
    title: "Pellet Hormonal ♂️",
    description: "Cómo beneficia a los hombres: energía, libido, masa muscular y más.",
    features: [
      "Aumenta energía física y mental",
      "Incrementa el deseo sexual (libido)",
      "Aumenta la masa muscular",
      "Fortalece la densidad ósea",
      "Favorece la producción de esperma",
      "Mejora la calidad del sueño"
    ],
    detailedDescription: "El Pellet Hormonal es un chip de testosterona que se aplica en aproximadamente 20 minutos y cuyo efecto dura 6 meses. Es ideal para hombres que buscan recuperar vitalidad, deseo sexual, fuerza muscular y bienestar general.",
    detailedFeatures: [
      "📌 ¿Qué es el Pellet Hormonal?",
      "Es un implante subdérmico de testosterona que se aplica en 20 minutos y dura 6 meses.",
      ,
      "💪 BENEFICIOS ESPECÍFICOS EN HOMBRES:",
      "🔹 Aumenta energía física y mental",
      "Mayor vitalidad durante el día y mejor rendimiento general.",
      ,
      "🔹 Incrementa el deseo sexual (libido)",
      "Mejor función sexual y aumento del interés sexual.",
      ,
      "🔹 Aumenta la masa muscular",
      "Promueve el crecimiento muscular y mejora la composición corporal.",
      ,
      "🔹 Fortalece la densidad ósea",
      "Ayuda a prevenir pérdida ósea y mejora la salud de los huesos.",
      ,
      "🔹 Favorece la producción de esperma",
      "Apoya la salud reproductiva masculina.",
      ,
      "🔹 Mejora la calidad del sueño",
      "Ayuda a descansar mejor y reduce problemas de insomnio.",
      ,
      "🎯 ¿Quién puede beneficiarse?",
      "Hombres mayores de 30 años con síntomas de baja testosterona: fatiga, pérdida de libido, disminución de masa muscular, insomnio, irritabilidad, pérdida de concentración, etc.",
      ,
      "⏱️ Duración y aplicación:",
      "Procedimiento ambulatorio, con anestesia local, en glúteo o abdomen. Efecto visible desde la primera semana, máximo efecto en 4-6 semanas. Dura 6 meses.",
      ,
      "⚠️ Consideraciones:",
      "Se requiere evaluación médica previa. No recomendado en casos de cáncer prostático no tratado, enfermedad hepática grave o tromboembolismo activo."
    ],
    image: "/PelletHormonal.webp",
  };

  const itemTransition: Transition = { duration: 0.5, ease: easeOutFunction };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: itemTransition },
  };

  return (
    <section className="py-20 px-4 relative bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            className="font-pinyon text-4xl sm:text-5xl lg:text-6xl text-[#CEA663] mb-4 leading-tight"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={itemVariants}
          >
            Nuestros Servicios
          </motion.h2>

          <motion.p
            className="font-taviraj text-xl sm:text-2xl lg:text-3xl text-[#C4B497] max-w-3xl mx-auto leading-relaxed"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={itemVariants}
          >
            Descubre nuestra gama completa de tratamientos médicos especializados en medicina estética y regenerativa
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={itemVariants}
              transition={{ delay: index * 0.15, ...itemVariants.visible.transition }}
              className="h-full"
            >
              <Card className="bg-[#000000]/50 backdrop-blur-sm rounded-2xl p-6 border border-[#CEA663]/20 hover-glow transition-all duration-300 group h-full flex flex-col">
                <CardHeader className="text-center">
                  <div className="mb-4 group-hover:scale-105 transition-transform">
                    <div className="w-20 h-20 mx-auto overflow-hidden rounded-xl">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <CardTitle className="text-lg text-white">{service.title}</CardTitle>
                  <CardDescription className="text-gray-300">{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between">
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-300">
                        <div className="w-1.5 h-1.5 bg-[#CEA663] rounded-full mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant="outline"
                    className="w-full border-[#CEA663]/30 text-white hover:border-[#CEA663] hover:bg-[#CEA663]/20"
                    onClick={() => handleLearnMoreClick(service)}
                  >
                    Ver más
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={itemVariants}
            transition={{ delay: services.length * 0.15 + 0.2, ...itemVariants.visible.transition }}
            className="bg-[#000000]/50 backdrop-blur-sm rounded-2xl p-6 border border-[#CEA663]/20 hover-glow transition-all duration-300"
          >
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="md:w-1/4 flex-shrink-0 flex flex-col items-center">
                <div className="mb-4 group-hover:scale-105 transition-transform">
                  <div className="w-20 h-20 overflow-hidden rounded-xl">
                    <img
                      src={pelletHombresService.image}
                      alt="Pellet Hormonal para Hombres"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
                <CardTitle className="text-lg text-white text-center">Pellet Hormonal ♂️</CardTitle>
                <CardDescription className="text-gray-300 text-center mt-2">
                  Cómo beneficia a los hombres: energía, libido, masa muscular y más.
                </CardDescription>
              </div>

              <div className="md:w-1/4 flex-shrink-0">
                <h3 className="font-semibold text-white mb-4">BENEFICIOS</h3>
                <ul className="space-y-2">
                  {pelletHombresService.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-300">
                      <div className="w-1.5 h-1.5 bg-[#CEA663] rounded-full mr-2 mt-1.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="md:w-2/4 flex-grow">
                <h3 className="font-semibold text-white mb-4">¿Cómo te beneficia en tu día a día?</h3>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start text-sm text-gray-300">
                    <div className="w-1.5 h-1.5 bg-[#CEA663] rounded-full mr-2 mt-1.5" />
                    <span>Empiezas el día con <strong>energía renovada</strong>, sin fatiga ni somnolencia.</span>
                  </li>
                  <li className="flex items-start text-sm text-gray-300">
                    <div className="w-1.5 h-1.5 bg-[#CEA663] rounded-full mr-2 mt-1.5" />
                    <span>Recuperas el <strong>deseo sexual</strong> y la confianza en ti mismo.</span>
                  </li>
                  <li className="flex items-start text-sm text-gray-300">
                    <div className="w-1.5 h-1.5 bg-[#CEA663] rounded-full mr-2 mt-1.5" />
                    <span>Tu cuerpo se <strong>tonifica y fortalece</strong> con menos esfuerzo.</span>
                  </li>
                  <li className="flex items-start text-sm text-gray-300">
                    <div className="w-1.5 h-1.5 bg-[#CEA663] rounded-full mr-2 mt-1.5" />
                    <span>Duerme profundamente y <strong>despiertas descansado</strong>.</span>
                  </li>
                  <li className="flex items-start text-sm text-gray-300">
                    <div className="w-1.5 h-1.5 bg-[#CEA663] rounded-full mr-2 mt-1.5" />
                    <span>Te sientes <strong>más enfocado, seguro y en control</strong> de tu vida.</span>
                  </li>
                </ul>
                <Button
                  variant="outline"
                  className="w-full md:w-auto border-[#CEA663]/30 text-white hover:border-[#CEA663] hover:bg-[#CEA663]/20"
                  onClick={() => handleLearnMoreClick(pelletHombresService)}
                >
                  Ver más
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ✅ Botón Agendar Consulta — con scroll suave */}
        <div className="text-center mt-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={itemVariants}
            transition={{ delay: services.length * 0.15 + 0.4, ...itemVariants.visible.transition }}
          >
            <Button
              size="lg"
              className="bg-[#CEA663] hover:bg-[#C4A490] text-black font-quicksand font-semibold px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              onClick={scrollToContact}
            >
              Agendar Consulta
            </Button>
          </motion.div>
        </div>
      </div>

      {isModalOpen && selectedService && (
        <ServiceDetailModal service={selectedService} onClose={closeModal} />
      )}
    </section>
  );
};