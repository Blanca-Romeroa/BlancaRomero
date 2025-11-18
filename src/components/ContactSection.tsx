// src/components/ContactSection.tsx
import React, { useState, useEffect, useRef } from 'react';
import { User, Mail, Phone, Send, Loader2, MessageSquare, Clock, CheckCircle, Zap, MapPin, ArrowRight, ExternalLink, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  message?: string;
}

// ✅ Número de WhatsApp: 664 574 8899
const WHATSAPP_NUMBER = "526645748899";

// 📍 NUEVA URL de Google Maps (ubicación actualizada)
const GOOGLE_MAPS_URL = "https://www.google.com/maps/place/Dra.+Blanca+Romero+A./@32.5303964,-116.9774185,51m/data=!3m1!1e3!4m6!3m5!1s0x80d947a1625a3d1f:0x54a142085a5a6c4!8m2!3d32.5304044!4d-116.9773594!16s%2Fg%2F11gmz1cv55?entry=ttu&g_ep=EgoyMDI1MTExMi4wIKXMDSoASAFQAw%3D%3D";
// 🚗 URL de Google Maps con ruta desde la ubicación actual del usuario
const GET_DIRECTIONS_URL = "https://www.google.com/maps/dir/?api=1&destination=Dra.+Blanca+Romero+A.&travelmode=driving";

// 🔧 AJUSTES NUMÉRICOS — MODIFICA ESTOS VALORES A TU ANTOJO 👇

// 👉 MAPA — altura configurable (el resto ya no se necesita)
const MAP_CONFIG = {
  height: 195, // Altura en px (puedes ajustar: 180, 200, 220...)
} as const;

// 🔧 FIN — solo edita el height arriba 👆

