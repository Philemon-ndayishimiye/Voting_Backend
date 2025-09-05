import express from "express";
import dotenv from "dotenv";
import dbconn from "./config/db.js";
import userRoutes from "./Routes/UserRouter.js";
import candidatesRoute from "./Routes/CandidatesRoute.js";
import cors from "cors";
import AuthRoutes from "./Routes/AuthRoutes.js";
import {swaggerDocs ,swaggerUi} from './config/Swagger.js'

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use(express.json());



// Mount user routes
app.use("/api/user", userRoutes);
app.use("/api/candidate", candidatesRoute);
app.use("/api/auth" ,AuthRoutes);

// swagger routes
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Root route
app.get("/", (req, res) => {
  res.send("Server is running and configured!");
});

dbconn.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
});
