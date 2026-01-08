import React, { useState, useEffect } from 'react';
import { Instagram, Mail, Phone, Linkedin, Camera, Briefcase, GraduationCap, Award, ArrowUpRight, ChevronRight, Battery, Wifi, Signal, Sparkles, Calendar, Clock, ShieldCheck, X } from 'lucide-react';

import AppModal from './componentes/AppModal';
import ProjectsApp from './componentes/ProjectsApp';
import PhotographyApp from './componentes/PhotographyApp';
import AiAssistantApp from './componentes/AiAssistantApp';
import { PROFILE, EXPERIENCE, EDUCATION, SKILLS_DATA, CALENDLY_URL, ASSETS, PHOTOS } from './constantes';
import BrillosIcon from './assets/logos/Brillos.png';
import SkillsApp from './componentes/SkillsApp';

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeApp, setActiveApp] = useState(null);
  const isAdmin = false;
  const [isImageExpanded, setIsImageExpanded] = useState(false);

  // --- EFECTO 1: RELOJ ---
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // --- EFECTO 2: TECLA ESCAPE ---
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        if (isImageExpanded) {
          setIsImageExpanded(false);
        } else if (activeApp) {
          setActiveApp(null);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isImageExpanded, activeApp]);

  // --- FUNCIONES ---
  const handleProfileClick = () => {
    setIsImageExpanded(!isImageExpanded);
  };

  const formatTime = (date) => date.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f2f2f7] via-[#f9f9fb] to-[#f2f2f7] text-[#1c1c1e] flex justify-center overflow-x-hidden font-sans p-4 md:p-12 relative">
      {/* <CHANGE> Añadido patrón de fondo sutil para profundidad visual */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(0,0,0) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      
      <div className="w-full max-w-4xl relative z-10">

        {/* Modal de Imagen de Perfil Expandida */}
        {isImageExpanded && (
          <div 
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 cursor-zoom-out animate-in fade-in duration-300"
            onClick={handleProfileClick}
            role="dialog"
            aria-modal="true"
            aria-label="Imagen de perfil ampliada"
          >
            {/* <CHANGE> Añadido rol y aria-label para accesibilidad, backdrop-blur mejorado */}
            <div className="relative max-w-2xl w-full aspect-square">
              <img 
                src={PROFILE.image || "/placeholder.svg"} 
                alt={PROFILE.name} 
                className="w-full h-full object-cover rounded-[3rem] shadow-2xl border-4 border-white/30 transform transition-transform duration-500 hover:scale-[1.02]"
              />
              <button 
                className="absolute top-6 right-6 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-md shadow-xl hover:scale-110 active:scale-95"
                onClick={handleProfileClick}
                aria-label="Cerrar imagen ampliada"
              >
                <X size={24} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        )}

        {/* Status Bar */}
        {/* <CHANGE> Mejorado contraste y refinado el diseño del status bar */}
        <div className="flex justify-between items-center mb-10 px-6 text-gray-900 text-[13px] font-bold">
          <div className="flex items-center gap-2.5">
            <span className="tracking-tight">{formatTime(currentTime)}</span> 
            {isAdmin && <ShieldCheck size={13} className="text-emerald-500 drop-shadow-sm" />}
          </div>
          
          <div className="flex gap-2.5 items-center opacity-90">
            <Signal size={15} strokeWidth={2.5} />
            <Wifi size={15} strokeWidth={2.5} />
            <div className="relative flex items-center">
              <Battery size={20} strokeWidth={2} />
              <div className="absolute left-[3px] top-[7px] w-2.5 h-1.5 bg-gray-900 rounded-[1px]"></div>
            </div>
          </div>
        </div>

        {/* Bento Grid */}
        {/* <CHANGE> Mejorados gaps y transiciones para mejor fluidez visual */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 auto-rows-fr">
          
          {/* Profile Card */}
          {/* <CHANGE> Añadido hover state más prominente y transiciones suaves */}
          <div className="col-span-2 row-span-2 bg-white rounded-[3rem] p-8 shadow-lg hover:shadow-xl transition-all duration-500 flex flex-col justify-between relative overflow-hidden group border border-gray-100/50 hover:scale-[1.01] hover:-translate-y-1">
              
              <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-gray-50 to-transparent rounded-bl-[120px] -z-0 opacity-80"></div>
              
              <div className="flex justify-between items-start relative z-10">
                  <div 
                      onClick={handleProfileClick}
                      role="button"
                      tabIndex={0}
                      aria-label="Ampliar imagen de perfil"
                      className="w-24 h-24 rounded-full bg-gray-200 border-[5px] border-white shadow-xl overflow-hidden transition-all duration-700 cursor-pointer hover:shadow-2xl hover:scale-110 hover:border-blue-100 active:scale-95"
                  >
                      <img src={PROFILE.image || "/placeholder.svg"} alt={PROFILE.name} className="w-full h-full object-cover object-top" />
                  </div>
                  <button 
                      onClick={() => setActiveApp('contact')} 
                      className="bg-gray-50/80 backdrop-blur-md p-3 rounded-full text-gray-600 hover:bg-blue-50 hover:text-blue-500 hover:shadow-lg hover:scale-110 transition-all duration-300 shadow-sm active:scale-95"
                      aria-label="Abrir contacto"
                  >
                      <ArrowUpRight size={24} strokeWidth={2.5} />
                  </button>
              </div>
              
              <div className="relative z-10 mt-6">
                  <h1 className="text-3xl font-extrabold tracking-tight text-balance leading-tight">{PROFILE.name}</h1>
                  <h2 className="text-[#007AFF] font-bold text-lg mt-2 tracking-tight">{PROFILE.role}</h2>
                  <p className="text-gray-400 font-medium text-sm mt-0.5">{PROFILE.subRole}</p>
                  <p className="text-gray-600 text-sm mt-5 leading-relaxed font-medium text-pretty">{PROFILE.bio}</p>
              </div>
          </div>

          {/* Experiencia */}
          {/* <CHANGE> Mejorados efectos hover y estados de interacción */}
          <div 
              onClick={() => setActiveApp('experience')} 
              role="button"
              tabIndex={0}
              aria-label="Ver experiencia laboral"
              className="col-span-1 row-span-2 bg-gradient-to-br from-[#8E2DE2] to-[#7020c4] rounded-[3rem] p-7 text-white flex flex-col justify-between cursor-pointer hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 shadow-xl shadow-purple-200/50 hover:shadow-2xl hover:shadow-purple-300/60 hover:-translate-y-1"
          >
            <div className="bg-white/25 backdrop-blur-sm w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
              <Briefcase size={26} strokeWidth={2} />
            </div>
            <h3 className="text-2xl font-extrabold tracking-tight mt-auto">Experiencia</h3>
          </div>

          {/* Estudios */}
          {/* <CHANGE> Añadidos estados hover más dinámicos */}
          <div 
              onClick={() => setActiveApp('education')} 
              role="button"
              tabIndex={0}
              aria-label={`Ver estudios (${EDUCATION.length} títulos)`}
              className="col-span-1 bg-white rounded-[2.5rem] p-6 flex flex-col justify-between cursor-pointer border border-gray-100 relative hover:shadow-xl hover:scale-[1.05] active:scale-[0.97] transition-all duration-300 hover:-translate-y-1 hover:border-orange-100 group"
          >
            <div className="flex justify-between items-start">
              <div className="bg-orange-50 p-3 rounded-2xl text-orange-500 w-fit shadow-sm group-hover:shadow-md group-hover:scale-110 transition-all duration-300">
                <GraduationCap size={24} strokeWidth={2} />
              </div>
              <span className="text-gray-300 group-hover:text-orange-400 font-bold text-base transition-colors duration-300">{EDUCATION.length}</span>
            </div>
            <p className="font-extrabold text-base mt-2 tracking-tight">Estudios</p>
          </div>

          {/* Habilidades */}
          {/* <CHANGE> Mejorada la interactividad visual */}
          <div 
              onClick={() => setActiveApp('skills')} 
              role="button"
              tabIndex={0}
              aria-label="Ver habilidades"
              className="col-span-1 bg-white rounded-[2.5rem] p-6 flex flex-col justify-between cursor-pointer border border-gray-100 relative hover:shadow-xl hover:scale-[1.05] active:scale-[0.97] transition-all duration-300 hover:-translate-y-1 hover:border-emerald-100 group"
          >
            <div className="flex justify-between items-start">
              <div className="bg-emerald-50 p-3 rounded-2xl text-emerald-500 w-fit shadow-sm group-hover:shadow-md group-hover:scale-110 transition-all duration-300">
                <Award size={24} strokeWidth={2} />
              </div>
              <span className="text-gray-300 group-hover:text-emerald-400 font-bold text-base transition-colors duration-300">+</span> 
            </div>
            <p className="font-extrabold text-base mt-2 tracking-tight">Habilidades</p>
          </div>

          {/* Portafolio Preview */}
          {/* <CHANGE> Mejorado efecto parallax y overlay */}
          <div 
            onClick={() => setActiveApp('projects')} 
            role="button"
            tabIndex={0}
            aria-label="Ver proyectos"
            className="col-span-2 bg-gray-200 rounded-[3rem] relative overflow-hidden cursor-pointer group shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1"
          >
            <img 
              src={ASSETS.laFabbrica || "/placeholder.svg"}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-125 transition-transform duration-[1200ms] ease-out" 
              alt="Proyectos" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent group-hover:from-black/70 transition-all duration-500 flex items-center justify-center">
              <span className="bg-white text-black px-8 py-3 rounded-full font-bold text-sm shadow-xl group-hover:scale-110 group-hover:shadow-2xl transition-all duration-300 tracking-tight">
                Ver Proyectos
              </span>
            </div>
          </div>

          {/* Photography Card */}
          {/* <CHANGE> Refinado el overlay y animación de imagen */}
          <div 
            onClick={() => setActiveApp('photography')} 
            role="button"
            tabIndex={0}
            aria-label="Ver galería de fotografía"
            className="col-span-2 bg-black rounded-[3rem] p-8 text-white flex flex-col justify-between relative cursor-pointer group shadow-2xl overflow-hidden hover:scale-[1.02] active:scale-[0.99] transition-all duration-500 hover:-translate-y-1"
          >
            <img 
              src={ASSETS.bannerCamara || "/placeholder.svg"} 
              alt="Fotografía" 
              className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-110 transition-all duration-[2000ms]" 
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 group-hover:from-black/80 transition-all duration-700"></div>

            <div className="relative z-10">
              <div className="bg-white/15 backdrop-blur-md w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg group-hover:bg-white/25 group-hover:scale-110 transition-all duration-300">
                <Camera size={26} strokeWidth={2} />
              </div>
            </div>

            <div className="relative z-10 flex justify-between items-end">
              <div>
                <h3 className="text-3xl font-extrabold tracking-tight leading-tight">Fotografía</h3>
                <p className="text-gray-300 text-sm font-bold mt-2 tracking-wide">Galería por Categorías</p>
              </div>
              <ChevronRight 
                className="text-white/40 mb-1 group-hover:translate-x-2 group-hover:text-white transition-all duration-300" 
                size={28} 
                strokeWidth={2.5}
              />
            </div>
          </div>

          {/* AI Assistant */}
          {/* <CHANGE> Mejorado gradiente y animaciones */}
          <div 
            onClick={() => setActiveApp('ai-assistant')} 
            role="button"
            tabIndex={0}
            aria-label="Abrir asistente de IA"
            className="col-span-2 bg-gradient-to-br from-[#FF6A88] via-[#FF8BA7] to-[#FF99AC] rounded-[3rem] p-8 text-white flex flex-col justify-between cursor-pointer shadow-xl shadow-pink-200/50 hover:shadow-2xl hover:shadow-pink-300/60 group hover:scale-[1.02] active:scale-[0.99] transition-all duration-500 hover:-translate-y-1 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            <div className="flex justify-between items-start relative z-10">
              <div className="bg-white/25 backdrop-blur-sm w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                <Sparkles size={26} strokeWidth={2} />
              </div>
              <span className="bg-white/35 backdrop-blur-md px-3 py-1.5 rounded-xl text-[10px] font-black shadow-md tracking-wider">BETA</span>
            </div>

            <div className="flex items-center gap-3 relative z-10">
              <h3 className="text-3xl font-extrabold tracking-tight">Julieta AI</h3>
              <img 
                src={BrillosIcon || "/placeholder.svg"} 
                alt="brillos" 
                className="w-7 h-7 object-contain group-hover:rotate-180 transition-transform duration-700" 
              />
            </div>
          </div>

          {/* Calendly */}
          {/* <CHANGE> Mejorado gradiente y efectos visuales */}
          <div 
              onClick={() => setActiveApp('calendly')} 
              role="button"
              tabIndex={0}
              aria-label="Agendar una cita"
              className="col-span-2 bg-gradient-to-br from-[#11998e] via-[#1fa89b] to-[#38ef7d] rounded-[3rem] p-8 text-white flex flex-col justify-between cursor-pointer shadow-xl shadow-emerald-200/50 hover:shadow-2xl hover:shadow-emerald-300/60 hover:scale-[1.02] active:scale-[0.99] transition-all duration-500 hover:-translate-y-1 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.15),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            <div className="bg-white/25 backdrop-blur-sm w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg relative z-10 group-hover:scale-110 transition-transform duration-300">
              <Calendar size={26} strokeWidth={2} />
            </div>
            <h3 className="text-3xl font-extrabold tracking-tight relative z-10">Agendar Cita</h3>
          </div>

          {/* Tarjeta de Contacto Destacada */}
          {/* <CHANGE> Refinados efectos de brillo y animaciones de iconos */}
          <div 
            onClick={() => setActiveApp('contact')} 
            role="button"
            tabIndex={0}
            aria-label="Ver información de contacto"
            className="col-span-2 group relative overflow-hidden rounded-[2.5rem] p-8 cursor-pointer transition-all duration-500 shadow-xl hover:shadow-2xl border border-white/40 bg-gradient-to-br from-white via-gray-50 to-white hover:scale-[1.02] hover:-translate-y-1 active:scale-[0.99]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all duration-700" />
            
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-white/80 to-transparent shadow-[0_0_25px_rgba(255,255,255,0.9)] group-hover:shadow-[0_0_35px_rgba(255,255,255,1)] transition-shadow duration-500" />

            <div className="relative z-10 h-full flex flex-row items-center justify-between gap-8">
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <p className="font-black text-gray-900 text-3xl tracking-tight">Contactar</p>
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_12px_rgba(34,197,94,0.8)]" />
                </div>
                <p className="text-gray-600 font-bold text-lg leading-snug text-pretty">
                  Hablemos de tu próximo proyecto
                </p>
                <p className="text-[11px] text-blue-500 font-black uppercase tracking-[0.25em] mt-4 opacity-80">
                  Disponibilidad 2026
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 shrink-0">
                {[
                  { icon: Mail, color: 'text-blue-500', bgColor: 'bg-blue-50', delay: '0' },
                  { icon: Instagram, color: 'text-pink-500', bgColor: 'bg-pink-50', delay: '75' },
                  { icon: Linkedin, color: 'text-cyan-600', bgColor: 'bg-cyan-50', delay: '150' },
                  { icon: Phone, color: 'text-green-500', bgColor: 'bg-green-50', delay: '225' }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className={`${item.bgColor} ${item.color} backdrop-blur-sm p-4 rounded-2xl shadow-md group-hover:scale-125 group-hover:-translate-y-2 group-hover:shadow-xl transition-all duration-500 border border-white/80`}
                    style={{ transitionDelay: `${item.delay}ms` }}
                  >
                    <item.icon size={24} strokeWidth={2.5} />
                  </div>
                ))}
              </div>

            </div>

            <div className="absolute bottom-5 right-5 text-yellow-400/20 group-hover:text-yellow-400/80 group-hover:rotate-[360deg] group-hover:scale-125 transition-all duration-1000">
              <Sparkles size={28} strokeWidth={2} />
            </div>
          </div>

        </div>
      </div>

      {/* --- MODALS --- */}
      {activeApp === 'projects' && (
        <AppModal 
          title="Proyectos" 
          onClose={() => setActiveApp(null)}
        >
          <ProjectsApp />
        </AppModal>
      )}

      {activeApp === 'photography' && (
        <AppModal 
          title="Galería" 
          onClose={() => setActiveApp(null)} 
          count={Object.values(PHOTOS).flat().length}
          colorClass="bg-white"
        >
          <PhotographyApp photos={PHOTOS} isAdmin={isAdmin} />
        </AppModal>
      )}

      {activeApp === 'ai-assistant' && (
        <AppModal 
          title="Asistente de Julieta" 
          onClose={() => setActiveApp(null)}
          fullHeight={true}
        >
          <AiAssistantApp />
        </AppModal>
      )}

      {activeApp === 'experience' && (
        <AppModal title="Trayectoria" onClose={() => setActiveApp(null)}>
          {/* <CHANGE> Mejorado spacing y diseño de timeline */}
          <div className="p-10 space-y-8 bg-gradient-to-b from-gray-50 to-white min-h-full">
            {EXPERIENCE.map((job, i) => (
              <div key={i} className="border-l-[3px] border-gray-200 pl-8 relative group hover:border-purple-300 transition-colors duration-300">
                <div className={`absolute -left-[11px] top-1 w-5 h-5 rounded-full ${job.color} shadow-lg ring-4 ring-white group-hover:scale-125 transition-transform duration-300`} />
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{job.period}</span>
                <h3 className="text-2xl font-extrabold mt-1 tracking-tight text-balance">{job.role}</h3>
                <p className="text-blue-500 font-bold text-base mb-3 mt-1">{job.company}</p>
                <ul className="text-sm text-gray-600 space-y-2 leading-relaxed font-medium">
                  {job.details.map((d, j) => (
                    <li key={j} className="flex gap-2">
                      <span className="text-gray-400 shrink-0">•</span>
                      <span className="text-pretty">{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </AppModal>
      )}

      {activeApp === 'education' && (
        <AppModal 
          title="Formación Académica" 
          onClose={() => setActiveApp(null)} 
          count={EDUCATION.length}
        >
          {/* <CHANGE> Mejorado diseño de cards educativos */}
          <div className="p-10 space-y-5 bg-gradient-to-b from-gray-50 to-white min-h-full">
            {EDUCATION.map((edu, i) => (
              <div key={i} className="bg-white border border-gray-200 p-7 rounded-[2.5rem] flex justify-between items-center shadow-md hover:shadow-xl hover:scale-[1.01] hover:-translate-y-1 transition-all duration-300 group">
                <div className="flex-1">
                  <h4 className="font-extrabold text-gray-900 text-lg leading-tight tracking-tight text-balance">{edu.degree}</h4>
                  <p className="text-sm text-gray-500 font-semibold mt-2">{edu.school}</p>
                </div>
                <span className="text-xs font-black text-[#007AFF] bg-blue-50 px-5 py-2 rounded-full uppercase tracking-wide shadow-sm group-hover:bg-blue-100 group-hover:scale-105 transition-all duration-300">
                  {edu.year}
                </span>
              </div>
            ))}
          </div>
        </AppModal>
      )}

      {activeApp === 'skills' && (
        <AppModal 
          title="Habilidades" 
          onClose={() => setActiveApp(null)}
        >
          <SkillsApp />
        </AppModal>
      )}

      {activeApp === 'calendly' && (
        <AppModal title="Agendar" onClose={() => setActiveApp(null)}>
          <iframe src={CALENDLY_URL} className="w-full h-full min-h-[500px]" frameBorder="0" title="Calendario de citas"></iframe>
        </AppModal>
      )}

      {activeApp === 'contact' && (
        <AppModal title="Contacto" onClose={() => setActiveApp(null)}>
          {/* <CHANGE> Mejorado diseño de modal de contacto con mejor jerarquía visual */}
          <div className="flex flex-col items-center text-center p-10 bg-gradient-to-b from-gray-50 via-white to-gray-50 min-h-full">
            
            <div className="relative mb-8 group">
              <div className="w-36 h-36 rounded-full overflow-hidden border-[6px] border-white shadow-2xl ring-4 ring-gray-100 group-hover:scale-105 group-hover:ring-blue-100 transition-all duration-500">
                <img 
                  src={PROFILE.image || "/placeholder.svg"} 
                  alt="Julieta Vai" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 flex items-end justify-center pb-3">
                <span className="bg-black/60 text-white text-[11px] px-3 py-1.5 rounded-lg font-bold uppercase tracking-widest backdrop-blur-md shadow-xl">
                  
                </span>
              </div>
            </div>

            <h2 className="text-4xl font-extrabold text-[#1c1c1e] tracking-tight text-balance">{PROFILE.name}</h2>
            <p className="text-gray-500 font-bold text-sm uppercase tracking-[0.2em] mt-2 mb-10">
              {PROFILE.role}
            </p>

            <div className="w-full max-w-md space-y-4">
              
              {/* Email */}
              <a 
                href={`mailto:${PROFILE.email}`}
                className="bg-white rounded-[2.5rem] p-5 flex items-center shadow-md border border-gray-100 hover:scale-[1.02] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer block group"
              >
                <div className="bg-blue-50 p-3.5 rounded-xl text-blue-500 mr-5 group-hover:bg-blue-100 group-hover:scale-110 transition-all duration-300 shadow-sm">
                  <Mail size={22} strokeWidth={2.5} />
                </div>
                <div className="text-left flex-1">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.15em]">Email</p>
                  <p className="text-[#1c1c1e] font-bold text-base mt-0.5">{PROFILE.email}</p>
                </div>
              </a>

              {/* Instagram - Fila doble */}
              <div className="grid grid-cols-2 gap-4">
                <a href="https://www.instagram.com/juliivai/" target="_blank" rel="noopener noreferrer" className="bg-white rounded-[2.5rem] p-4 flex items-center shadow-md border border-gray-100 hover:scale-[1.04] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                  <div className="bg-pink-50 p-2.5 rounded-xl text-pink-500 mr-3 shrink-0 group-hover:bg-pink-100 group-hover:scale-110 transition-all duration-300 shadow-sm">
                    <Instagram size={20} strokeWidth={2.5} />
                  </div>
                  <div className="text-left min-w-0 flex-1">
                    <p className="text-[9px] text-gray-400 font-black uppercase tracking-tight leading-none">Personal</p>
                    <p className="text-[#1c1c1e] font-bold text-[13px] truncate mt-0.5">@juliivai</p>
                  </div>
                </a>
                <a href="https://www.instagram.com/vai.stttudio/" target="_blank" rel="noopener noreferrer" className="bg-white rounded-[2.5rem] p-4 flex items-center shadow-md border border-gray-100 hover:scale-[1.04] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                  <div className="bg-pink-50 p-2.5 rounded-xl text-pink-500 mr-3 shrink-0 group-hover:bg-pink-100 group-hover:scale-110 transition-all duration-300 shadow-sm">
                    <Instagram size={20} strokeWidth={2.5} />
                  </div>
                  <div className="text-left min-w-0 flex-1">
                    <p className="text-[9px] text-gray-400 font-black uppercase tracking-tight leading-none">Studio</p>
                    <p className="text-[#1c1c1e] font-bold text-[13px] truncate mt-0.5">@vai.stttudio</p>
                  </div>
                </a>
              </div>

              {/* LinkedIn */}
              <a 
                href="https://www.linkedin.com/in/julieta-vai-studio" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white rounded-[2.5rem] p-5 flex items-center shadow-md border border-gray-100 hover:scale-[1.02] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer block group"
              >
                <div className="bg-cyan-50 p-3.5 rounded-xl text-cyan-600 mr-5 group-hover:bg-cyan-100 group-hover:scale-110 transition-all duration-300 shadow-sm">
                  <Linkedin size={22} strokeWidth={2.5} />
                </div>
                <div className="text-left flex-1">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.15em]">LinkedIn</p>
                  <p className="text-[#1c1c1e] font-bold text-base mt-0.5">Julieta Vai</p>
                </div>
              </a>

              {/* WhatsApp */}
              <a 
                href="https://wa.me/5491138064329" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white rounded-[2.5rem] p-5 flex items-center shadow-md border border-gray-100 hover:scale-[1.02] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer block group"
              >
                <div className="bg-green-50 p-3.5 rounded-xl text-green-500 mr-5 group-hover:bg-green-100 group-hover:scale-110 transition-all duration-300 shadow-sm">
                  <Phone size={22} strokeWidth={2.5} />
                </div>
                <div className="text-left flex-1">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.15em]">WhatsApp</p>
                  <p className="text-[#1c1c1e] font-bold text-base mt-0.5">{PROFILE.phone}</p>
                </div>
              </a>

            </div>

          </div>
        </AppModal>
      )}

    </div>
  );
}

export default App;