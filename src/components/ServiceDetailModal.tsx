import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ServiceData {
  title: string;
  description: string;
  features: string[];
  detailedDescription?: string;
  detailedFeatures?: string[];
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
      <div className="relative w-full max-w-2xl h-[80vh] overflow-y-auto bg-[#000000]/90 backdrop-blur-md border-[#CEA663]/30 border-2 shadow-xl" 
           style={{ maxHeight: '80vh', maxWidth: '95vw' }}>
        
        {/* Botón de cierre fijo en la esquina superior derecha */}
        <div className="absolute top-4 right-4 z-10">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Cerrar modal"
            className="text-white hover:bg-[#000000] hover:text-white w-8 h-8"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Button>
        </div>

        {/* Contenido del modal - ahora con padding para no superponerse con la X */}
        <Card 
          className="w-full h-full overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <CardHeader className="pb-4 pt-6 pr-12"> {/* Espacio para el botón de cierre */}
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-[#CEA663]/20 rounded-md flex items-center justify-center">
                <div className="w-8 h-8 bg-[#CEA663] rounded-full"></div>
              </div>
              <div>
                <CardTitle className="text-2xl text-white">{service.title}</CardTitle>
                <p className="text-gray-300 mt-1">{service.description}</p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 px-4 pb-4">
            {service.detailedDescription && (
              <div>
                <h3 className="font-semibold text-lg mb-2 text-[#CEA663]">Descripción Detallada:</h3>
                <p className="text-base text-gray-300">{service.detailedDescription}</p>
              </div>
            )}

            {service.detailedFeatures && service.detailedFeatures.length > 0 && (
              <div>
                <h3 className="font-semibold text-lg mb-2 text-[#CEA663]">Características Detalladas:</h3>
                <ul className="space-y-2">
                  {service.detailedFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-[#CEA663] rounded-full mr-2 mt-2.5" />
                      <span className="text-base text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ServiceDetailModal;