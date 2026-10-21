import "dotenv/config";
import createApp from "./app.js";
import { connectDB } from "./config/db.js";
let port = process.env.PORT;

let app = createApp();

async function startServer() {
  await connectDB()
    .then(() => {
      app.listen(port, () => {
        console.log("Server running on port", port);
      });
    })
    .catch((err) => {
      console.log("Error while connecting db",err);
    });
}

startServer();
 