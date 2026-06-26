import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded Gemini Client
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient) {
    let apiKey = process.env.GEMINI_API_KEY;
    // Fallback to the user-provided key if not configured in the Secrets panel
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "") {
      apiKey = "AQ.Ab8RN6J4E2jgJgiVXOcb3plwln1h3oNn-qdmCvc5zcYoRVVioA";
    }

    if (apiKey) {
      aiClient = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
  }
  return aiClient;
}

// AI Chat endpoint
app.post("/api/chat", async (req, res) => {
  const { message, grade, subject, history } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  const client = getGeminiClient();

  if (!client) {
    // Elegant fallback simulation if the secret is not set yet
    console.log("GEMINI_API_KEY is not configured. Using friendly simulation mode.");
    
    // Simulate smart tutor replies based on children's concepts
    let reply = "Hi there, learner! 🌟 I'm your AI Buddy. ";
    const msgLower = message.toLowerCase();
    
    if (msgLower.includes("fraction") || msgLower.includes("1/2")) {
      reply += "Fractions are like sharing a delicious pizza! 🍕 If you divide a pizza into 2 equal slices, each slice is 1/2. If you divide it into 4 slices, each is 1/4. Which is bigger? 1/2 is a bigger slice because you're sharing with fewer people! Try visualizing it! Let me know if you want a little quiz on this!";
    } else if (msgLower.includes("addition") || msgLower.includes("add")) {
      reply += "Addition is like collecting stars! ⭐ If you have 3 stars and I give you 5 more, you count them together: 3 + 5 = 8 stars! You are doing great. Do you want to try a practice problem?";
    } else if (msgLower.includes("explain again") || msgLower.includes("again") || msgLower.includes("easier")) {
      reply += "Sure thing! Let's make it super simple. Imagine you have a packet of colorful candies. Sharing them equally is what division is! If you have 6 candies and 2 friends, each gets 3! 🍬🍬🍬 Easy, right?";
    } else if (msgLower.includes("hindi")) {
      reply += "नमस्ते! क्या आप गणित (Maths) सीखना चाहते हैं? मुझे बताएं कि आपको कौन सा टॉपिक कठिन लग रहा है, मैं उसे बहुत आसान बना दूंगा! 🚀";
    } else {
      reply += `That's a wonderful question about ${subject || "Maths"}! For Grade ${grade || "5"}, remember that the best way to learn is to take it step-by-step. Let's practice together! You can ask me to give you a quiz, explain with an example, or try another topic. What shall we do next? ✨`;
    }

    // Add note about API configuration
    reply += "\n\n*(Tutor Note: Running in friendly simulation mode. Connect your Gemini API Key in the Secrets panel to enable real-time live AI conversations!)*";

    return res.json({ text: reply });
  }

  try {
    const formattedHistory = (history || []).map((h: any) => ({
      role: h.role === "user" ? "user" : "model",
      parts: [{ text: h.content || h.text || "" }]
    }));

    // System instruction to customize the AI's persona for children
    const systemInstruction = `You are a warm, enthusiastic, and playful AI tutor named "AI Buddy" on SelfTutor.APP.
The student is in Grade ${grade || "5"} studying ${subject || "Maths"}.
Your goal is to guide them gently, make them feel smart and excited, and explain things using kid-friendly analogies (like candies, space rockets, pizzas, stars, and adventures).
Keep explanations short, scannable, and extremely clear. Use bold text, emojis, and brief bullet points.
Never give dry, academic, or overly technical definitions unless followed immediately by a simple, fun example.
Always end with an encouraging question or a tiny challenge to keep them engaged.`;

    // Call Gemini using the official @google/genai SDK format
    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [
        ...formattedHistory,
        { role: "user", parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ 
      error: "Could not fetch AI reply. Make sure your Gemini API Key is configured correctly in the Secrets panel.",
      details: error.message 
    });
  }
});

// Setup Vite Dev server middleware in development
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files from the dist folder in production
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`SelfTutor.APP server running on http://localhost:${PORT}`);
  });
}

startServer();
