import express from "express";
import morgan from "morgan";
import NotesService from "./service/notes.service.js";
import NotesDao from "./dao/notes.dao.js";
import { createNotesController } from "./controllers/notes.controller.js";
import { createNotesRouter } from "./routes/notes.routes.js";

/**
 * Express application factory.
 *
 * Encapsulating app creation in a factory function enables:
 * 1. Isolated instances per test suite without port collisions.
 * 2. Dependency injection (e.g. passing mocked services for testing).
 *
 * @param {Object} [options]
 * @param {NotesService} [options.notesService] - Optional injected NotesService instance
 * @returns {import('express').Express} Configured Express application instance
 */
export default function createApp({ notesService } = {}) {
  const app = express();

  // Core Middleware
  // Parse incoming JSON request payloads
  app.use(express.json());

  // HTTP request logger for development/monitoring
  app.use(morgan("dev"));

  // Dependency Injection / Composition Root
  // Wire DAO -> Service -> Controller -> Router
  const service = notesService || new NotesService(new NotesDao());
  const notesController = createNotesController(service);

  // Health check endpoint (used by Render, Docker, or Kubernetes readiness probes)
  app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok" });
  });

  // Notes API endpoints mounted under '/api/notes'
  app.use("/api/notes", createNotesRouter(notesController));

  // 404 Handler for undefined routes
  app.use((req, res) => {
    res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
  });

  // Centralized Error-Handling Middleware
  // Catches errors passed via next(error) from controllers and services
  app.use((err, _req, res, _next) => {
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
      message: err.message || "Internal Server Error",
    });
  });

  return app;
}
