import { GoogleGenAI, Type, Schema } from "@google/genai";
import { SurgicalAnalysis } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const analysisSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    topicTitle: {
      type: Type.STRING,
      description: "A short, 2-3 word title for the topic (e.g., 'Media & Censorship').",
    },
    specificQuestion: {
      type: Type.STRING,
      description: "The narrowed down, specific question derived from the prompt.",
    },
    theTrap: {
      type: Type.STRING,
      description: "The common mistake or off-topic path students usually take (The Trap).",
    },
    logicMap: {
      type: Type.OBJECT,
      properties: {
        viewA: { type: Type.STRING, description: "Key argument for the first view/side." },
        viewB: { type: Type.STRING, description: "Key argument for the second view/side." },
        position: { type: Type.STRING, description: "The writer's clear position." },
      },
      required: ["viewA", "viewB", "position"],
    },
    introduction: {
      type: Type.STRING,
      description: "A surgical, Band 9.0 introduction paragraph (approx 40-50 words) that directly answers the specific question.",
    },
  },
  required: ["topicTitle", "specificQuestion", "theTrap", "logicMap", "introduction"],
};

export const analyzeWritingPrompt = async (prompt: string): Promise<SurgicalAnalysis> => {
  const modelId = "gemini-2.5-flash"; // Excellent for text analysis tasks
  
  const systemInstruction = `
    You are an expert IELTS Writing Task 2 tutor, modelled after the teaching style of Pauline Cullen. 
    Your methodology is "The Invisible Work". 
    
    When given a Task 2 Prompt:
    1. Identify the General Topic vs. The Specific Question.
    2. Identify "The Trap" (a common mistake students make, e.g., writing too generally).
    3. Create a Logic Map (View A, View B, and Position).
    4. Write a "Surgical Introduction". This introduction must be academic, precise, avoid cliches (like "In this essay I will discuss..."), and clearly state the position.
    
    Tone: Clinical, Academic, Precise.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        temperature: 0.3, // Low temperature for consistent, academic output
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response generated from Gemini.");
    }

    return JSON.parse(text) as SurgicalAnalysis;
  } catch (error) {
    console.error("Gemini Analysis Failed:", error);
    throw error;
  }
};