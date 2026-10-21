import "dotenv/config";
import createApp from "./app.js";
import { connectDB } from "./config/db.js";

// Read port from environment variables, defaulting to 3000 if not set
const port = process.env.PORT || 3000;

// Initialize the Express application instance
const app = createApp();

/**
 * Bootstrap and start the HTTP server.
 * Connects to MongoDB first; only starts listening once the DB connection is established.
 */
async function startServer() {
  await connectDB()
    .then(() => {
      app.listen(port, () => {
        console.log(`Server running on port ${port}`);
      });
    })
    .catch((err) => {
      console.error("Error while connecting db:", err);
      process.exit(1);
    });
}

// Start the server
startServer();