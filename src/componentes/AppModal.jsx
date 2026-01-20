"use client"

import { useEffect } from "react"
import { X } from "lucide-react"

// Agregamos 'isGallery' a las propiedades
const AppModal = ({ title, children, onClose, colorClass = "bg-white", count, fullHeight = false, isGallery = false }) => {
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = originalStyle
    }
  }, [])

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose()
      }
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [onClose])

  return (
    <div
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/50 backdrop-blur-xl animate-in fade-in duration-300"
    >
      <div
        /* CAMBIO AQUÍ: Si es galería usa max-w-5xl, si no, sigue usando max-w-2xl */
        className={`w-full ${isGallery ? "max-w-5xl" : "max-w-2xl"} max-h-[90vh] ${fullHeight ? "h-[90vh]" : "h-fit"} ${colorClass} rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] border ${colorClass.includes("bg-black") ? "border-white/20" : "border-gray-200/50"} relative flex flex-col overflow-hidden transition-all duration-500 ease-out transform scale-100 animate-in zoom-in-90 slide-in-from-bottom-8`}
      >
        <div
          className={`shrink-0 h-16 ${colorClass.includes("bg-black") ? "bg-black/90 border-white/10 text-white" : "bg-white/90 border-gray-200/50 text-gray-900"} backdrop-blur-xl flex items-center justify-between px-8 border-b z-20 transition-colors duration-300`}
        >
          <div className="flex items-center gap-3">
            <h2 id="modal-title" className="font-bold text-lg truncate pr-2 transition-colors duration-300">
              {title}
            </h2>
            {count !== undefined && (
              <span
                className={`text-[10px] font-bold px-2.5 py-1 rounded-full transition-all duration-300 ${colorClass.includes("bg-black") ? "bg-white/10 text-white/60 hover:bg-white/20 hover:text-white/80" : "bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700"}`}
              >
                {count}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar modal"
            className={`shrink-0 p-2 rounded-full transition-all duration-300 hover:rotate-90 hover:scale-110 active:scale-95 ${colorClass.includes("bg-black") ? "bg-white/10 hover:bg-white/20 hover:shadow-lg hover:shadow-white/10" : "bg-gray-100 hover:bg-gray-200 hover:shadow-lg hover:shadow-gray-300/50"}`}
          >
            <X
              size={20}
              className={`transition-colors duration-300 ${colorClass.includes("bg-black") ? "text-white/80 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}
            />
          </button>
        </div>

        <div
          className={`flex-1 overflow-y-auto scrollbar-thin ${colorClass.includes("bg-black") ? "scrollbar-thumb-white/20 scrollbar-track-transparent hover:scrollbar-thumb-white/30" : "scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400"} transition-all duration-300`}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export default AppModal