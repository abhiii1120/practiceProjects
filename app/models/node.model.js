import mongoose from "mongoose";

/**
 * Note schema definition for MongoDB collections.
 * Includes fields for title, content, and automatic timestamp tracking.
 */
const notesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Note title is required"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Note content is required"],
      trim: true,
    },
  },
  {
    // Automatically manages createdAt and updatedAt fields
    timestamps: true,
  }
);

// Compile schema into Mongoose model
const Note = mongoose.model("Note", notesSchema);

export default Note;