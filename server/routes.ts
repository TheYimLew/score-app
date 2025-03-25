import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Since this app primarily uses client-side storage (localStorage),
  // we don't need any specific API routes for basic functionality
  
  // Example health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  const httpServer = createServer(app);

  return httpServer;
}
