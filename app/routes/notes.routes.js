import { Router } from "express";

/**
 * Creates and configures the Express Router for notes endpoints.
 *
 * @param {Object} notesController - Controller instance with route handler methods
 * @returns {import('express').Router} Configured router
 */
export const createNotesRouter = (notesController) => {
  const router = Router();

  // POST /api/notes - Create a new note
  router.post("/", notesController.createNote);

  // GET /api/notes - Fetch all notes
  router.get("/", notesController.getNotes);

  // GET /api/notes/:id - Fetch a single note by ObjectId
  router.get("/:id", notesController.getNoteById);

  // PUT /api/notes/:id - Update an existing note by ObjectId
  router.put("/:id", notesController.updateNote);

  // DELETE /api/notes/:id - Remove a note by ObjectId
  router.delete("/:id", notesController.deleteNote);

  return router;
};