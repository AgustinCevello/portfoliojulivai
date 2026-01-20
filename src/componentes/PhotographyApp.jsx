import React, { useState, useEffect } from 'react';
import { ChevronLeft, X } from 'lucide-react';
import { obtenerFotosDeDrive } from '../api';

const LoadingIcon = ({ className = "" }) => (
  <svg fill="hsl(270, 60%, 35%)" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z">
      <animateTransform attributeName="transform" type="rotate" dur="0.75s" values="0 12 12;360 12 12" repeatCount="indefinite"/>
    </path>
  </svg>
);

// Sub-componente optimizado para cargar imágenes individualmente
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

const PhotographyApp = () => {
  const [drivePhotos, setDrivePhotos] = useState(null);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      const datos = await obtenerFotosDeDrive();
      if (datos) setDrivePhotos(datos);
      setLoading(false);
    };
    cargarDatos();
  }, []);

  useEffect(() => {
    document.body.style.overflow = (selectedAlbum || selectedImage) ? 'hidden' : 'unset';
  }, [selectedAlbum, selectedImage]);

  if (loading) {
    return (
      <div className="bg-black min-h-[400px] flex flex-col items-center justify-center">
        <LoadingIcon className="w-16 h-16 mb-4" />
        <p className="text-gray-500 font-black uppercase tracking-widest text-[10px]">Cargando Galería...</p>
      </div>
    );
  }

  const albums = drivePhotos ? Object.keys(drivePhotos).map(key => ({
    id: key,
    title: key.toUpperCase(),
    sub: "PROYECTO",
    img: drivePhotos[key][0]?.url
  })) : [];

  // VISTA PRINCIPAL (PORTADAS)
  if (!selectedAlbum) {
    return (
      <div className="bg-black min-h-full p-8 animate-in fade-in duration-500">
        <h3 className="text-white font-black text-xl mb-8 tracking-tighter uppercase">Portafolio</h3>
        <div className="grid grid-cols-2 gap-x-4 gap-y-8">
          {albums.map((album) => (
            <div key={album.id} onClick={() => setSelectedAlbum(album.id)} className="cursor-pointer group">
              <div className="aspect-square rounded-[2rem] overflow-hidden bg-[#121212] mb-4 border border-white/5 transition-transform active:scale-95">
                {album.img ? (
                  <OptimizedImage src={album.img} alt={album.title} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-gray-800 font-bold italic text-sm uppercase">Vacío</span>
                  </div>
                )}
              </div>
              <h4 className="text-white font-black text-sm uppercase tracking-tight">{album.title}</h4>
              <p className="text-gray-500 font-bold text-[9px] uppercase tracking-widest mt-0.5">{album.sub}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // VISTA DE ÁLBUM (GRILLA DE FOTOS)
  return (
    <div className="bg-black min-h-full animate-in slide-in-from-right-4 duration-300">
      <div className="p-8 pb-0">
        <button onClick={() => setSelectedAlbum(null)} className="flex items-center text-gray-500 hover:text-white transition-colors gap-1 text-[10px] font-black uppercase tracking-widest">
          <ChevronLeft size={14} /> Volver
        </button>
        <h3 className="text-white font-black text-3xl mt-6 uppercase tracking-tighter italic">{selectedAlbum}</h3>
      </div>

      <div className="p-8 grid grid-cols-2 gap-4">
        {drivePhotos[selectedAlbum]?.map((photo, index) => (
          <div key={index} onClick={() => setSelectedImage(photo)} className="aspect-[3/4] rounded-[2rem] overflow-hidden relative cursor-pointer active:scale-95 transition-transform">
            <OptimizedImage src={photo.url} alt={photo.title} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-5">
              <p className="text-white font-bold text-[9px] leading-tight uppercase">{photo.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* LIGHTBOX (IMAGEN AMPLIADA) */}
      {selectedImage && (
        <div className="fixed inset-0 z-[150] bg-black/95 backdrop-blur-md flex flex-col animate-in fade-in zoom-in-95 duration-300" onClick={() => setSelectedImage(null)}>
          <div className="flex justify-end p-8">
            <button className="p-3 bg-white/10 rounded-full text-white"><X size={24}/></button>
          </div>
          <div className="flex-1 p-6 flex flex-col items-center justify-center">
            {/* Aquí no usamos OptimizedImage porque queremos que sea lo más grande posible */}
            <img 
              src={selectedImage.url} 
              className="max-w-full max-h-[70vh] object-contain rounded-[2.5rem] shadow-2xl border border-white/10" 
              alt={selectedImage.title} 
            />
            <p className="text-white font-black text-sm mt-8 uppercase tracking-widest italic text-center px-4">{selectedImage.title}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotographyApp;