import express from "express";
import { createCandidates } from "../Controllers/CandidatesController.js";
const Router = express.Router();

Router.post("/registerCandidates", createCandidates);

export default Router;
