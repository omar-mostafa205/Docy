import { apiDocumentationPrompt } from "./ApiPrompt";
import { documentationPrompt } from "./TechnicalPrompt";
import {
    GoogleGenAI,
  } from "@google/genai";

const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});

export async function generateTechnicalDocumentation(ast: any) { 
try {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-pro",
        contents: [
          {
            role: "user",
            parts: [
              {
                text: documentationPrompt(ast)
              }
            ]
          }
        ]
      });

      return response.text
} catch (error) {
    throw new Error(`Failed to generate documentation: ${error instanceof Error ? error.message : 'Unknown error'}`);

}
}

export async function generateApiDocumentation(ast: any) { 
  try {
      const response = await ai.models.generateContent({
          model: "gemini-2.5-pro",
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: apiDocumentationPrompt(ast)
                }
              ]
            }
          ]
        });
  
        return response.text
  } catch (error) {
      throw new Error(`Failed to generate documentation: ${error instanceof Error ? error.message : 'Unknown error'}`);
  
  }
  }