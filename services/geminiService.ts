
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { ChatMessage } from '../types';

let chat: Chat | null = null;

const getChatInstance = (): Chat => {
    if (!chat) {
        if (!process.env.API_KEY) {
            throw new Error("API_KEY environment variable not set");
        }
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        chat = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: "You are Smart Health Guard AI, a friendly medical assistant. You can provide general health information, answer questions about symptoms, and guide users on when to see a doctor. You must not provide medical diagnoses or prescriptions. Always advise users to consult a real doctor for any medical advice. Keep your responses concise and easy to understand.",
            },
        });
    }
    return chat;
};

export const streamChat = async (
    prompt: string,
    onChunk: (chunk: string) => void,
): Promise<void> => {
    try {
        const chatInstance = getChatInstance();
        const responseStream = await chatInstance.sendMessageStream({ message: prompt });
        
        for await (const chunk of responseStream) {
            onChunk(chunk.text);
        }
    } catch (error) {
        console.error("Error in streamChat:", error);
        onChunk("Sorry, I'm having trouble connecting right now. Please try again later.");
    }
};
