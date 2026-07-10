import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to parse JSON
  app.use(express.json());

  // Initialize Gemini AI Client
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // Health check API
  app.get("/api/health", (req, res) => {
    res.json({ status: "healthy", time: new Date().toISOString() });
  });

  // Chat API endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      // Brand system instruction
      const brandSystemPrompt = `You are "Coco", the friendly, knowledgeable AI assistant for Dulce de Coco, a premium coconut-based food brand located in Davenport, Florida.
Dulce de Coco specializes in a premium Coconut Condensed Milk alternative that is 100% Vegan, Dairy-Free, Gluten-Free, Allergy-Friendly, Plant-Based, and made with natural coconuts. It is perfect for desserts, coffee, baking, beverages, and recipes.

When answering customers, follow these guidelines:
1. Speak in a warm, welcoming, tropical, and elegant voice. Use a polite, family-friendly tone.
2. Answer questions about the product, its ingredients, and usage.
3. Ingredients of our main product (Coconut Condensed Milk): Organic Coconut Milk (Coconut Cream, Water), Organic Coconut Sugar, Natural Vanilla Extract, Sea Salt. (No dairy, no gluten, no soy, no nuts, no artificial preservatives).
4. Share recipe suggestions if they ask. Highlight the recipes on our website: Vegan Flan, Coconut Latte, Tres Leches Alternative, Coconut Cheesecake, Vegan Brigadeiro, and Tropical Smoothie.
5. Provide contact details if asked:
   - Location: Davenport, Florida
   - Phone: 863-360-6088
   - Email: gabrielabmgm29@gmail.com
   - Business Hours: Mon-Fri: 9:00 AM - 6:00 PM, Sat: 10:00 AM - 4:00 PM, Sun: Closed.
6. Emphasize that customers do not have to sacrifice flavor because of dietary restrictions. Our coconut condensed milk is as creamy, rich, and delicious as dairy-based sweetened condensed milk!
7. Keep responses concise, clear, and structured (use lists or brief paragraphs where appropriate). Avoid overwhelming the user.
8. NEVER fabricate details about our products or ingredients. If you don't know, suggest they contact our Davenport team at gabrielabmgm29@gmail.com.`;

      // Map simple message array to the GenAI chats format
      const formattedHistory = (history || []).map((msg: { sender: 'user' | 'bot'; text: string }) => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }));

      const chat = ai.chats.create({
        model: "gemini-3.5-flash",
        config: {
          systemInstruction: brandSystemPrompt,
        },
        history: formattedHistory,
      });

      const result = await chat.sendMessage({ message });
      res.json({ reply: result.text });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ error: error.message || "An error occurred with the AI assistant." });
    }
  });

  // Serve static assets and Vite configuration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.use('/src/assets', express.static(path.join(process.cwd(), 'src/assets')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
