import React, { useState, useEffect } from 'react';
import { ChevronLeft, X } from 'lucide-react';
import { obtenerFotosDeDrive } from '../api';

/**
 * Componente de imagen con Lazy Load y transición de opacidad.
 */
const OptimizedImage = ({ src, alt, className }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative w-full h-full bg-[#1a1a1a] ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
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

  useEffect(() => {
    const cargarDatos = async () => {
      const datos = await obtenerFotosDeDrive();
      if (datos) {
        setDrivePhotos(datos);
        const cantidad = Object.keys(datos).length;
        if (onProjectsLoad) {
          onProjectsLoad(cantidad);
        }
      }
      setLoading(false);
    };
    cargarDatos();
  }, [onProjectsLoad]);

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    if (selectedAlbum || selectedImage) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [selectedAlbum, selectedImage]);

  // Función para limpiar el nombre (Elimina .jpg, .png, etc. y pone en mayúsculas)
  const limpiarNombreArchivo = (texto) => {
    if (!texto) return "";
    return texto.split('.')[0].toUpperCase();
  };

  if (loading) {
    return (
      <div className="min-h-full p-8">
        <div className="h-6 w-32 bg-white/5 rounded-full mb-8 animate-pulse" /> 
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex flex-col gap-4">
              <div className="aspect-square rounded-[2rem] bg-white/5 animate-pulse overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-1/2 bg-white/10 rounded-full animate-pulse" />
                <div className="h-3 w-1/4 bg-white/5 rounded-full animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const albums = drivePhotos ? Object.keys(drivePhotos).map(key => {
    const partes = key.split('!');
    return {
      id: key,
      title: partes[0].trim().toUpperCase(),
      sub: partes[1] ? partes[1].trim().toUpperCase() : "PROYECTO",
      img: drivePhotos[key][0]?.url
    };
  }) : [];

  if (!selectedAlbum) {
    return (
      <div className="min-h-full p-8 animate-in fade-in duration-500">
        <h3 className="text-white font-black text-xl mb-8 tracking-tighter uppercase italic">Portafolio</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {albums.map((album) => (
            <div key={album.id} onClick={() => setSelectedAlbum(album.id)} className="cursor-pointer group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-[2.2rem] opacity-0 group-hover:opacity-50 blur-xl transition-all duration-500 group-hover:duration-200"></div>
              <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-[#121212] mb-4 border border-white/5 transition-all duration-500 group-hover:border-white/20 group-hover:scale-[1.02] shadow-2xl">
                {album.img ? (
                  <OptimizedImage src={album.img} alt={album.title} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-gray-800 font-bold italic text-sm uppercase">Vacío</span>
                  </div>
                )}
              </div>
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

  return (
    <div className="min-h-full animate-in slide-in-from-right-4 duration-300 p-8">
      {/* BOTÓN VOLVER - MÁS GRANDE Y ANIMADO */}
      <button 
        onClick={() => setSelectedAlbum(null)} 
        className="group flex items-center text-gray-400 hover:text-white transition-all duration-300 gap-3 text-sm font-black uppercase tracking-[0.25em] mb-10 cursor-pointer"
      >
        <ChevronLeft 
          size={24} 
          className="group-hover:-translate-x-2 transition-transform duration-300" 
        /> 
        <span>Volver atrás</span>
      </button>

      <div className="mb-10">
        <h3 className="text-white font-black text-5xl uppercase tracking-tighter italic leading-none">
          {selectedAlbum.split('!')[0].trim()}
        </h3>
        <p className="text-purple-500 font-bold text-sm uppercase tracking-[0.3em] mt-3">
          {selectedAlbum.split('!')[1]?.trim() || "GALERÍA"}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {drivePhotos[selectedAlbum]?.map((photo, index) => (
          <div key={index} onClick={() => setSelectedImage(photo)} className="group relative aspect-[3/4] cursor-pointer">
            <div className="absolute -inset-1 bg-white/10 rounded-[2.2rem] opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500"></div>
            <div className="relative w-full h-full rounded-[2rem] overflow-hidden active:scale-95 transition-transform duration-300 border border-white/5 group-hover:border-white/20 shadow-lg">
              <OptimizedImage src={photo.url} alt={photo.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                <p className="text-white font-bold text-[9px] leading-tight uppercase tracking-widest">
                  {limpiarNombreArchivo(photo.title)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* LIGHTBOX (VISOR DE IMAGEN A PANTALLA COMPLETA) */}
      {selectedImage && (
        <div 
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center animate-in fade-in duration-300" 
          style={{
            cursor: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><line x1='18' y1='6' x2='6' y2='18'></line><line x1='6' y1='6' x2='18' y2='18'></line></svg>") 16 16, pointer`
          }}
        >
          <div className="relative w-[90%] h-[85%] flex flex-col items-center justify-center">
            <img 
              src={selectedImage.url} 
              className="w-auto h-auto max-w-full max-h-full object-contain rounded-lg shadow-2xl border border-white/5" 
              alt={selectedImage.title}
            />
            
            <div className="mt-8 text-center select-none">
              <h4 className="text-white font-black text-sm uppercase tracking-[0.3em] italic opacity-80">
                {limpiarNombreArchivo(selectedImage.title)}
              </h4>
              <p className="text-white/20 text-[8px] font-bold uppercase tracking-[0.4em] mt-2">
                Click para cerrar
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotographyApp;