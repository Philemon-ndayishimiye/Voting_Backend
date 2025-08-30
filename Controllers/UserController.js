import UserModel from "../models/user.js";
import bcrypt from "bcrypt";

export const CreateUser = async (req, res) => {
  const {
    fullName,
    phoneNumber,
    email,
    district,
    sector,
    cell,
    village,
    password,
    identificationCard,
  } = req.body;

  try {
    // check if ID already exists
    const existingUser = await UserModel.findOne({
      where: { identificationCard },
    });

    if (existingUser) {
      return res.status(409).json({
        error: "Identification number already registered",
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await UserModel.create({
      fullName,
      phoneNumber,
      email,
      district,
      sector,
      cell,
      village,
      password: hashedPassword,
      identificationCard,
    });

    return res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
