import express from "express";
import dotenv from "dotenv";
import dbconn from "./config/db.js";
import userRoutes from "./Routes/UserRouter.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Mount user routes
app.use("/api/user", userRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Server is running and configured!");
});

dbconn.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
});
