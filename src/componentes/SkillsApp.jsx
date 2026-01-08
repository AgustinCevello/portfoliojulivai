import React from 'react';
import { Award, Camera, ShoppingCart, Languages, Sparkles } from 'lucide-react';
import { SKILLS_DATA } from '../constantes';

const iconMap = {
  award: Award,
  camera: Camera,
  'shopping-cart': ShoppingCart,
  languages: Languages
};

const SkillsApp = () => {
  return (
    <div className="bg-white min-h-full p-6 md:p-10">
      {/* Cabecera */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-black text-gray-900 tracking-tight">Mis Herramientas</h2>
        <p className="text-gray-500 font-medium mt-1">Tecnologías y habilidades que domino.</p>
      </div>

      {/* Rejilla de Categorías */}
      <div className="space-y-6">
        {SKILLS_DATA.map((category, idx) => {
          const IconComponent = iconMap[category.icon];
          return (
            <div key={idx} className="bg-[#F8F9FB] rounded-[2rem] p-6 border border-gray-50">
              <div className="flex items-center gap-3 mb-5">
                <div className={`${category.bg} ${category.color} p-2.5 rounded-xl`}>
                  <IconComponent size={20} />
                </div>
                <h3 className="font-extrabold text-gray-800 text-lg tracking-tight">
                  {category.title}
                </h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {category.items.map((item, i) => (
                  <span 
                    key={i} 
                    className="bg-white border border-gray-100 text-gray-600 px-4 py-2 rounded-2xl text-sm font-bold shadow-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bloque de Valor Agregado (Tal cual la captura) */}
      <div className="mt-8 bg-[#F0F7FF] rounded-[2rem] p-8 border border-blue-50">
        <div className="flex items-center gap-2 mb-3 text-blue-600">
          <Sparkles size={20} />
          <h4 className="font-black uppercase tracking-widest text-xs">Valor Agregado</h4>
        </div>
        <p className="text-blue-900 font-bold italic text-lg leading-tight mb-4">
          "El arte atrae visualmente y la psicología impacta el inconsciente."
        </p>
        <p className="text-blue-800/80 text-sm font-medium leading-relaxed">
          Mi perfil combina la creatividad visual (Fotografía/Diseño) con la lógica operativa (E-commerce/Logística), permitiéndome gestionar proyectos de principio a fin.
        </p>
      </div>
    </div>
  );
};

export default SkillsApp;