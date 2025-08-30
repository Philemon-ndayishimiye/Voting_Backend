import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  protocol: "postgres",
  dialectOptions: {
    ssl: {
      require: true, // Render requires SSL for Postgres
      rejectUnauthorized: false,
    },
  },
});

const dbcheck = async () => {
  try {
    await sequelize.authenticate();
    console.log(" Database connected successfully");
  } catch (error) {
    console.error(" Error connecting to database:", error);
  }
};

dbcheck();

export default sequelize;
