// src/components/ContactSection.tsx
import React, { useState } from 'react';
import { User, Mail, Phone, Send, Loader2, MessageSquare, Clock, CheckCircle, Zap, MapPin, ArrowRight, ExternalLink, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

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

const WHATSAPP_NUMBER = "526645748899";
const GOOGLE_MAPS_URL = "https://www.google.com/maps/place/Dra.+Blanca+Romero+A./@32.5303964,-116.9774185,51m/data=!3m1!1e3!4m6!3m5!1s0x80d947a1625a3d1f:0x54a142085a5a6c4!8m2!3d32.5304044!4d-116.9773594!16s%2Fg%2F11gmz1cv55?entry=ttu";
const GET_DIRECTIONS_URL = "https://www.google.com/maps/dir/?api=1&destination=Dra.+Blanca+Romero+A.&travelmode=driving";

const ContactSection: React.FC = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: '', lastName: '', phone: '', email: '', subject: '', message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'El nombre es obligatorio';
    if (!formData.lastName.trim()) newErrors.lastName = 'El apellido es obligatorio';
    if (!formData.email.trim()) {
      newErrors.email = 'El correo es obligatorio';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Por favor ingresa un correo válido';
    }
    if (!formData.message.trim()) newErrors.message = 'El mensaje es obligatorio';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast({ title: "Error", description: "Completa todos los campos requeridos.", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    try {
      const compiledMessage = `
¡Hola Dra. Blanca! Me gustaría agendar una cita o resolver una duda.

Nombre: ${formData.firstName} ${formData.lastName}
${formData.phone ? `Teléfono: ${formData.phone}` : ''}
Email: ${formData.email}
${formData.subject ? `Servicio de interés: ${formData.subject}` : ''}
Mensaje: ${formData.message}
      `.trim();

      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(compiledMessage)}`;
      await new Promise(r => setTimeout(r, 1000));
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

      setFormData({ firstName: '', lastName: '', phone: '', email: '', subject: '', message: '' });
      toast({ title: "¡Listo!", description: "Tu mensaje está listo en WhatsApp." });
      setIsSubmitted(true);
    } catch (err) {
      toast({ title: "Error", description: "Algo salió mal. Inténtalo de nuevo.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const contactInfo = [
    { icon: Mail, title: 'Correo electrónico', value: 'soy_tudoctora@hotmail.com', description: 'Responde en menos de 24 hrs.' },
    { icon: Phone, title: 'Teléfono y WhatsApp', value: '(664) 574-8899', description: 'Llámanos o escríbenos directamente.' },
    { icon: MapPin, title: 'Ubicación', value: 'Plaza Altabrisa, Tijuana', description: 'Calzada del Tecnológico #13999, Int. B-104, C.P. 22420' },
    {
      icon: Clock,
      title: 'Horario de atención',
      value: [
        { day: 'Lunes–Viernes', hours: '8:00 AM – 4:00 PM' },
        { day: 'Sábado', hours: '7:00 AM – 2:00 PM' },
        { day: 'Domingo', hours: 'Cerrado' }
      ],
      description: 'Atendemos con cita previa.'
    }
  ];

  const services = [
    'Sueroterapia IV', 'Células Madre', 'Implante de Placenta', 'Pellet Hormonal',
    'Medicina Estética Facial', 'Tratamientos Corporales', 'Nutrición y Suplementación', 'Terapia Antiedad'
  ];

  return (
    <section className="py-16 md:py-20 px-4 relative overflow-hidden" id="contact">
      <div className="max-w-7xl mx-auto w-full px-4">
        {/* Título */}
        <div className="text-center mb-12 md:mb-16">
          <motion.h2
            className="font-pinyon text-4xl sm:text-5xl lg:text-6xl text-[#CEA663] mb-4 leading-tight"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Contáctanos
          </motion.h2>
          <motion.div
            className="w-20 h-1 bg-gradient-to-r from-[#CEA663] to-[#C4B497] rounded-full mx-auto mb-6"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          />
          <motion.p
            className="font-taviraj text-xl sm:text-2xl lg:text-3xl text-[#D4BAAC] max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            ¿Listo para comenzar tu transformación? Envíanos un mensaje y te responderemos a través de WhatsApp.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Columna Izquierda */}
          <div className="lg:col-span-1 space-y-6">
            {/* Información de Contacto - CENTRADA COMO EN TU IMAGEN FAVORITA */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-[#000000]/50 backdrop-blur-sm rounded-2xl border border-[#CEA663]/20 hover:bg-[#000000]/60 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center justify-center text-[#CEA663] text-2xl">
                    <MessageSquare className="w-6 h-6 mr-2" />
                    Ponte en contacto
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {contactInfo.map((info, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center text-center p-4 border-b border-[#CEA663]/10 last:border-b-0"
                    >
                      <div className="p-3 rounded-full bg-[#CEA663]/20 mb-3">
                        <info.icon className="w-6 h-6 text-[#CEA663]" />
                      </div>
                      <h4 className="text-lg font-bold text-[#CEA663] mb-2">
                        {info.title}
                      </h4>
                      {Array.isArray(info.value) ? (
                        <div className="space-y-1 text-white text-sm">
                          {info.value.map((item, idx) => (
                            <div key={idx}>
                              <span className="font-medium">{item.day}</span>
                              <span className="text-[#CEA663] ml-2">{item.hours}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-white font-medium mb-1">{info.value}</p>
                      )}
                      <p className="text-sm text-gray-400">{info.description}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Acciones Rápidas */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Card className="bg-[#000000]/50 backdrop-blur-sm rounded-2xl border border-[#CEA663]/20 hover:bg-[#000000]/60 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-xl text-[#CEA663] text-center">
                    Acciones rápidas
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" className="w-full border-[#CEA663]/30 text-white hover:bg-[#CEA663]/10 hover:border-[#CEA663]">
                        <MessageSquare className="w-4 h-4 mr-2" /> WhatsApp
                      </Button>
                    </a>
                    <a href="tel:+526645748899">
                      <Button variant="outline" className="w-full border-[#CEA663]/30 text-white hover:bg-[#CEA663]/10 hover:border-[#CEA663]">
                        <Phone className="w-4 h-4 mr-2" /> Llamar
                      </Button>
                    </a>
                    <Button variant="outline" className="w-full border-[#CEA663]/30 text-white hover:bg-[#CEA663]/10 hover:border-[#CEA663]">
                      <Zap className="w-4 h-4 mr-2" /> Consulta
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Columna Derecha */}
          <div className="lg:col-span-2 space-y-6">
            {/* Formulario */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-[#000000]/50 backdrop-blur-sm rounded-2xl border border-[#CEA663]/20 hover:bg-[#000000]/60 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-2xl text-[#CEA663]">Envíanos un mensaje</CardTitle>
                  <p className="text-gray-300">Completa el formulario y te responderemos lo antes posible.</p>
                </CardHeader>
                <CardContent>
                  {!isSubmitted ? (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      {/* Formulario igual que antes */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium flex items-center gap-2 text-[#CEA663]">
                            <User className="w-4 h-4" /> Nombre *
                          </label>
                          <Input name="firstName" value={formData.firstName} onChange={handleInputChange}
                            placeholder="Ingresa tu nombre" className="bg-[#000000]/50 border-[#CEA663]/30 focus:border-[#CEA663]" />
                          {errors.firstName && <p className="text-sm text-red-400">{errors.firstName}</p>}
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium flex items-center gap-2 text-[#CEA663]">
                            <User className="w-4 h-4" /> Apellido *
                          </label>
                          <Input name="lastName" value={formData.lastName} onChange={handleInputChange}
                            placeholder="Ingresa tu apellido" className="bg-[#000000]/50 border-[#CEA663]/30 focus:border-[#CEA663]" />
                          {errors.lastName && <p className="text-sm text-red-400">{errors.lastName}</p>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium flex items-center gap-2 text-[#CEA663]">
                            <Phone className="w-4 h-4" /> Teléfono (Opcional)
                          </label>
                          <Input name="phone" type="tel" value={formData.phone} onChange={handleInputChange}
                            placeholder="664 123 4567" className="bg-[#000000]/50 border-[#CEA663]/30 focus:border-[#CEA663]" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium flex items-center gap-2 text-[#CEA663]">
                            <Mail className="w-4 h-4" /> Correo *
                          </label>
                          <Input name="email" value={formData.email} onChange={handleInputChange}
                            placeholder="tu@email.com" className="bg-[#000000]/50 border-[#CEA663]/30 focus:border-[#CEA663]" />
                          {errors.email && <p className="text-sm text-red-400">{errors.email}</p>}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-[#CEA663]">Servicio de interés (Opcional)</label>
                        <select name="subject" value={formData.subject} onChange={handleInputChange}
                          className="w-full px-3 py-2 bg-[#000000]/50 border border-[#CEA663]/30 rounded-md focus:border-[#CEA663] text-white">
                          <option value="">Selecciona un servicio</option>
                          {services.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-[#CEA663]">Mensaje *</label>
                        <Textarea name="message" value={formData.message} onChange={handleInputChange}
                          placeholder="Cuéntanos cómo podemos ayudarte…" rows={4}
                          className="bg-[#000000]/50 border-[#CEA663]/30 focus:border-[#CEA663] resize-none" />
                        {errors.message && <p className="text-sm text-red-400">{errors.message}</p>}
                      </div>

                      <Button type="submit" size="lg" className="w-full bg-[#CEA663] hover:bg-[#C4A490] text-black font-semibold"
                        disabled={isLoading}>
                        {isLoading ? <>Preparando...</> : <>Enviar por WhatsApp</>}
                      </Button>
                    </form>
                  ) : (
                    <div className="text-center py-12">
                      <CheckCircle className="w-16 h-16 mx-auto text-[#CEA663] mb-4" />
                      <h3 className="text-2xl font-semibold text-[#CEA663]">¡Gracias!</h3>
                      <p className="text-gray-300 mt-3">Tu mensaje está listo en WhatsApp.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Mapa + Cómo llegar */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <Card className="rounded-2xl overflow-hidden border border-[#CEA663]/20 h-80">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3322.682602448357!2d-116.9774185!3d32.5304044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80d947a1625a3d1f:0x54a142085a5a6c4!2sDra.%20Blanca%20Romero%20A.!5e0!3m2!1ses!2smx!4v1736983458666!5m2!1ses!2smx"
                    width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"></iframe>
                </Card>
              </div>
              <div className="md:w-80">
                <Card className="bg-[#000000]/50 backdrop-blur-sm rounded-2xl border border-[#CEA663]/20 h-full p-6 flex flex-col justify-center">
                  <h4 className="text-[#CEA663] font-bold text-center mb-6 text-lg">¿Cómo llegar?</h4>
                  <div className="space-y-4">
                    <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer" className="block">
                      <Button variant="outline" className="w-full border-[#CEA663]/30 hover:bg-[#CEA663]/10">
                        Abrir en Google Maps
                      </Button>
                    </a>
                    <a href={GET_DIRECTIONS_URL} target="_blank" rel="noopener noreferrer" className="block">
                      <Button variant="outline" className="w-full border-[#CEA663]/30 hover:bg-[#CEA663]/10">
                        Obtener ruta
                      </Button>
                    </a>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Final */}
        <motion.div
          className="mt-16 text-center bg-[#000000]/50 backdrop-blur-sm rounded-2xl p-8 border border-[#CEA663]/20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            ¿Listo para tu transformación integral?
          </h3>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Combinamos ciencia avanzada con un enfoque humano para ayudarte a verte y sentirte mejor.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-[#CEA663] hover:bg-[#C4A490] text-black font-semibold px-10">
                Agenda tu cita hoy <ArrowRight className="ml-2" />
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;