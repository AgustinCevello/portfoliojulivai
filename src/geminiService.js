import { GoogleGenerativeAI } from "@google/generative-ai";
import { PROFILE, EXPERIENCE, PROJECTS } from "./constantes";

// IMPORTANTE: Reemplaza 'TU_API_KEY' con tu clave real de Google AI Studio
const genAI = new GoogleGenerativeAI("TU_API_KEY");

export const getGeminiResponse = async (userMessage) => {
  const context = `Eres el asistente virtual de Julieta Vai. 
  Datos de Julieta:
  - Perfil: ${JSON.stringify(PROFILE)}
  - Experiencia: ${JSON.stringify(EXPERIENCE)}
  - Proyectos: ${JSON.stringify(PROJECTS)}
  
  Tu objetivo es responder preguntas sobre Julieta de forma profesional y creativa. 
  Habla en español rioplatense (usá el "vos").`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent([context, userMessage]);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Estamos trabajando en ello"; 
  }
};

// Esta es la función que faltaba y causaba el error
export const generateInstagramCopy = async (topic) => {
  const prompt = `Como Community Manager experta, generá un copy creativo para Instagram sobre: "${topic}". 
  Usa emojis y un estilo profesional pero visualmente atento.`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error al generar el copy.";
  }
};