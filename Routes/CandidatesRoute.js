import express from "express";
import upload from "../middleware/upload.js"; 
import { createCandidates , getAllCandidates , getCandidateById , deleteCandidate , updateCandidate , incrementVotes , acceptCandidate } from "../Controllers/CandidatesController.js";

const Router = express.Router();

// Add upload.single('image') middleware here
// 'image' must match the field name in your form-data request
Router.post("/registerCandidates", upload.single("image"), createCandidates);
Router.post("votes/:id" , incrementVotes);
Router.post("/accept/:id", acceptCandidate);
Router.get("/getallcandidates", getAllCandidates);
Router.get("/getsingleCandidates/:id", getCandidateById);
Router.delete("/deleteCandidate/:id", deleteCandidate);
Router.put("/updatecandidate/:id", updateCandidate);

export default Router;