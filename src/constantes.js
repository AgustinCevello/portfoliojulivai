import fotoPerfil from './assets/images/FotoPerfil.png';
import imgLaFabbrica from './assets/images/LaFabbrica.jpg';
import imgPintaLibre from './assets/images/PintaLibre.jpg';
import bannerCamara from './assets/images/BannerCamara.png';

// Importaciones de Fotografía - Editorial
import fotoHombre1 from './assets/images/FotoHombre1.jpg';
import fotoHombre2 from './assets/images/FotoHombre2.jpg'; // Corregido el .jpg.jpg del nombre
import fotoHombre3 from './assets/images/FotoHombre3.jpg';

// Importaciones de Fotografía - Personal
import fotoDiploma1 from './assets/images/FotoDiploma1.jpg';
import fotoDiploma2 from './assets/images/FotoDiploma2.jpg';

export const ASSETS = {
  bannerCamara: bannerCamara,
};

export const CALENDLY_URL = "https://calendly.com/julietaaldanavai/first-meeting";

export const PROFILE = {
  name: "Julieta Vai",
  role: "Community & Project Manager",
  subRole: "Fotógrafa Profesional",
  email: "julietaaldanavai@gmail.com",
  instagram: "@juliivai",
  phone: "11-38064329",
  bio: "El arte atrae visualmente y la psicología impacta el inconsciente. Combino estos conceptos para lograr emprendimientos exitosos.",
  location: "Buenos Aires, Argentina",
  image: fotoPerfil, // Se usa la imagen local importada
};

export const PROJECTS = [
  {
    id: "fabbrica",
    title: "La Fabbrica",
    category: "GASTRONOMÍA & RRSS",
    image: imgLaFabbrica, // Foto de La Fabbrica
    stats: { interaction: "Media-Alta", posts: "90", conversion: "Reservas" },
    shortDesc: "Gestión de redes y estética visual para restaurante italiano.",
    fullDesc: "Manejo integral de la presencia digital de La Fabbrica. Enfoque en 'food styling' y generación de deseo mediante contenido visual de alta calidad.",
    tasks: ["Food Styling", "Community Management", "Ads Locales", "Fotografía Gastronómica"],
    results: "Incremento sostenido en las consultas por reservas vía Instagram y consolidación de una estética gourmet."
  },
  {
    id: "pinta-libre",
    title: "Pinta Libre",
    category: "MARKETING APP",
    image: imgPintaLibre, // Foto de Pinta Libre
    stats: { reach: "+50k", followers: "15k", conversion: "Alta" },
    shortDesc: "Crecimiento de comunidad y estrategias de fidelización.",
    fullDesc: "Desarrollo de campañas de adquisición de usuarios y gestión de alianzas estratégicas para la app de beneficios gastronómicos.",
    tasks: ["Growth Marketing", "Social Media Strategy", "Influencer Marketing"],
    results: "Crecimiento del 40% en la base de suscriptores activos en Buenos Aires."
  }
];

export const EXPERIENCE = [
  {
    company: "TyC Sports",
    role: "Content Creator & Photographer",
    period: "2023 - Actualidad",
    color: "bg-blue-500",
    details: ["Cobertura fotográfica de eventos deportivos", "Generación de contenido para redes sociales", "Edición de material audiovisual"]
  },
  {
    company: "Pinta Libre",
    role: "Community Manager Senior",
    period: "2021 - 2023",
    color: "bg-orange-500",
    details: ["Liderazgo del equipo de redes", "Estrategia de comunicación digital", "Análisis de métricas y KPI de crecimiento"]
  }
];

export const EDUCATION = [
  {
    school: "Universidad de Palermo",
    degree: "Licenciatura en Publicidad",
    year: "2022"
  },
  {
    school: "Brother Buenos Aires",
    degree: "Creatividad Publicitaria",
    year: "2020"
  }
];

export const SKILLS = [
  "Social Media Strategy",
  "Fotografía Profesional",
  "Psicología del Consumidor",
  "Diseño Gráfico (Adobe Suite)",
  "Community Management",
  "Ads (Meta & Google)",
  "Food Styling",
  "Copywriting Creativo"
];

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