import { Router } from 'express';

export const createNotesRouter = (notesController) => {
    const router = Router();

    router.post('/', notesController.createNote);
    router.get('/', notesController.getNotes);
    router.get('/:id', notesController.getNoteById);
    router.put('/:id', notesController.updateNote);
    router.delete('/:id', notesController.deleteNote);

    return router;
};