
class NotesService {
    constructor(notesDAO) {
        this.notesDAO = notesDAO;
    }

    async createNote(payload) {
        if (!payload?.title || !payload?.content) {
            const error = new Error('title and content are required');
            error.statusCode = 400;
            throw error;
        }

        return this.notesDAO.create({
            title: payload.title,
            content: payload.content
        });
    }

    async getNotes() {
        return this.notesDAO.getAll();
    }

    async getNoteById(id) {
        const note = await this.notesDAO.getById(id);

        if (!note) {
            const error = new Error('note not found');
            error.statusCode = 404;
            throw error;
        }

        return note;
    }

    async updateNote(id, payload) {
        if (!payload?.title && !payload?.content) {
            const error = new Error('at least one field is required');
            error.statusCode = 400;
            throw error;
        }

        const note = await this.notesDAO.updateById(id, payload);

        if (!note) {
            const error = new Error('note not found');
            error.statusCode = 404;
            throw error;
        }

        return note;
    }

    async deleteNote(id) {
        const note = await this.notesDAO.deleteById(id);

        if (!note) {
            const error = new Error('note not found');
            error.statusCode = 404;
            throw error;
        }

        return { message: 'note deleted successfully' };
    }
}

export default NotesService;