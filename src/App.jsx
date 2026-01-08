import React, { useState, useEffect } from 'react';
import { 
  Instagram, Mail, Phone, Camera, Briefcase, GraduationCap, 
  Award, ArrowUpRight, ChevronRight, Battery, Wifi, Signal, 
  Sparkles, Calendar, Clock, ShieldCheck, X
} from 'lucide-react';

import AppModal from './componentes/AppModal';
import ProjectsApp from './componentes/ProjectsApp';
import PhotographyApp from './componentes/PhotographyApp';
import AiAssistantApp from './componentes/AiAssistantApp';
import { PROFILE, EXPERIENCE, EDUCATION, SKILLS, PROJECTS, CALENDLY_URL, ASSETS, PHOTOS } from './constantes';
import BrillosIcon from './assets/logos/Brillos.png';

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
    <div className="min-h-screen bg-[#f2f2f7] text-[#1c1c1e] flex justify-center overflow-x-hidden font-sans p-4 md:p-12">
      <div className="w-full max-w-4xl">

        {/* Modal de Imagen de Perfil Expandida */}
        {isImageExpanded && (
          <div 
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out animate-in fade-in duration-200"
            onClick={handleProfileClick}
          >
            <div className="relative max-w-2xl w-full aspect-square">
              <img 
                src={PROFILE.image} 
                alt={PROFILE.name} 
                className="w-full h-full object-cover rounded-[3rem] shadow-2xl border-4 border-white/20"
              />
              {/* Botón opcional para cerrar dentro de la imagen */}
              <button 
                className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                onClick={handleProfileClick}
              >
                <X size={24} />
              </button>
            </div>
          </div>
        )}

        {/* Status Bar */}
        <div className="flex justify-between items-center mb-8 px-4 text-gray-900 text-[13px] font-bold">
          <div className="flex items-center gap-2">
            {/* Ahora sí estamos usando la función formatTime */}
            <span>{formatTime(currentTime)}</span> 
            {isAdmin && <ShieldCheck size={12} className="text-emerald-500" />}
          </div>
          
          {/* Lado derecho con iconos de sistema */}
          <div className="flex gap-2 items-center">
            <Signal size={15} strokeWidth={2.5} />
            <Wifi size={15} strokeWidth={2.5} />
            <div className="relative flex items-center">
              <Battery size={20} strokeWidth={2} />
              {/* Pequeña barra interna de la batería */}
              <div className="absolute left-[3px] top-[7px] w-2.5 h-1.5 bg-gray-900 rounded-[1px]"></div>
            </div>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-fr">
          
          {/* Profile Card */}
          <div className="col-span-2 row-span-2 bg-white rounded-[3rem] p-8 shadow-sm flex flex-col justify-between relative overflow-hidden group border border-white/50">
              
              {/* LA LÍNEA CURVA / FORMA DE FONDO */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-bl-[100px] -z-0"></div>
              
              <div className="flex justify-between items-start relative z-10">
                  <div 
                      onClick={handleProfileClick}
                      className="w-24 h-24 rounded-full bg-gray-200 border-4 border-white shadow-lg overflow-hidden transition-transform group-hover:scale-105 duration-500 cursor-pointer active:scale-95"
                  >
                      <img src={PROFILE.image} alt={PROFILE.name} className="w-full h-full object-cover object-top" />
                  </div>
                  <button onClick={() => setActiveApp('contact')} className="bg-white/80 backdrop-blur-md p-2.5 rounded-full text-gray-600 hover:bg-gray-200 transition-colors shadow-sm">
                      <ArrowUpRight size={24} />
                  </button>
              </div>
              
              <div className="relative z-10 mt-6">
                  <h1 className="text-3xl font-extrabold tracking-tight">{PROFILE.name}</h1>
                  <h2 className="text-[#007AFF] font-bold text-lg mt-1">{PROFILE.role}</h2>
                  <p className="text-gray-400 font-medium text-sm">{PROFILE.subRole}</p>
                  <p className="text-gray-500 text-sm mt-4 leading-relaxed font-medium">{PROFILE.bio}</p>
              </div>
          </div>

          {/* Experiencia */}
          <div onClick={() => setActiveApp('experience')} className="col-span-1 row-span-2 bg-[#8E2DE2] rounded-[3rem] p-6 text-white flex flex-col justify-between cursor-pointer hover:scale-[1.02] transition-transform shadow-lg shadow-purple-200">
            <div className="bg-white/20 w-12 h-12 rounded-2xl flex items-center justify-center"><Briefcase size={24} /></div>
            <h3 className="text-2xl font-extrabold">Experiencia</h3>
          </div>

          {/* Estudios */}
          <div onClick={() => setActiveApp('education')} className="col-span-1 bg-white rounded-[2.5rem] p-6 flex flex-col justify-between cursor-pointer border border-white/50 relative">
            <div className="flex justify-between items-start">
              <div className="bg-orange-50 p-2.5 rounded-2xl text-orange-500 w-fit"><GraduationCap size={22} /></div>
              {/* Contador arriba a la derecha */}
              <span className="text-gray-300 font-bold text-sm">{EDUCATION.length}</span>
            </div>
            <p className="font-extrabold text-sm mt-2">Estudios</p>
          </div>

          {/* Habilidades */}
          <div onClick={() => setActiveApp('skills')} className="col-span-1 bg-white rounded-[2.5rem] p-6 flex flex-col justify-between cursor-pointer border border-white/50 relative">
            <div className="flex justify-between items-start">
              <div className="bg-emerald-50 p-2.5 rounded-2xl text-emerald-500 w-fit"><Award size={22} /></div>
              {/* Contador arriba a la derecha */}
              <span className="text-gray-300 font-bold text-sm">{SKILLS.length}+</span>
            </div>
            <p className="font-extrabold text-sm mt-2">Habilidades</p>
          </div>

          {/* Portafolio Preview */}
          <div onClick={() => setActiveApp('projects')} className="col-span-2 bg-gray-200 rounded-[3rem] relative overflow-hidden cursor-pointer group shadow-sm">
            <img src={PROJECTS[0].image} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Proyectos" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="bg-white text-black px-6 py-2 rounded-full font-bold text-sm">Ver Proyectos</span>
            </div>
          </div>

          {/* Photography Card */}
          <div 
            onClick={() => setActiveApp('photography')} 
            className="col-span-2 bg-black rounded-[3rem] p-7 text-white flex flex-col justify-between relative cursor-pointer group shadow-xl overflow-hidden"
          >
            {/* Imagen de fondo (Banner) */}
            <img 
              src={ASSETS.bannerCamara} 
              alt="Fotografía" 
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-[2s]" 
            />
            
            {/* Capa de degradado para legibilidad */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

            {/* Contenido superior */}
            <div className="relative z-10">
              <div className="bg-white/10 w-12 h-12 rounded-2xl flex items-center justify-center backdrop-blur-md">
                <Camera size={24} />
              </div>
            </div>

            {/* Contenido inferior */}
            <div className="relative z-10 flex justify-between items-end">
              <div>
                <h3 className="text-2xl font-extrabold tracking-tight">Fotografía</h3>
                <p className="text-gray-300 text-sm font-bold mt-1">Galería por Categorías</p>
              </div>
              <ChevronRight 
                className="text-white/50 mb-1 group-hover:translate-x-1 group-hover:text-white transition-all" 
                size={24} 
              />
            </div>
          </div>

          {/* AI Assistant */}
          <div 
            onClick={() => setActiveApp('ai-assistant')} 
            className="col-span-2 bg-gradient-to-r from-[#FF6A88] to-[#FF99AC] rounded-[3rem] p-7 text-white flex flex-col justify-between cursor-pointer shadow-lg shadow-pink-100 group"
          >
            <div className="flex justify-between items-start">
              <div className="bg-white/20 w-12 h-12 rounded-2xl flex items-center justify-center">
                <Sparkles size={24} />
              </div>
              <span className="bg-white/30 px-2 py-1 rounded-lg text-[9px] font-bold">BETA</span>
            </div>

            {/* Título con tu icono personalizado */}
            <div className="flex items-center gap-2">
              <h3 className="text-2xl font-extrabold tracking-tight">Julieta AI</h3>
              <img 
                src={BrillosIcon} 
                alt="brillos" 
                className="w-6 h-6 object-contain" 
              />
            </div>
          </div>

          {/* Calendly */}
          <div onClick={() => setActiveApp('calendly')} className="col-span-2 bg-gradient-to-r from-[#11998e] to-[#38ef7d] rounded-[3rem] p-7 text-white flex flex-col justify-between cursor-pointer shadow-lg shadow-emerald-100">
            <div className="bg-white/20 w-12 h-12 rounded-2xl flex items-center justify-center"><Calendar size={24} /></div>
            <h3 className="text-2xl font-extrabold">Agendar Cita</h3>
          </div>

          {/* Contact Bar */}
          <div onClick={() => setActiveApp('contact')} className="col-span-2 bg-[#E9E9EB] rounded-[2.5rem] p-5 flex items-center justify-between cursor-pointer hover:bg-[#E2E2E5] transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#34C759] rounded-full flex items-center justify-center text-white shadow-md"><Phone size={22} fill="white" /></div>
              <p className="font-extrabold text-sm">Contactar</p>
            </div>
            <div className="bg-white p-2.5 rounded-full text-gray-400 shadow-sm"><Mail size={20} /></div>
          </div>

        </div>
      </div>

      {/* --- MODALS --- */}
      {/* Renderizado Condicional de Aplicaciones (Modales) */}
      {activeApp === 'projects' && (
        <AppModal 
          title="Proyectos" 
          onClose={() => setActiveApp(null)}
          count={PROJECTS.length}
        >
          <ProjectsApp projects={PROJECTS} />
        </AppModal>
      )}

      {activeApp === 'photography' && (
        <AppModal 
          title="Galería" 
          onClose={() => setActiveApp(null)} 
          count={Object.values(PHOTOS).flat().length}
          colorClass="bg-white" // Cambiado a blanco para que las fotos luzcan mejor, o "bg-black text-white" si prefieres el estilo oscuro
        >
          <PhotographyApp photos={PHOTOS} isAdmin={isAdmin} />
        </AppModal>
      )}

      {activeApp === 'ai-assistant' && (
        <AppModal 
          title="Asistente de Julieta" // Quitamos "AI" si prefieres más naturalidad, o dejar "Julieta AI ✨"
          onClose={() => setActiveApp(null)}
        >
          <AiAssistantApp />
        </AppModal>
      )}

      {activeApp === 'experience' && (
        <AppModal title="Trayectoria" onClose={() => setActiveApp(null)}>
          <div className="p-8 space-y-6">
            {EXPERIENCE.map((job, i) => (
              <div key={i} className="border-l-2 border-gray-100 pl-6 relative">
                <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full ${job.color}`} />
                <span className="text-[10px] font-bold text-gray-400 uppercase">{job.period}</span>
                <h3 className="text-xl font-extrabold">{job.role}</h3>
                <p className="text-blue-500 font-bold text-sm mb-2">{job.company}</p>
                <ul className="text-sm text-gray-500 space-y-1">{job.details.map((d, j) => <li key={j}>• {d}</li>)}</ul>
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
          <div className="p-8 space-y-4 bg-white min-h-full"> {/* Agregamos bg-white y min-h-full */}
            {EDUCATION.map((edu, i) => (
              <div key={i} className="bg-white border border-gray-100 p-6 rounded-[2rem] flex justify-between items-center shadow-sm">
                <div>
                  <h4 className="font-extrabold text-gray-900 text-[17px] leading-tight">{edu.degree}</h4>
                  <p className="text-sm text-gray-500 font-medium mt-1">{edu.school}</p>
                </div>
                <span className="text-[11px] font-bold text-[#007AFF] bg-blue-50 px-4 py-1.5 rounded-full uppercase">
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
          count={SKILLS.length} // Esto mostrará el "8"
        >
          <div className="p-8 flex flex-wrap gap-4 bg-white">
            {SKILLS.map((s, i) => (
              <div key={i} className="bg-white border border-gray-100 px-6 py-4 rounded-2xl flex items-center gap-3 shadow-sm">
                <div className="w-2.5 h-2.5 rounded-full bg-[#34C759]"></div>
                <span className="font-bold text-gray-700 text-[15px]">{s}</span>
              </div>
            ))}
          </div>
        </AppModal>
      )}

      {activeApp === 'calendly' && (
        <AppModal title="Agendar" onClose={() => setActiveApp(null)}>
          <iframe src={CALENDLY_URL} className="w-full h-full min-h-[500px]" frameBorder="0"></iframe>
        </AppModal>
      )}

      {activeApp === 'contact' && (
        <AppModal title="Contacto" onClose={() => setActiveApp(null)}>
          <div className="flex flex-col items-center text-center p-8 bg-gray-100 min-h-full">
            
            {/* Contenedor de Imagen de Perfil y Logo */}
            <div className="relative mb-6">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img 
                  src={PROFILE.image} 
                  alt="Julieta Vai" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Espacio para el LOGO sobre la foto */}
              <div className="absolute inset-0 flex items-end justify-center pb-2">
                <span className="bg-black/50 text-white text-[10px] px-2 py-1 rounded font-bold uppercase tracking-widest backdrop-blur-sm">
                  
                </span>
                {/* Cuando tengas el logo en assets/logos usa: 
                    <img src="/src/assets/logos/tu-logo.png" className="w-12 h-auto" /> 
                */}
              </div>
            </div>

            <h2 className="text-3xl font-extrabold text-[#1c1c1e] tracking-tight">{PROFILE.name}</h2>
            <p className="text-gray-500 font-bold text-sm uppercase tracking-widest mt-1 mb-8">
              {PROFILE.role}
            </p>

            {/* Tarjetas de contacto estilo iOS */}
            <div className="w-full max-w-sm space-y-4">
              
              {/* Email - mailto */}
              <a 
                href={`mailto:${PROFILE.email}`}
                className="bg-white rounded-[2rem] p-5 flex items-center shadow-sm border border-white hover:scale-[1.02] transition-transform cursor-pointer block"
              >
                <div className="bg-blue-50 p-3 rounded-2xl text-blue-500 mr-4">
                  <Mail size={24} />
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Email</p>
                  <p className="text-[#1c1c1e] font-extrabold text-sm">{PROFILE.email}</p>
                </div>
              </a>

              {/* Instagram - Link directo */}
              <a 
                href="https://www.instagram.com/juliivai/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white rounded-[2rem] p-5 flex items-center shadow-sm border border-white hover:scale-[1.02] transition-transform cursor-pointer block"
              >
                <div className="bg-pink-50 p-3 rounded-2xl text-pink-500 mr-4">
                  <Instagram size={24} />
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Instagram</p>
                  <p className="text-[#1c1c1e] font-extrabold text-sm">{PROFILE.instagram}</p>
                </div>
              </a>

              {/* WhatsApp - wa.me */}
              <a 
                href="https://wa.me/5491138064329" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white rounded-[2rem] p-5 flex items-center shadow-sm border border-white hover:scale-[1.02] transition-transform cursor-pointer block"
              >
                <div className="bg-green-50 p-3 rounded-2xl text-green-500 mr-4">
                  <Phone size={24} />
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">WhatsApp</p>
                  <p className="text-[#1c1c1e] font-extrabold text-sm">{PROFILE.phone}</p>
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