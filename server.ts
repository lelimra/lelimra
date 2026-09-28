import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { handleAiAssistantRequest } from "./api/aiAssistantHandler.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// AI Assistant endpoint powered by Gemini
app.post("/api/ai-assistant", async (req, res) => {
  try {
    const response = await handleAiAssistantRequest(req.body);
    res.json(response);
  } catch (error: any) {
    console.error("AI Assistant API Error:", error);
    res.status(500).json({
      text: "I am having temporary trouble reaching the advisory service. Please try again in a moment or chat with our sales team on WhatsApp.",
      error: error?.message,
    });
  }
});

// Healthcheck endpoints for Cloud Run and load balancers
app.get(["/healthz", "/health", "/api/health"], (_req, res) => {
  res.status(200).json({ status: "healthy", timestamp: new Date().toISOString() });
});

// Resolve dist directory correctly whether running from root via "node server.ts" or compiled "node dist/server.js"
const searchPaths = [
  path.resolve(__dirname, "dist"),
  path.resolve(__dirname),
  path.resolve(process.cwd(), "dist"),
];

const distPath = searchPaths.find((dir) => fs.existsSync(path.join(dir, "index.html"))) || path.resolve(process.cwd(), "dist");

// Serve static assets from dist
app.use(express.static(distPath, { maxAge: "1d" }));

// Fallback to index.html for SPA client-side routing
app.get("*", (_req, res) => {
  const indexPath = path.join(distPath, "index.html");
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(200).send("LE LIMRA Application ready.");
  }
});

const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`LE LIMRA server running on http://0.0.0.0:${PORT} serving from ${distPath}`);
});

// Handle graceful shutdown signals from Cloud Run
process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down gracefully");
  server.close(() => {
    process.exit(0);
  });
});

process.on("SIGINT", () => {
  console.log("SIGINT received, shutting down gracefully");
  server.close(() => {
    process.exit(0);
  });
});

