import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || ''; // In a real app, strictly from env
const ai = new GoogleGenAI({ apiKey });

export const generateLogisticsContent = async (prompt: string, context: string) => {
  if (!apiKey) {
    return "Error: API Key no configurada. Por favor configure process.env.API_KEY.";
  }

  try {
    const fullPrompt = `
      Actúa como un Consultor Experto en Logística y Transporte para la región USMCA (USA, México, Canadá).
      Contexto del plan de trabajo: ${context}
      
      Solicitud del usuario: ${prompt}
      
      Responde de manera profesional, concisa y orientada a resultados comerciales. Usa formato Markdown.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: fullPrompt,
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Hubo un error generando el contenido. Por favor intenta de nuevo.";
  }
};