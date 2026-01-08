import React, { useState, useEffect, useRef } from 'react';
import { 
  Instagram, Mail, Phone, Camera, Briefcase, GraduationCap, 
  Award, ArrowUpRight, ChevronRight, Battery, Wifi, Signal, 
  Sparkles, Calendar, Clock, ShieldCheck 
} from 'lucide-react';

import AppModal from './componentes/AppModal';
import ProjectsApp from './componentes/ProjectsApp';
import PhotographyApp from './componentes/PhotographyApp';
import AiAssistantApp from './componentes/AiAssistantApp';
import { PROFILE, EXPERIENCE, EDUCATION, SKILLS, PROJECTS, CALENDLY_URL } from './constantes';

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeApp, setActiveApp] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const profileClickCount = useRef(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleProfileClick = () => {
    profileClickCount.current += 1;
    if (profileClickCount.current >= 5) {
      setIsAdmin(!isAdmin);
      profileClickCount.current = 0;
      alert(isAdmin ? "Modo Admin Desactivado" : "Modo Admin Activado");
    }
    setTimeout(() => { profileClickCount.current = 0; }, 2000);
  };

  const formatTime = (date) => date.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="min-h-screen bg-[#f2f2f7] text-[#1c1c1e] flex justify-center overflow-x-hidden font-sans p-4 md:p-12">
      <div className="w-full max-w-4xl">
        {/* Status Bar */}
        <div className="flex justify-between items-center mb-8 px-4 text-gray-500 text-xs font-semibold">
          <div className="flex items-center gap-2">
            <span>{formatTime(currentTime)}</span>
            {isAdmin && <ShieldCheck size={12} className="text-emerald-500" />}
          </div>
          <div className="flex gap-2 items-center"><Signal size={14}/><Wifi size={14}/><Battery size={18}/></div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-fr">
          
          {/* Profile */}
          <div className="col-span-2 row-span-2 bg-white rounded-[3rem] p-8 shadow-sm flex flex-col justify-between border border-white/50">
            <div className="flex justify-between items-start">
              <div onClick={handleProfileClick} className="w-24 h-24 rounded-full bg-gray-200 border-4 border-white shadow-lg overflow-hidden cursor-pointer">
                <img src={PROFILE.image} alt={PROFILE.name} className="w-full h-full object-cover" />
              </div>
              <button onClick={() => setActiveApp('contact')} className="bg-gray-100 p-2.5 rounded-full"><ArrowUpRight size={24} /></button>
            </div>
            <div className="mt-6">
              <h1 className="text-3xl font-extrabold">{PROFILE.name}</h1>
              <h2 className="text-[#007AFF] font-bold text-lg">{PROFILE.role}</h2>
              <p className="text-gray-500 text-sm mt-2">{PROFILE.bio}</p>
            </div>
          </div>

          {/* Experiencia */}
          <div onClick={() => setActiveApp('experience')} className="col-span-1 row-span-2 bg-[#8E2DE2] rounded-[3rem] p-6 text-white flex flex-col justify-between cursor-pointer hover:scale-[1.02] transition-transform shadow-lg shadow-purple-200">
            <div className="bg-white/20 w-12 h-12 rounded-2xl flex items-center justify-center"><Briefcase size={24} /></div>
            <h3 className="text-2xl font-extrabold">Experiencia</h3>
          </div>

          {/* Estudios */}
          <div onClick={() => setActiveApp('education')} className="col-span-1 bg-white rounded-[2.5rem] p-6 flex flex-col justify-between cursor-pointer border border-white/50">
            <div className="bg-orange-50 p-2.5 rounded-2xl text-orange-500 w-fit"><GraduationCap size={22} /></div>
            <p className="font-extrabold text-sm mt-2">Estudios</p>
          </div>

          {/* Habilidades */}
          <div onClick={() => setActiveApp('skills')} className="col-span-1 bg-white rounded-[2.5rem] p-6 flex flex-col justify-between cursor-pointer border border-white/50">
            <div className="bg-emerald-50 p-2.5 rounded-2xl text-emerald-500 w-fit"><Award size={22} /></div>
            <p className="font-extrabold text-sm mt-2">Habilidades</p>
          </div>

          {/* Portafolio Preview */}
          <div onClick={() => setActiveApp('projects')} className="col-span-2 bg-gray-200 rounded-[3rem] relative overflow-hidden cursor-pointer group shadow-sm">
            <img src={PROJECTS[0].image} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Proyectos" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="bg-white text-black px-6 py-2 rounded-full font-bold text-sm">Ver Proyectos</span>
            </div>
          </div>

          {/* Fotografía */}
          <div onClick={() => setActiveApp('photography')} className="col-span-2 bg-black rounded-[3rem] p-7 text-white flex flex-col justify-between cursor-pointer group shadow-xl">
            <div className="bg-white/10 w-12 h-12 rounded-2xl flex items-center justify-center"><Camera size={24} /></div>
            <h3 className="text-2xl font-extrabold">Fotografía</h3>
          </div>

          {/* AI Assistant */}
          <div onClick={() => setActiveApp('ai-assistant')} className="col-span-2 bg-gradient-to-r from-[#FF6A88] to-[#FF99AC] rounded-[3rem] p-7 text-white flex flex-col justify-between cursor-pointer shadow-lg shadow-pink-100">
            <div className="flex justify-between items-start">
              <div className="bg-white/20 w-12 h-12 rounded-2xl flex items-center justify-center"><Sparkles size={24} /></div>
              <span className="bg-white/30 px-2 py-1 rounded-lg text-[9px] font-bold">BETA</span>
            </div>
            <h3 className="text-2xl font-extrabold">Julieta AI ✨</h3>
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
      {activeApp === 'projects' && <AppModal title="Proyectos" onClose={() => setActiveApp(null)}><ProjectsApp /></AppModal>}
      {activeApp === 'photography' && <AppModal title="Galería" onClose={() => setActiveApp(null)} colorClass="bg-black text-white"><PhotographyApp isAdmin={isAdmin} /></AppModal>}
      {activeApp === 'ai-assistant' && <AppModal title="Julieta AI ✨" onClose={() => setActiveApp(null)}><AiAssistantApp /></AppModal>}
      
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
        <AppModal title="Formación" onClose={() => setActiveApp(null)}>
          <div className="p-8 space-y-4">
            {EDUCATION.map((edu, i) => (
              <div key={i} className="p-6 bg-gray-50 rounded-3xl flex justify-between items-center">
                <div><h4 className="font-extrabold text-lg">{edu.degree}</h4><p className="text-sm text-gray-500">{edu.school}</p></div>
                <span className="text-blue-500 font-bold">{edu.year}</span>
              </div>
            ))}
          </div>
        </AppModal>
      )}

      {activeApp === 'skills' && (
        <AppModal title="Habilidades" onClose={() => setActiveApp(null)}>
          <div className="p-8 flex flex-wrap gap-3">
            {SKILLS.map((s, i) => <span key={i} className="bg-gray-100 px-4 py-2 rounded-xl font-bold text-sm text-gray-700">{s}</span>)}
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
                  LOGO
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
              
              {/* Email */}
              <div className="bg-white rounded-[2rem] p-5 flex items-center shadow-sm border border-white">
                <div className="bg-blue-50 p-3 rounded-2xl text-blue-500 mr-4">
                  <Mail size={24} />
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Email</p>
                  <p className="text-[#1c1c1e] font-extrabold text-sm">{PROFILE.email}</p>
                </div>
              </div>

              {/* Instagram */}
              <div className="bg-white rounded-[2rem] p-5 flex items-center shadow-sm border border-white">
                <div className="bg-pink-50 p-3 rounded-2xl text-pink-500 mr-4">
                  <Instagram size={24} />
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Instagram</p>
                  <p className="text-[#1c1c1e] font-extrabold text-sm">{PROFILE.instagram}</p>
                </div>
              </div>

              {/* Teléfono */}
              <div className="bg-white rounded-[2rem] p-5 flex items-center shadow-sm border border-white">
                <div className="bg-green-50 p-3 rounded-2xl text-green-500 mr-4">
                  <Phone size={24} />
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Teléfono</p>
                  <p className="text-[#1c1c1e] font-extrabold text-sm">{PROFILE.phone}</p>
                </div>
              </div>

            </div>
          </div>
        </AppModal>
      )}

    </div>
  );
}

export default App;