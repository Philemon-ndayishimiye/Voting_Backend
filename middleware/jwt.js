
import jwt from "jsonwebtoken";
import config from "../config/jsonweb.js";

export const authenticate = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // "Bearer <token>"

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded; // ✅ Now accessible in controllers
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
