import React from 'react';
import { ExternalLink, Target, Zap, BarChart3 } from 'lucide-react';

const PROJECTS_DATA = [
  {
    title: "App Growth & PM",
    company: "Pinta Libre",
    metrics: { reach: "+20%", conversion: "Alta", type: "App" },
    description: "Rol de Project Manager e implementación de estrategias 360. Activaciones de Street Marketing y campañas de Paid Media para impulsar suscripciones.",
    tasks: ["Project Management", "Paid Media (Ads)", "Street Activations", "Email Marketing"],
    result: "Aumento significativo en la tasa de descarga mediante campañas hiper-segmentadas."
  },
  {
    title: "E-Commerce & CM",
    company: "Chillhouse",
    metrics: { followers: "18.8k", posts: "155", interaction: "Alta" },
    description: "Gestión integral de marca. Aplicación de pauta publicitaria y optimización de identidad visual para muebles de diseño argentino.",
    tasks: ["Identidad Visual", "Creación de Contenido", "Plan de Marketing", "Pauta Publicitaria"],
    result: "Consolidación de comunidad con identidad visual coherente que refuerza la confianza de compra."
  },
  {
    title: "Prensa & Viralización",
    company: "Arq. Rubén Díaz",
    metrics: { reach: "8.8k", interactions: "459", viral: "Sí" },
    description: "Coordinación de prensa para obras icónicas. Gestión de hitos virales como la vinculación con la serie 'Emily in Paris' de Netflix.",
    tasks: ["Prensa y Difusión", "Gestión de Redes", "Coordinación con TV", "Viralización"],
    result: "Alcance masivo en redes y cobertura en medios nacionales de televisión."
  }
];

const ProjectsApp = () => {
  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-full">
      {PROJECTS_DATA.map((project, i) => (
        <div key={i} className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex justify-between items-start mb-6">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 bg-blue-50 px-3 py-1 rounded-full">
                {project.company}
              </span>
              <h3 className="text-2xl font-black text-gray-900 mt-3 uppercase tracking-tighter italic">
                {project.title}
              </h3>
            </div>
            <Zap className="text-yellow-400" size={24} fill="currentColor" />
          </div>

          {/* Mini Dashboard de Métricas */}
          <div className="grid grid-cols-3 gap-4 mb-8 bg-gray-50 p-4 rounded-3xl">
            {Object.entries(project.metrics).map(([key, val]) => (
              <div key={key} className="text-center">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{key}</p>
                <p className="text-sm font-bold text-gray-900">{val}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <p className="text-gray-600 text-sm leading-relaxed">
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-2">
              {project.tasks.map(task => (
                <span key={task} className="text-[10px] font-bold bg-gray-100 text-gray-600 px-3 py-1 rounded-lg">
                  {task}
                </span>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-50">
              <div className="flex items-start gap-3">
                <BarChart3 className="text-emerald-500 mt-1" size={18} />
                <p className="text-sm font-bold text-gray-800 italic">
                  "{project.result}"
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectsApp;