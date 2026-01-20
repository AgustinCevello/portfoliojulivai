import React, { useState, useEffect } from 'react';
import { ChevronLeft, X } from 'lucide-react';
import { obtenerFotosDeDrive } from '../api';

/**
 * Icono de carga animado para estados de espera.
 */
const LoadingIcon = ({ className = "" }) => (
  <svg fill="hsl(270, 60%, 35%)" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z">
      <animateTransform attributeName="transform" type="rotate" dur="0.75s" values="0 12 12;360 12 12" repeatCount="indefinite"/>
    </path>
  </svg>
);

/**
 * Componente de imagen con Lazy Load y transición de opacidad.
 */
const OptimizedImage = ({ src, alt, className }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative w-full h-full bg-[#1a1a1a] ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <LoadingIcon className="w-6 h-6 opacity-20" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-700 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};

const PhotographyApp = ({ onProjectsLoad }) => {
  const [drivePhotos, setDrivePhotos] = useState(null);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  // Carga de datos desde Google Drive
  useEffect(() => {
    const cargarDatos = async () => {
      const datos = await obtenerFotosDeDrive();
      if (datos) {
        setDrivePhotos(datos);
        
        // Calcular cantidad de carpetas para el contador del modal
        const cantidad = Object.keys(datos).length;
        
        // Notificar al componente App.jsx el conteo de proyectos
        if (onProjectsLoad) {
          onProjectsLoad(cantidad);
        }
      }
      setLoading(false);
    };
    cargarDatos();
  }, [onProjectsLoad]);

  // Manejo del scroll del body cuando hay un modal abierto
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    if (selectedAlbum || selectedImage) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [selectedAlbum, selectedImage]);

  // Pantalla de carga inicial
  if (loading) {
    return (
      <div className="bg-black min-h-[400px] flex flex-col items-center justify-center">
        <LoadingIcon className="w-16 h-16 mb-4" />
        <p className="text-gray-500 font-black uppercase tracking-widest text-[10px]">Cargando Galería...</p>
      </div>
    );
  }

  // Transformar el objeto de Drive en una lista de álbumes para las portadas
  const albums = drivePhotos ? Object.keys(drivePhotos).map(key => {
    // Dividimos el nombre de la carpeta por el signo "!"
    const partes = key.split('!');
    
    // El título es lo que está antes del "!" (o el nombre entero si no hay "!")
    const tituloPrincipal = partes[0].trim().toUpperCase();
    
    // El subtítulo es lo que está después del "!" (o "PROYECTO" por defecto)
    const subtitulo = partes[1] ? partes[1].trim().toUpperCase() : "PROYECTO";

    return {
      id: key, // Mantenemos el nombre original de la carpeta para la referencia interna
      title: tituloPrincipal,
      sub: subtitulo,
      img: drivePhotos[key][0]?.url
    };
  }) : [];

  /** * VISTA PRINCIPAL: GRILLA DE PROYECTOS
   */
  if (!selectedAlbum) {
    return (
      <div className="bg-black min-h-full p-8 animate-in fade-in duration-500">
        <h3 className="text-white font-black text-xl mb-8 tracking-tighter uppercase">Portafolio</h3>
        
        {/* Grilla responsiva: 1 col móvil, 2 col tablet, 3 col en modal ancho (PC) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {albums.map((album) => (
            <div 
              key={album.id} 
              onClick={() => setSelectedAlbum(album.id)} 
              className="cursor-pointer group relative"
            >
              {/* CAPA DE BRILLO (GLOW) DETRÁS DE LA IMAGEN */}
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-[2.2rem] opacity-0 group-hover:opacity-50 blur-xl transition-all duration-500 group-hover:duration-200"></div>
              
              {/* CONTENEDOR DE LA IMAGEN DE PORTADA */}
              <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-[#121212] mb-4 border border-white/5 transition-all duration-500 group-hover:border-white/20 group-hover:scale-[1.02] group-active:scale-95 shadow-2xl">
                {album.img ? (
                  <OptimizedImage src={album.img} alt={album.title} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-gray-800 font-bold italic text-sm uppercase">Vacío</span>
                  </div>
                )}
              </div>
              
              {/* TÍTULOS DEL PROYECTO */}
              <div className="relative z-10">
                <h4 className="text-white font-black text-sm uppercase tracking-tight group-hover:text-purple-400 transition-colors">
                  {album.title}
                </h4>
                <p className="text-gray-500 font-bold text-[9px] uppercase tracking-widest mt-0.5">
                  {album.sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /** * VISTA DETALLE: FOTOS DENTRO DE UN PROYECTO
   */
  return (
    <div className="bg-black min-h-full animate-in slide-in-from-right-4 duration-300">
      <div className="p-8 pb-0">
        <button 
          onClick={() => setSelectedAlbum(null)} 
          className="flex items-center text-gray-500 hover:text-white transition-colors gap-1 text-[10px] font-black uppercase tracking-widest"
        >
          <ChevronLeft size={14} /> Volver
        </button>
        <h3 className="text-white font-black text-3xl mt-6 uppercase tracking-tighter italic">{selectedAlbum}</h3>
      </div>

      <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {drivePhotos[selectedAlbum]?.map((photo, index) => (
          <div 
            key={index} 
            onClick={() => setSelectedImage(photo)} 
            className="group relative aspect-[3/4] cursor-pointer"
          >
            {/* Resplandor sutil para fotos individuales */}
            <div className="absolute -inset-1 bg-white/10 rounded-[2.2rem] opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500"></div>
            
            <div className="relative w-full h-full rounded-[2rem] overflow-hidden active:scale-95 transition-transform duration-300 border border-white/5 group-hover:border-white/20">
              <OptimizedImage src={photo.url} alt={photo.title} />
              
              {/* Overlay con el nombre de la foto al hacer hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                <p className="text-white font-bold text-[9px] leading-tight uppercase tracking-widest">
                  {photo.title}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* LIGHTBOX (VISOR DE IMAGEN A PANTALLA COMPLETA) */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[150] bg-black/95 backdrop-blur-md flex flex-col animate-in fade-in zoom-in-95 duration-300" 
          onClick={() => setSelectedImage(null)}
        >
          <div className="flex justify-end p-8">
            <button className="p-3 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors">
              <X size={24}/>
            </button>
          </div>
          <div className="flex-1 p-6 flex flex-col items-center justify-center">
            <img 
              src={selectedImage.url} 
              className="max-w-full max-h-[70vh] object-contain rounded-[2.5rem] shadow-2xl border border-white/10 transition-transform duration-500" 
              alt={selectedImage.title} 
            />
            <p className="text-white font-black text-sm mt-8 uppercase tracking-widest italic text-center px-4">
              {selectedImage.title}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotographyApp;