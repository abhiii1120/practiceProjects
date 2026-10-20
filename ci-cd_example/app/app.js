import express from "express";

export default function createApp() {
  let app = express();

  app.use(express.json());

  return app
}
