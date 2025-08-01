import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertInternSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all interns for leaderboard
  app.get("/api/interns", async (req, res) => {
    try {
      const interns = await storage.getAllInterns();
      res.json(interns);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch interns" });
    }
  });

  // Get specific intern by ID
  app.get("/api/interns/:id", async (req, res) => {
    try {
      const intern = await storage.getIntern(req.params.id);
      if (!intern) {
        return res.status(404).json({ message: "Intern not found" });
      }
      res.json(intern);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch intern" });
    }
  });

  // Login endpoint (dummy - just finds intern by email)
  app.post("/api/login", async (req, res) => {
    try {
      const { email } = req.body;
      const intern = await storage.getInternByEmail(email);
      if (!intern) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      res.json(intern);
    } catch (error) {
      res.status(500).json({ message: "Login failed" });
    }
  });

  // Register endpoint (dummy - creates new intern)
  app.post("/api/register", async (req, res) => {
    try {
      const validatedData = insertInternSchema.parse(req.body);
      const existingIntern = await storage.getInternByEmail(validatedData.email);
      if (existingIntern) {
        return res.status(400).json({ message: "Email already registered" });
      }
      
      const intern = await storage.createIntern(validatedData);
      res.status(201).json(intern);
    } catch (error) {
      res.status(400).json({ message: "Registration failed" });
    }
  });

  // Get activities for an intern
  app.get("/api/interns/:id/activities", async (req, res) => {
    try {
      const activities = await storage.getActivitiesByInternId(req.params.id);
      res.json(activities);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch activities" });
    }
  });

  // Get achievements for an intern
  app.get("/api/interns/:id/achievements", async (req, res) => {
    try {
      const achievements = await storage.getAchievementsByInternId(req.params.id);
      res.json(achievements);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch achievements" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
