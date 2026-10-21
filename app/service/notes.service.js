/**
 * Notes Service Layer.
 * Implements core business logic, input validation, and business error handling.
 * Acts as an intermediary between controllers and data access objects.
 */
class NotesService {
  /**
   * @param {Object} notesDAO - Data Access Object providing database operations
   */
  constructor(notesDAO) {
    this.notesDAO = notesDAO;
  }

  /**
   * Create a new note after validating that title and content are provided.
   *
   * @param {Object} payload - User-submitted note data
   * @param {string} payload.title - Note title
   * @param {string} payload.content - Note content
   * @returns {Promise<Object>} Created note document
   * @throws {Error} 400 Bad Request if title or content is missing
   */
  async createNote(payload) {
    if (!payload?.title || !payload?.content) {
      const error = new Error("title and content are required");
      error.statusCode = 400;
      throw error;
    }

    return this.notesDAO.create({
      title: payload.title,
      content: payload.content,
    });
  }

  /**
   * Retrieve all existing notes.
   *
   * @returns {Promise<Array<Object>>} List of all note documents
   */
  async getNotes() {
    return this.notesDAO.getAll();
  }

  /**
   * Retrieve a specific note by ID.
   *
   * @param {string} id - Target note ObjectId
   * @returns {Promise<Object>} Found note document
   * @throws {Error} 404 Not Found if note does not exist
   */
  async getNoteById(id) {
    const note = await this.notesDAO.getById(id);

    if (!note) {
      const error = new Error("note not found");
      error.statusCode = 404;
      throw error;
    }

    return note;
  }

  /**
   * Update an existing note's title and/or content.
   *
   * @param {string} id - Target note ObjectId
   * @param {Object} payload - Partial update fields
   * @returns {Promise<Object>} Updated note document
   * @throws {Error} 400 Bad Request if neither title nor content is provided
   * @throws {Error} 404 Not Found if note does not exist
   */
  async updateNote(id, payload) {
    if (!payload?.title && !payload?.content) {
      const error = new Error("at least one field is required");
      error.statusCode = 400;
      throw error;
    }

    const note = await this.notesDAO.updateById(id, payload);

    if (!note) {
      const error = new Error("note not found");
      error.statusCode = 404;
      throw error;
    }

    return note;
  }

  /**
   * Delete an existing note by ID.
   *
   * @param {string} id - Target note ObjectId
   * @returns {Promise<{ message: string }>} Confirmation message
   * @throws {Error} 404 Not Found if note does not exist
   */
  async deleteNote(id) {
    const note = await this.notesDAO.deleteById(id);

    if (!note) {
      const error = new Error("note not found");
      error.statusCode = 404;
      throw error;
    }

    return { message: "note deleted successfully" };
  }
}

export default NotesService;