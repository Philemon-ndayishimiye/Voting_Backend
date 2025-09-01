import express from "express";
import {
  CreateUser,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
} from "../Controllers/UserController.js";
const Router = express.Router();

Router.post("/register", CreateUser);
Router.get("/getallUser", getAllUsers);
Router.get("/getoneuser/:id", getUserById);
Router.delete("/delete/:id", deleteUser);
Router.put("/update/:id", updateUser);

export default Router;
