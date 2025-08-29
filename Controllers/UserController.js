import dbconn from "../config/db.js"; // This is correct
import { DataTypes } from "sequelize";
import UserModel from "../models/User.js";

const User = UserModel(dbconn, DataTypes);

const createUser = async (req, res) => {
  const {
    fullName,
    phoneNumber,
    email,
    password,
    IdentificationCard,
    District,
    Sector,
    Cell,
    Village,
  } = req.body;

  try {
    const user = await User.create({
      fullName,
      phoneNumber,
      email,
      password,
      IdentificationCard,
      District,
      Sector,
      Cell,
      Village,
    });
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error("Error occurred:", error);
    res
      .status(500)
      .json({ message: "Failed to create user", error: error.message });
  }
};

export default createUser;
