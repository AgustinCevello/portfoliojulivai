import React from 'react';
import { X } from 'lucide-react';

const AppModal = ({ title, children, onClose, colorClass = "bg-white" }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-in fade-in duration-200">
      <div className={`w-full max-w-2xl max-h-[90vh] h-full ${colorClass} rounded-[2.5rem] shadow-2xl border border-white/20 relative flex flex-col overflow-hidden transition-all transform scale-100`}>
        <div className={`shrink-0 h-16 ${colorClass.includes('bg-black') ? 'bg-black/80 border-white/10' : 'bg-white/80 border-gray-100'} backdrop-blur-md flex items-center justify-between px-8 border-b z-20`}>
          <h2 className="font-bold text-lg flex items-center gap-2 truncate pr-4">{title}</h2>
          <button 
            onClick={onClose} 
            className={`shrink-0 p-2 rounded-full transition-colors ${colorClass.includes('bg-black') ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-100 hover:bg-gray-200'}`}
          >
            <X size={20} className={colorClass.includes('bg-black') ? 'text-white' : 'text-gray-600'} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto overflow-x-hidden relative no-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AppModal;