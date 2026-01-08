import React from 'react';
import { X } from 'lucide-react';

const AppModal = ({ title, children, onClose, colorClass = "bg-white", count }) => {
  
  // Función para manejar el clic en el fondo
  const handleBackdropClick = (e) => {
    // Solo cierra si el clic fue en el fondo negro, no en el contenido blanco
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      onClick={handleBackdropClick} // Detecta clic fuera
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className={`w-full max-w-2xl max-h-[90vh] h-full ${colorClass} rounded-[2.5rem] shadow-2xl border border-white/20 relative flex flex-col overflow-hidden transition-all transform scale-100`}>
        
        {/* Encabezado con línea separadora sutil */}
        <div className={`shrink-0 h-16 ${colorClass.includes('bg-black') ? 'bg-black/80 border-white/10' : 'bg-white/80 border-gray-100'} backdrop-blur-md flex items-center justify-between px-8 border-b z-20`}>
          <div className="flex items-center gap-3">
            <h2 className="font-bold text-lg truncate pr-2">{title}</h2>
            {count !== undefined && (
              <span className="bg-gray-100 text-gray-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
                {count}
              </span>
            )}
          </div>
          <button 
            onClick={onClose} 
            className={`shrink-0 p-2 rounded-full transition-colors ${colorClass.includes('bg-black') ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-100 hover:bg-gray-200'}`}
          >
            <X size={20} className={colorClass.includes('bg-black') ? 'text-white' : 'text-gray-600'} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AppModal;