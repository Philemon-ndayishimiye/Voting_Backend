// models/Vote.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Vote = sequelize.define("Vote", {
  voterEmail: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, //  ensures one vote per email
  },
  candidateId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Vote;
