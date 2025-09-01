import sequelize from "../config/db.js";
import { DataTypes, ENUM } from "sequelize";

const Candidates = sequelize.define("candidates", {
  identificationCard: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  supportiveDocument: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  objectives: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  votes: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  accepted: {
    type: DataTypes.ENUM("true", "false"),
    allowNull: false,
    defaultValue: "false",
  },
});

export default Candidates;
