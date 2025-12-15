import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// ✅ Actualizamos la interfaz ServiceData para incluir la propiedad 'image'
interface ServiceData {
  title: string;
  description: string;
  features: string[];
  detailedDescription?: string;
  detailedFeatures?: string[];
  image: string; // <-- Nueva propiedad para la URL de la imagen
}

interface ServiceDetailModalProps {
  service: ServiceData | null;
  onClose: () => void;
}

const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({ service, onClose }) => {
  if (!service) return null;

  // Manejar el cierre al presionar ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Prevenir el scroll de la página cuando el modal está abierto
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Manejar el cierre al hacer clic fuera del contenido
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      {/* ✅ Contenedor principal del modal */}
      <div className="relative w-full max-w-lg max-h-[80vh]">
        {/* Botón de cierre fijo en la esquina superior derecha del contenedor */}
        <div className="absolute top-4 right-4 z-20">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Cerrar modal"
            className="text-white hover:bg-[#000000] hover:text-white w-8 h-8 bg-transparent border-none shadow-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Button>
        </div>

        {/* Contenido del modal con scroll propio */}
        <div 
          className="bg-[#000000]/90 backdrop-blur-md border-[#CEA663]/30 border-2 shadow-xl rounded-xl overflow-y-auto"
          style={{
            maxHeight: 'calc(80vh - 2rem)', // Ajustamos la altura máxima para dejar espacio para el botón
            minHeight: '60vh',
            scrollbarWidth: 'thin',
            scrollbarColor: '#CEA663 transparent',
          }}
        >
          {/* Estilos personalizados para la barra de scroll */}
          <style>{`
            .modal-content::-webkit-scrollbar {
              width: 8px;
            }

            .modal-content::-webkit-scrollbar-track {
              background: transparent;
              border-radius: 4px;
            }

            .modal-content::-webkit-scrollbar-thumb {
              background: linear-gradient(135deg, hsl(40, 45%, 60%), hsl(40, 45%, 50%));
              border-radius: 4px;
              box-shadow: 0 0 20px hsla(40, 45%, 60%, 0.3), 0 0 30px hsla(40, 45%, 60%, 0.5);
            }

            .modal-content::-webkit-scrollbar-thumb:hover {
              background: linear-gradient(135deg, hsl(40, 45%, 65%), hsl(40, 45%, 55%));
            }
          `}</style>

          {/* Contenido del card */}
          <Card
            className="w-full h-full modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ✅ Añadimos padding (p-6) al CardHeader para mejorar el espaciado */}
            <CardHeader className="pb-4 pt-6 pr-12 pl-6"> {/* Espacio para el botón de cierre y padding izquierdo */}
              <div className="flex items-start space-x-4">
                {/* ✅ Reemplazamos el ícono genérico por la imagen del servicio */}
                <div className="w-16 h-16 overflow-hidden rounded-md">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div>
                  <CardTitle className="text-2xl text-white">{service.title}</CardTitle>
                  <p className="text-gray-300 mt-1">{service.description}</p>
                </div>
              </div>
            </CardHeader>

            {/* ✅ Añadimos padding (p-6) al CardContent para que el texto no quede pegado a los bordes */}
            <CardContent className="space-y-6 px-6 pb-6">
              {service.detailedDescription && (
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-[#CEA663]">Descripción Detallada:</h3>
                  <p className="text-base text-gray-300 leading-relaxed">{service.detailedDescription}</p>
                </div>
              )}

              {service.detailedFeatures && service.detailedFeatures.length > 0 && (
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-[#CEA663]">Características Detalladas:</h3>
                  <ul className="space-y-2">
                    {service.detailedFeatures.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-[#CEA663] rounded-full mr-2 mt-2.5" />
                        <span className="text-base text-gray-300 leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailModal;