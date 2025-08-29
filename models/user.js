// models/User.js
import { DataTypes } from 'sequelize';

const User = (sequelize, DataTypes) => {
  const userModel = sequelize.define("Users", {
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    IdentificationCard: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    District: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Sector: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Cell: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Village: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return userModel;
};

export default User;