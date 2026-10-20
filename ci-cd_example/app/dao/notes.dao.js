import Note from "../models/node.model.js";

class NotesDao {
  async createNote(data) {
    return Note.create(data);
  }

  async getAll() {
    return Note.find().sort({ createdAt: -1 });
  }

  async getById(id) {
    return Note.findById(id);
  }

  async updateById(id, updateData) {
    return Note.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id) {
    return Note.findByIdAndDelete(id);
  }
}

export default NotesDao