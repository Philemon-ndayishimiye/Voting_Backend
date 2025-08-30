import express from "express";
import {CreateUser}   from "../Controllers/UserController.js";
const Router = express.Router();

Router.post("/register", CreateUser);

export default Router;
