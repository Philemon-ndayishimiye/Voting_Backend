// config/config.js
import dotenv from "dotenv";

dotenv.config();

const common = {
  dialect: "postgres",
  logging: false,
};

export default {
  development: {
    ...common,
    use_env_variable: "DATABASE_URL", // points to .env DATABASE_URL
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },

  test: {
    ...common,
    use_env_variable: "DATABASE_URL",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },

  production: {
    ...common,
    use_env_variable: "DATABASE_URL", // Render will provide this env
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
