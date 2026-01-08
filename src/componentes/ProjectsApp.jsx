import React, { useState } from 'react';
import { ArrowLeft, Award, LayoutGrid } from 'lucide-react';
import { PROJECTS } from '../constantes';

const ProjectsApp = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  if (selectedProject) {
    return (
      <div className="flex flex-col min-h-full bg-white animate-in slide-in-from-right duration-300">
        <div className="bg-[#444444] py-4 px-8 text-white">
          <h2 className="text-3xl font-extrabold tracking-tight">{selectedProject.title}</h2>
        </div>
        <div className="relative h-64 md:h-80 w-full shrink-0">
          <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
          <button 
            onClick={() => setSelectedProject(null)}
            className="absolute top-4 left-4 bg-white/30 backdrop-blur-md p-2 rounded-full text-white hover:bg-white/50 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
        </div>
        <div className="p-8 md:p-10 space-y-10">
          <div className="flex justify-between border-b border-gray-100 pb-8 overflow-x-auto gap-8 no-scrollbar">
            {Object.entries(selectedProject.stats).map(([key, value], i) => (
              <div key={i} className="text-center min-w-[100px]">
                <p className="text-2xl font-extrabold text-[#1c1c1e]">{value}</p>
                <p className="text-[10px] text-gray-400 uppercase tracking-[0.15em] font-bold mt-1">{key}</p>
              </div>
            ))}
          </div>
          <div>
            <h3 className="font-extrabold text-[#1c1c1e] mb-4 text-xl tracking-tight">Sobre el proyecto</h3>
            <p className="text-gray-600 leading-relaxed text-base font-medium">{selectedProject.fullDesc}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 md:p-10 space-y-8 bg-white">
      <h3 className="text-3xl font-extrabold text-[#1c1c1e] tracking-tight">Mis Proyectos</h3>
      <div className="flex flex-col gap-6">
        {PROJECTS.map((proj) => (
          <div key={proj.id} onClick={() => setSelectedProject(proj)} className="group bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-lg transition-all cursor-pointer overflow-hidden flex flex-col md:flex-row">
            <div className="h-48 md:h-60 md:w-56 shrink-0 relative">
              <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-8">
              <span className="text-[10px] font-extrabold text-[#007AFF] bg-blue-50 px-3 py-1.5 rounded-md uppercase">{proj.category}</span>
              <h3 className="text-xl font-extrabold mt-2">{proj.title}</h3>
              <p className="text-gray-500 text-sm mt-2">{proj.shortDesc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsApp;