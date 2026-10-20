import express from "express";
import morgan from "morgan";
import NotesService from "./service/notes.service.js";
import NotesDao from "./dao/notes.dao.js";
import { createNotesController } from "./controllers/notes.controller.js";
import { createNotesRouter } from "./routes/notes.routes.js";

export default function createApp({notesService}) {
  let app = express();

  app.use(express.json());
  app.use(morgan("dev"));

  const service = notesService || new NotesService(new NotesDao());
  const notesController = createNotesController(service);

  app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok" });
  });

  app.use("/api/notes", createNotesRouter(notesController));

  app.use((req, res) => {
    res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
  });

  app.use((err, _req, res, _next) => {
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
      message: err.message || "Internal Server Error",
    });
  });
  return app;
}
