import { GoogleGenAI, Type } from "@google/genai";
import { Playlist, Track } from "../types";

// Helper to generate a random ID
const generateId = () => Math.random().toString(36).substr(2, 9);

export const generateAIPlaylist = async (prompt: string): Promise<Playlist | null> => {
  if (!process.env.API_KEY) {
    console.error("API_KEY is missing");
    return null;
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Create a music playlist based on this mood or request: "${prompt}". 
      Return a JSON object with a playlist name, a short creative description, and a list of 5-8 fictional or real tracks that match the vibe. 
      For each track, provide a title, artist, and an estimated duration (e.g., '3:30').`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            playlistName: { type: Type.STRING },
            description: { type: Type.STRING },
            tracks: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  artist: { type: Type.STRING },
                  duration: { type: Type.STRING },
                },
                required: ["title", "artist", "duration"]
              }
            }
          },
          required: ["playlistName", "description", "tracks"]
        }
      }
    });

    const text = response.text;
    if (!text) return null;

    const data = JSON.parse(text);

    // Map the AI response to our application's Track interface
    const newTracks: Track[] = data.tracks.map((t: any, index: number) => ({
      id: `ai-${generateId()}-${index}`,
      title: t.title,
      artist: t.artist,
      album: "AI Selection",
      coverUrl: `https://picsum.photos/300/300?random=${Math.floor(Math.random() * 1000)}`, // Random placeholder
      duration: t.duration
    }));

    return {
      id: `playlist-${generateId()}`,
      name: data.playlistName,
      description: data.description,
      coverUrl: `https://picsum.photos/300/300?random=${Math.floor(Math.random() * 1000)}`,
      tracks: newTracks,
      isAiGenerated: true
    };

  } catch (error) {
    console.error("Gemini API Error:", error);
    return null;
  }
};
