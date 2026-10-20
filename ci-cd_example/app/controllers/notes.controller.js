
export const createNotesController = (notesService) => ({
    createNote: async (req, res, next) => {
        try {
            const note = await notesService.createNote(req.body);
            return res.status(201).json(note);
        } catch (error) {
            return next(error);
        }
    },

    getNotes: async (_req, res, next) => {
        try {
            const notes = await notesService.getNotes();
            return res.status(200).json(notes);
        } catch (error) {
            return next(error);
        }
    },

    getNoteById: async (req, res, next) => {
        try {
            const note = await notesService.getNoteById(req.params.id);
            return res.status(200).json(note);
        } catch (error) {
            return next(error);
        }
    },

    updateNote: async (req, res, next) => {
        try {
            const note = await notesService.updateNote(req.params.id, req.body);
            return res.status(200).json(note);
        } catch (error) {
            return next(error);
        }
    },

    deleteNote: async (req, res, next) => {
        try {
            const result = await notesService.deleteNote(req.params.id);
            return res.status(200).json(result);
        } catch (error) {
            return next(error);
        }
    }
});