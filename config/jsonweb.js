import dotenv from "dotenv";
dotenv.config();
const config = {
  jwtSecret: process.env.JWT_SECRET_KEY,
};

export default config;
