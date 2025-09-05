import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const UserModel = sequelize.define("users", {
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
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  identificationCard: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  district: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sector: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cell: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  village: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role:{
    type:DataTypes.ENUM("user","admin"),
    defaultValue:"user",
    allowNull:false
  }
});

export default UserModel;
