// src/constantes.js
import perfilFoto from './assets/images/FotoPerfil.png';
import bannerCamara from './assets/images/BannerCamara.png';
import logoBrillos from './assets/logos/Brillos.png';
import laFabbricaImg from './assets/images/LaFabbrica.png';
import fotoHombre1 from './assets/images/FotoHombre1.png';
import fotoHombre2 from './assets/images/FotoHombre2.png';
import fotoHombre3 from './assets/images/FotoHombre3.png';
import fotoDiploma1 from './assets/images/FotoDiploma1.png';
import fotoDiploma2 from './assets/images/FotoDiploma2.png';

export const ASSETS = {
  laFabbrica: laFabbricaImg,
  bannerCamara: bannerCamara,
  logoBrillos: logoBrillos
};

export const PROFILE = {
  name: "Julieta Vai",
  role: "Publicista & Fotógrafa",
  subRole: "Especialista en Marketing & Contenido",
  image: perfilFoto,
  bio: "Especialista en capturar momentos y potenciar marcas a través de una mirada creativa y estratégica. Con experiencia en entornos de alto rendimiento como TyC Sports y startups en crecimiento.",
  email: "julietavaistudio@gmail.com", // Mail actualizado
  instagram: "@juliivai - @vai.stttudio",
  phone: "+54 9 11 3806-4329",
  linkedin: "linkedin.com/in/julieta-vai-studio"
};

export const CALENDLY_URL = "https://calendly.com/julietaaldanavai/first-meeting";

export const EXPERIENCE = [
  {
    period: "2023 - Actualidad",
    role: "Content Creator & Photographer",
    company: "TyC Sports",
    color: "bg-blue-500",
    details: [
      "Cobertura fotográfica de eventos deportivos",
      "Generación de contenido creativo para redes sociales",
      "Edición y montaje de material audiovisual de alto impacto"
    ]
  },
  {
    period: "2023 - Actualidad",
    role: "App Growth & Project Manager",
    company: "Pinta Libre",
    color: "bg-green-500",
    details: [
      "Implementación de estrategias 360 y Street Marketing",
      "Campañas de Paid Media (Retargeting) en Meta Ads",
      "Resultados: +20% en Reach y aumento de conversiones"
    ]
  },
  {
    period: "2023 - 2024",
    role: "E-commerce & Community Manager",
    company: "Chillhouse",
    color: "bg-orange-500",
    details: [
      "Gestión integral de marca y pauta publicitaria",
      "Consolidación de comunidad de 19k seguidores",
      "Optimización de embudos de venta y reportes mensuales"
    ]
  },
  {
    period: "Prensa & Viralización",
    role: "Prensa y CM",
    company: "Arq. Rubén Díaz",
    color: "bg-purple-500",
    details: [
      "Gestión de hitos virales vinculados a Netflix (Emily in Paris)",
      "Coordinación con medios nacionales de TV",
      "Alcance masivo y posicionamiento de obras icónicas"
    ]
  }
];

export const SKILLS_DATA = [
  {
    title: "Marketing & Estrategia",
    icon: "award", // Usaremos lógica para asignar el icono de Lucide
    color: "text-purple-500",
    bg: "bg-purple-50",
    items: ["Psicología del Consumidor", "Plan de Marketing", "Briefing", "Identidad Visual", "Meta Ads (2025)", "Email Marketing"]
  },
  {
    title: "Multimedia & Diseño",
    icon: "camera",
    color: "text-pink-500",
    bg: "bg-pink-50",
    items: ["Adobe Premiere", "After Effects", "CapCut", "Photoshop", "Lightroom", "Illustrator", "Canva"]
  },
  {
    title: "E-commerce & Logística",
    icon: "shopping-cart",
    color: "text-blue-500",
    bg: "bg-blue-50",
    items: ["Tienda Nube", "MercadoLibre", "Zippin", "Oca", "Cruz del Sur"]
  },
  {
    title: "Idiomas",
    icon: "languages",
    color: "text-emerald-500",
    bg: "bg-emerald-50",
    items: ["Inglés Británico (B2 Cambridge)", "Español (Nativo)"]
  }
];

export const EDUCATION = [
  {
    degree: "Fotógrafa Profesional",
    school: "Foto Evolución",
    year: "2022 - 2024"
  },
  {
    degree: "Lic. en Publicidad",
    school: "ISEC",
    year: "2022 - En curso"
  },
  {
    degree: "Marketing Digital",
    school: "CoderHouse",
    year: "2022"
  },
  {
    degree: "Bachiller en Economía",
    school: "ECEA",
    year: "2016 - 2021"
  }
];

// He categorizado las habilidades para que el modal se vea ordenado
export const SKILLS_CATEGORIES = {
  marketing: ["Psicología del Consumidor", "Plan de Marketing", "Briefing", "Identidad Visual", "Meta Ads (2025)", "Email Marketing"],
  multimedia: ["Adobe Premiere", "After Effects", "CapCut", "Photoshop", "Lightroom", "Illustrator", "Canva"],
  ecommerce: ["Tienda Nube", "MercadoLibre", "Zippin", "Oca", "Cruz del Sur"],
  languages: ["Inglés Británico (B2 Cambridge)", "Español (Nativo)"]
};

export const PHOTOS = {
  editorial: [
    { url: fotoHombre1, title: "Producción Editorial Masculina I" },
    { url: fotoHombre2, title: "Producción Editorial Masculina II" },
    { url: fotoHombre3, title: "Producción Editorial Masculina III" }
  ],
  personal: [
    { url: fotoDiploma1, title: "Entrega de Diploma I" },
    { url: fotoDiploma2, title: "Entrega de Diploma II" }
  ],
  eventos: [],
  producto: [],
  publicidad: []
};

export const PROJECTS = [];