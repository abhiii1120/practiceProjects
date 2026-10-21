/**
 * Factory function creating the Notes controller handlers.
 * Translates incoming HTTP requests into service calls and returns HTTP responses.
 *
 * @param {Object} notesService - Service layer instance handling business logic
 * @returns {Object} Controller methods mapped to route handlers
 */
export const createNotesController = (notesService) => ({
  /**
   * Handle POST /api/notes
   * Creates a new note. Returns 201 Created on success.
   */
  createNote: async (req, res, next) => {
    try {
      const note = await notesService.createNote(req.body);
      return res.status(201).json(note);
    } catch (error) {
      return next(error);
    }
  },

  /**
   * Handle GET /api/notes
   * Retrieves all notes. Returns 200 OK with an array of notes.
   */
  getNotes: async (_req, res, next) => {
    try {
      const notes = await notesService.getNotes();
      return res.status(200).json(notes);
    } catch (error) {
      return next(error);
    }
  },

  /**
   * Handle GET /api/notes/:id
   * Retrieves a single note by ID. Returns 200 OK or passes error to error middleware.
   */
  getNoteById: async (req, res, next) => {
    try {
      const note = await notesService.getNoteById(req.params.id);
      return res.status(200).json(note);
    } catch (error) {
      return next(error);
    }
  },

  /**
   * Handle PUT /api/notes/:id
   * Updates an existing note. Returns 200 OK with the updated note.
   */
  updateNote: async (req, res, next) => {
    try {
      const note = await notesService.updateNote(req.params.id, req.body);
      return res.status(200).json(note);
    } catch (error) {
      return next(error);
    }
  },

  /**
   * Handle DELETE /api/notes/:id
   * Deletes a note by ID. Returns 200 OK with a confirmation message.
   */
  deleteNote: async (req, res, next) => {
    try {
      const result = await notesService.deleteNote(req.params.id);
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  },
});