// Import necessary modules
import express from "express";
import dotenv from "dotenv";
import { Sequelize } from "sequelize";

// Load environment variables from the .env file
dotenv.config();

// Create an Express application
const app = express();
const port = process.env.PORT || 3000;

// Configure the database connection using the single DB_CONNECTION_URL variable.
// This is the most robust and portable way to handle database credentials with Sequelize.
const dbconn = new Sequelize(process.env.DB_CONNECTION_URL, {
  dialect: "postgres",
  // The `dialectOptions` are crucial for connecting to a Render database with SSL.
  // Render requires a secure connection, so this configuration is essential.
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  // Log Sequelize queries for debugging purposes
  logging: console.log,
});

// Function to authenticate the database connection.
// It will attempt to connect and log success or a detailed error.
const dbCheck = async () => {
  try {
    await dbconn.authenticate();
    console.log("Database connected successfully.");
  } catch (error) {
    // Log the full error to help with debugging connection issues
    console.error(`Error connecting to the database:`, error);
    // Exiting the process ensures the application doesn't run without a database connection
    process.exit(1);
  }
};

// Check the database connection immediately when the server starts
dbCheck();

// Define a simple API route to confirm the server is running and configured
app.get("/", (req, res) => {
  res.send("Server is running and configured!");
});

// Start the server and listen for incoming requests on the specified port
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// Export the database connection object for use in other parts of your application
export default dbconn;
