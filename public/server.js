import http from 'http';
import { GoogleGenAI } from '@google/genai';

// Configura tu API Key
const ai = new GoogleGenAI({ apiKey: 'AIzaSyB8R0nG8VcWuEYX-PPc9yyPCULRRGzdCEI' });

const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/api/chat") {
    let body = "";
    req.on("data", chunk => (body += chunk));
    req.on("end", async () => {
      try {
        const { message } = JSON.parse(body);

        // Llama a Gemini 
        const response = await ai.models.generateContent({
          model: "gemini-1.5-flash", // 
          contents: message,
        });

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ response: response.text }));
      } catch (err) {
        console.error("Error Gemini:", err);
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "JSON inválido o error de IA" }));
      }
    });
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not found" }));
  }
});

server.listen(3000, () => console.log("Servidor corriendo en 3000"));