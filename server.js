import express from "express";
import dotenv from "dotenv";
import dbconn from "./config/db.js"; // This is correct
// server.js
import UserRouter from "./Routes/UserRouter.js"; // "Routes" with capital R

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Mount user routes
app.use("/api/users", UserRouter);

// Root route
app.get("/", (req, res) => {
  res.send("Server is running and configured!");
});

// Check DB connection
const dbCheck = async () => {
  try {
    await dbconn.authenticate();
    console.log("Database connected successfully.");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  }
};

dbCheck();

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
