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
    role="user"
  } = req.body;

  try {
    // 1. Validate the length of the identification card
    if (!identificationCard || identificationCard.length !== 16) {
      return res.status(400).json({
        error: "Identification card must be exactly 16 characters long.",
      });
    }

    // 2. Check if ID already exists
    const existingUser = await UserModel.findOne({
      where: { identificationCard },
    });

    if (existingUser) {
      return res.status(409).json({
        error: "Identification number already registered",
      });
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Create user
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
      role
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


// get All user

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.findAll();
    return res.status(200).json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

//get user by Id

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


// Update a user by ID
export const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    await user.update(req.body);
    return res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// delete user

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    await user.destroy();
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


