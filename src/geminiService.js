import { GoogleGenerativeAI } from "@google/generative-ai";
import { PROFILE, EXPERIENCE, EDUCATION, SKILLS_DATA } from "./constantes";

// IMPORTANTE: Asegúrate de que tu API KEY esté configurada
const genAI = new GoogleGenerativeAI("TU_API_KEY");

export const getGeminiResponse = async (userMessage) => {
  const context = `Eres el asistente virtual de Julieta Vai. 
  
  Datos clave de Julieta:
  - Perfil Profesional: ${PROFILE.name}, ${PROFILE.role}. ${PROFILE.bio}
  - Trayectoria Laboral: ${JSON.stringify(EXPERIENCE)}
  - Formación Académica: ${JSON.stringify(EDUCATION)}
  - Herramientas y Habilidades: ${JSON.stringify(SKILLS_DATA)}
  - Contacto: Instagram ${PROFILE.instagram}, Email ${PROFILE.email}
  
  Instrucciones de personalidad:
  1. Tu objetivo es responder sobre Julieta de forma profesional, cálida y creativa.
  2. Habla en español rioplatense (usá el "vos" y "sos").
  3. Si te preguntan por algo que no está en los datos, decí que pueden contactarla directamente por WhatsApp o Instagram.
  4. Mantené respuestas concisas pero con estilo.`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent([context, userMessage]);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "⚠️ Estamos trabajando en ello"; 
  }
};

export const generateInstagramCopy = async (topic) => {
  const prompt = `Como Community Manager experta (Julieta Vai), generá un copy creativo para Instagram sobre: "${topic}". 
  Usa un tono profesional, apelando a la estética y al marketing estratégico. Incluí emojis y hashtags relevantes.`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "⚠️ Error al generar el copy.";
  }
};