import mongoose from "mongoose";

/**
 * Establishes a connection to the MongoDB database using Mongoose.
 * Uses the connection string specified in the MONGO_URI environment variable,
 * falling back to a local MongoDB instance if not configured.
 *
 * @returns {Promise<typeof mongoose>}
 */
export async function connectDB() {
  const mongoUri =
    process.env.MONGO_URI || "mongodb://127.0.0.1:27017/notes_app";

  return mongoose.connect(mongoUri);
}
