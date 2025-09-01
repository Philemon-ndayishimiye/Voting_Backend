import express from "express";
import { LoginUser } from "../Auth/Login.js";

const Router = express.Router();

Router.post("/login", LoginUser);

export default Router;
