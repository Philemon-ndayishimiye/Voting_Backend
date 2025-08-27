import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const dbconn = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
  }
);

const dbCheck = async () => {
  try {
    await dbconn.authenticate();
    console.log("database connected successfully");
  } catch (error) {
    console.log(`error ${error}`);
  }
};

dbCheck();

module.exports = dbconn;
