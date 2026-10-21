import Note from "../models/node.model.js";

/**
 * Data Access Object (DAO) for Notes.
 * Isolates direct database queries and MongoDB/Mongoose operations from the business logic.
 */
class NotesDao {
  /**
   * Insert a new note into MongoDB.
   * @param {Object} data - Note data containing title and content
   * @returns {Promise<Object>} Created note document
   */
  async create(data) {
    return Note.create(data);
  }

  /**
   * Retrieve all notes sorted by creation date descending (newest first).
   * @returns {Promise<Array<Object>>} List of note documents
   */
  async getAll() {
    return Note.find().sort({ createdAt: -1 });
  }

  /**
   * Retrieve a single note by its MongoDB ObjectId.
   * @param {string} id - Hex string representation of ObjectId
   * @returns {Promise<Object|null>} Found note or null if not found
   */
  async getById(id) {
    return Note.findById(id);
  }

  /**
   * Update an existing note document by its ID.
   * @param {string} id - Hex string representation of ObjectId
   * @param {Object} updateData - Partial note fields to update
   * @returns {Promise<Object|null>} Updated note document or null if not found
   */
  async updateById(id, updateData) {
    return Note.findByIdAndUpdate(id, updateData, {
      returnDocument: "after",
      runValidators: true,
    });
  }

  /**
   * Delete a note document from MongoDB by its ID.
   * @param {string} id - Hex string representation of ObjectId
   * @returns {Promise<Object|null>} Deleted note document or null if not found
   */
  async deleteById(id) {
    return Note.findByIdAndDelete(id);
  }
}

export default NotesDao;