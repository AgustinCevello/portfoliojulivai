"use client"
import React, { useEffect } from "react"
import { X } from "lucide-react"

const GalleryModal = ({ title, children, onClose, count }) => {
  // Bloquear scroll del body con soporte para estilos previos
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    
    // Cerrar con la tecla Escape
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      document.body.style.overflow = originalStyle;
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  // Cerrar al hacer click en el backdrop (fuera del modal)
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div 
      onClick={handleBackdropClick}
      className="fixed inset-0 z-[110] flex items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-2xl animate-in fade-in duration-300"
    >
      <div 
        className="w-full max-w-6xl h-full sm:h-[90vh] bg-black border-white/10 sm:border sm:rounded-[3rem] relative flex flex-col overflow-hidden shadow-[0_0_50px_rgba(0,0,0,1)] animate-in zoom-in-95 duration-500"
      >
        
        {/* Header Minimalista */}
        <div className="shrink-0 h-20 flex items-center justify-between px-8 border-b border-white/5 bg-black/50 backdrop-blur-md z-30">
          <div className="flex items-center gap-4">
            <h2 className="text-white font-black text-xl uppercase tracking-tighter italic">
              {title}
            </h2>
            {count !== undefined && (
              <span className="bg-white/10 text-white/50 text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/5">
                {count}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-3 rounded-full bg-white/5 text-white hover:bg-white/10 hover:rotate-90 transition-all duration-300 active:scale-90"
          >
            <X size={24} />
          </button>
        </div>

        {/* Contenido */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {children}
        </div>
      </div>
    </div>
  )
}

export default GalleryModal