const ContactSection: React.FC = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'El nombre es obligatorio';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'El apellido es obligatorio';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'El correo es obligatorio';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Por favor ingresa un correo válido';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'El mensaje es obligatorio';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast({
        title: "Error de validación",
        description: "Por favor completa todos los campos obligatorios.",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    setIsSubmitted(false);
    try {
      const prefix = '¡Hola! Me gustaría agendar una consulta o resolver una duda.\n\n';
      const compiledMessage = `${prefix}Nombre: ${formData.firstName} ${formData.lastName}${
        formData.phone ? `\nTeléfono: ${formData.phone}` : ''
      }\nEmail: ${formData.email}${
        formData.subject ? `\nAsunto: ${formData.subject}` : ''
      }\nMensaje: ${formData.message}`;
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(compiledMessage)}`;
      await new Promise(resolve => setTimeout(resolve, 1000));
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      setFormData({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        subject: '',
        message: ''
      });
      toast({
        title: "¡Éxito!",
        description: "Tu mensaje ha sido preparado en WhatsApp.",
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error enviando mensaje:", error);
      toast({
        title: "Error",
        description: "Algo salió mal. Inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Correo electrónico',
      value: 'soy_tudoctora@hotmail.com',
      description: 'Responde en menos de 24 hrs.'
    },
    {
      icon: Phone,
      title: 'Teléfono y WhatsApp',
      value: '(664) 574-8899',
      description: 'Llámanos o escríbenos directamente.'
    },
    {
      icon: MapPin,
      title: 'Ubicación',
      value: 'Plaza Altabrisa, Tijuana',
      description: 'Calzada del Tecnológico #13999, Int. B-104, C.P. 22420'
    },
    {
      icon: Clock,
      title: 'Horario de atención',
      value: 'Lun–Vie: 8:00 AM – 4:00 PM\nSáb: 7:00 AM – 2:00 PM\nDom: Cerrado',
      description: 'Atendemos con cita previa.'
    }
  ];

  const services = [
    'Sueroterapia IV',
    'Células Madre',
    'Implante de Placenta',
    'Pellet Hormonal',
    'Medicina Estética Facial',
    'Tratamientos Corporales',
    'Nutrición y Suplementación',
    'Terapia Antiedad',
  ];

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-20 px-4 relative overflow-hidden bg-transparent"
      id="contact"
    >
      <div className="max-w-7xl mx-auto w-full px-4">
        <div className="text-center mb-12 md:mb-16">
          <div className={`transition-all duration-800 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h2 className="font-pinyon text-4xl sm:text-5xl lg:text-6xl text-[#CEA663] mb-4 leading-tight">
              Contáctanos
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#CEA663] to-[#C4B497] rounded-full mx-auto mb-6"></div>
            <p className="font-taviraj text-xl sm:text-2xl lg:text-3xl text-[#D4BAAC] max-w-3xl mx-auto leading-relaxed">
              ¿Listo para comenzar tu transformación? Envíanos un mensaje y te responderemos a través de WhatsApp.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Left Column - Contact Info */}
          <div className="lg:col-span-1">
            <Card className="bg-[#000000]/50 backdrop-blur-sm rounded-2xl p-8 border border-[#CEA663]/20 hover-glow transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center text-[#CEA663] font-taviraj">
                  <MessageSquare className="w-6 h-6 mr-2" />
                  Ponte en contacto
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="p-2.5 rounded-lg bg-[#CEA663]/20">
                      <info.icon className="w-5 h-5 text-[#CEA663]" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-taviraj font-semibold text-[#CEA663] mb-0.5 text-balance">{info.title}</h4>
                      <p className="font-quicksand font-medium mb-0.5 text-white text-balance whitespace-pre-line">{info.value}</p>
                      <p className="font-quicksand text-sm text-gray-400 text-balance">{info.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-[#000000]/50 backdrop-blur-sm rounded-2xl p-6 border border-[#CEA663]/20 hover-glow transition-all duration-300 mt-6">
              <CardContent className="p-5 md:p-6">
                <h4 className="font-taviraj font-semibold mb-3 md:mb-4 text-[#CEA663]">Acciones rápidas</h4>
                <div className="space-y-3">
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group"
                  >
                    <Button variant="outline" className="w-full justify-start border-[#CEA663]/30 text-white hover:border-[#CEA663] hover:bg-[#CEA663]/20">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Chat de WhatsApp
                    </Button>
                  </a>
                  <a
                    href={`tel:+526645748899`}
                    className="block group"
                  >
                    <Button variant="outline" className="w-full justify-start border-[#CEA663]/30 text-white hover:border-[#CEA663] hover:bg-[#CEA663]/20">
                      <Phone className="w-4 h-4 mr-2" />
                      Llama ahora
                    </Button>
                  </a>
                  <Button variant="outline" className="w-full justify-start border-[#CEA663]/30 text-white hover:border-[#CEA663] hover:bg-[#CEA663]/20">
                    <Zap className="w-4 h-4 mr-2" />
                    Consulta gratuita
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Form + Map + ¿Cómo llegar? */}
          <div className="lg:col-span-2">
            <Card className="bg-[#000000]/50 backdrop-blur-sm rounded-2xl p-8 border border-[#CEA663]/20 hover-glow transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl md:text-2xl font-taviraj text-[#CEA663]">
                  Envíanos un mensaje
                </CardTitle>
                <p className="font-quicksand text-gray-300 text-balance">
                  Completa el formulario y te responderemos lo antes posible.
                </p>
              </CardHeader>
              <CardContent>
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="firstName" className="font-quicksand text-sm font-medium flex items-center gap-2 text-[#CEA663]">
                          <User className="w-4 h-4" />
                          Nombre *
                        </label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="Ingresa tu nombre"
                          className={`bg-[#000000]/50 border-[#CEA663]/30 focus:border-[#CEA663] ${errors.firstName ? 'border-destructive' : ''}`}
                        />
                        {errors.firstName && (
                          <p className="font-quicksand text-sm text-destructive">{errors.firstName}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="lastName" className="font-quicksand text-sm font-medium flex items-center gap-2 text-[#CEA663]">
                          <User className="w-4 h-4" />
                          Apellido *
                        </label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="Ingresa tu apellido"
                          className={`bg-[#000000]/50 border-[#CEA663]/30 focus:border-[#CEA663] ${errors.lastName ? 'border-destructive' : ''}`}
                        />
                        {errors.lastName && (
                          <p className="font-quicksand text-sm text-destructive">{errors.lastName}</p>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="phone" className="font-quicksand text-sm font-medium flex items-center gap-2 text-[#CEA663]">
                          <Phone className="w-4 h-4" />
                          Teléfono (Opcional)
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="Ej: 123 456 7890"
                          className="bg-[#000000]/50 border-[#CEA663]/30 focus:border-[#CEA663]"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="font-quicksand text-sm font-medium flex items-center gap-2 text-[#CEA663]">
                          <Mail className="w-4 h-4" />
                          Correo *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Ingresa tu correo"
                          className={`bg-[#000000]/50 border-[#CEA663]/30 focus:border-[#CEA663] ${errors.email ? 'border-destructive' : ''}`}
                        />
                        {errors.email && (
                          <p className="font-quicksand text-sm text-destructive">{errors.email}</p>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="subject" className="font-quicksand text-sm font-medium text-[#CEA663]">
                        Servicio de interés (Opcional)
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-[#000000]/50 border border-[#CEA663]/30 rounded-md focus:border-[#CEA663] text-white font-quicksand"
                      >
                        <option value="">Selecciona una opción</option>
                        {services.map((service, index) => (
                          <option key={index} value={service}>{service}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="font-quicksand text-sm font-medium text-[#CEA663]">
                        Mensaje *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Cuéntanos cómo podemos ayudarte…"
                        rows={4}
                        className={`bg-[#000000]/50 border-[#CEA663]/30 focus:border-[#CEA663] resize-none ${errors.message ? 'border-destructive' : ''}`}
                      />
                      {errors.message && (
                        <p className="font-quicksand text-sm text-destructive">{errors.message}</p>
                      )}
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-[#CEA663] hover:bg-[#C4A490] text-black font-quicksand font-semibold"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Preparando tu mensaje...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Enviar por WhatsApp
                        </>
                      )}
                    </Button>
                    <p className="font-quicksand text-xs text-gray-400 text-center text-balance">
                      Responderemos lo más pronto posible durante nuestro horario de atención.
                    </p>
                  </form>
                ) : (
                  <div className="text-center py-8">
                    <div className="flex justify-center mb-4">
                      <CheckCircle className="w-14 h-14 md:w-16 md:h-16 text-[#CEA663]" />
                    </div>
                    <h3 className="font-taviraj text-xl md:text-2xl font-semibold mb-3 text-[#CEA663]">
                      ¡Gracias por contactarnos!
                    </h3>
                    <p className="font-quicksand text-gray-300 mb-4 text-balance">
                      Hemos preparado tu mensaje para WhatsApp con todos tus datos.
                    </p>
                    <div className="bg-[#CEA663]/10 border border-[#CEA663]/20 rounded-lg p-3 md:p-4">
                      <p className="font-quicksand text-sm text-[#CEA663] text-balance">
                        Deberías ver WhatsApp abierto con tu mensaje listo para enviar.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* ✅ Mapa + "¿Cómo llegar?" — LAYOUT RESPONSIVE (FLEX) */}
            <div className="mt-6">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Mapa */}
                <div className="flex-1 min-w-0">
                  <Card 
                    className="bg-[#000000]/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-[#CEA663]/20 hover-glow transition-all duration-300"
                    style={{ height: `${MAP_CONFIG.height}px` }}
                  >
                    <div className="h-full w-full overflow-hidden rounded-xl">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3322.682602448357!2d-116.9774185!3d32.5304044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80d947a1625a3d1f:0x54a142085a5a6c4!2sDra.%20Blanca%20Romero%20A.!5e0!3m2!1ses!2smx!4v1736983458666!5m2!1ses!2smx"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Ubicación de la clínica Dra. Blanca Romero"
                      ></iframe>
                    </div>
                  </Card>
                </div>

                {/* "¿Cómo llegar?" — FLEXIBLE */}
                <div className="md:w-[350px]">
                  <Card 
                    className="bg-[#000000]/50 backdrop-blur-sm rounded-2xl p-4 border border-[#CEA663]/20 hover-glow transition-all duration-300 h-full"
                  >
                    <CardHeader className="p-2 pb-1">
                      <CardTitle className="text-[#CEA663] font-taviraj text-sm">¿Cómo llegar?</CardTitle>
                    </CardHeader>
                    <CardContent className="p-2 pt-1 space-y-2">
                      <a
                        href={GOOGLE_MAPS_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <Button
                          variant="outline"
                          className="w-full justify-center h-10 text-sm border-[#CEA663]/30 text-white hover:border-[#CEA663] hover:bg-[#CEA663]/20"
                        >
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Abrir en Google Maps
                        </Button>
                      </a>
                      <a
                        href={GET_DIRECTIONS_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <Button
                          variant="outline"
                          className="w-full justify-center h-10 text-sm border-[#CEA663]/30 text-white hover:border-[#CEA663] hover:bg-[#CEA663]/20"
                        >
                          <Navigation className="w-4 h-4 mr-1" />
                          Obtener direcciones
                        </Button>
                      </a>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div
          className="mt-12 md:mt-16 text-center bg-[#000000]/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-[#CEA663]/20 hover-glow transition-all duration-300"
        >
          <h3 className="font-taviraj text-xl md:text-2xl font-bold mb-3 md:mb-4 text-white">
            ¿Listo para tu transformación integral?
          </h3>
          <p className="font-quicksand text-gray-300 mb-5 max-w-2xl mx-auto text-balance">
            Combinamos ciencia avanzada con un enfoque humano para ayudarte a verte y sentirte mejor.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full sm:w-auto"
            >
              <Button
                size="lg"
                className="group w-full sm:w-auto px-6 bg-[#CEA663] hover:bg-[#C4A490] text-black font-quicksand font-semibold"
              >
                Agenda tu cita hoy
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
            <a
              href="#faq"
              className="block w-full sm:w-auto"
            >
              <Button
                variant="outline"
                size="lg"
                className="group w-full sm:w-auto px-6 border-[#CEA663]/30 text-white hover:border-[#CEA663] hover:bg-[#CEA663]/20 font-quicksand"
              >
                Ver preguntas frecuentes
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;