import CandidatesModel from "../models/Candidates.js";
import {SendEmail} from "../utils/SendEmail.js";
import Vote from "../models/Votes.js"; 

export const createCandidates = async (req, res) => {
  // Check if a file was uploaded
  if (!req.file) {
    return res.status(400).json({ error: "No image file uploaded." });
  }

  // Get other data from the request body
  const {
    identificationCard,
    fullName,
    phoneNumber,
    email,
    supportiveDocument,
    objectives,
    village,
    votes,
  } = req.body;

  // The image path is available in req.file.path
  const image = req.file.path;

  try {
    const existingCandidate = await CandidatesModel.findOne({
      where: { identificationCard },
    });

    if (existingCandidate) {
      // You may want to delete the uploaded file here to clean up
      // if it's not needed, using 'fs'
      // Example: fs.unlinkSync(image);

      return res.status(409).json({
        error: "Identification number already exists.",
      });
    }

    // Create the new candidate, including the image path
    const candidate = await CandidatesModel.create({
      identificationCard,
      fullName,
      phoneNumber,
      email,
      supportiveDocument,
      objectives,
      village,
      image, // Use the file path from Multer
      votes,
    });

    if (candidate) {
      await SendEmail(
        candidate.email,
        "Application Received",
        `Hello ${candidate.fullName},\n\nYour application has been received successfully. We will review it shortly.\n\nThank you.`
      );

      return res.status(200).json({
        message: "Candidate created successfully",
        candidate,
      });
    }
  } catch (error) {
    console.error("Error creating candidate:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Get all candidates
export const getAllCandidates = async (req, res) => {
  try {
    const candidates = await CandidatesModel.findAll();
    return res.status(200).json({ candidates });
  } catch (error) {
    console.error("Error fetching candidates:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Get a single candidate by ID
export const getCandidateById = async (req, res) => {
  const { id } = req.params;
  try {
    const candidate = await CandidatesModel.findByPk(id);
    if (!candidate) {
      return res.status(404).json({ error: "Candidate not found" });
    }
    return res.status(200).json({ candidate });
  } catch (error) {
    console.error("Error fetching candidate by ID:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Update a candidate by ID
export const updateCandidate = async (req, res) => {
  const { id } = req.params;
  try {
    const candidate = await CandidatesModel.findByPk(id);
    if (!candidate) {
      return res.status(404).json({ error: "Candidate not found" });
    }
    await candidate.update(req.body);
    return res
      .status(200)
      .json({ message: "Candidate updated successfully", candidate });
  } catch (error) {
    console.error("Error updating candidate:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a candidate by ID
export const deleteCandidate = async (req, res) => {
  const { id } = req.params;
  try {
    const candidate = await CandidatesModel.findByPk(id);
    if (!candidate) {
      return res.status(404).json({ error: "Candidate not found" });
    }
    await candidate.destroy();
    return res.status(200).json({ message: "Candidate deleted successfully" });
  } catch (error) {
    console.error("Error deleting candidate:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Increment votes for a candidate
// Increment votes for a candidate (only one vote per user)
export const incrementVotes = async (req, res) => {
  const { id } = req.params; // candidateId from URL
  const voterEmail = req.user.email; // ✅ comes from JWT middleware

  try {
    // Check candidate exists
    const candidate = await CandidatesModel.findByPk(id);
    if (!candidate) {
      return res.status(404).json({ error: "Candidate not found" });
    }

    // Check if this voter already voted
    const existingVote = await Vote.findOne({ where: { voterEmail } });

    if (existingVote) {
      return res
        .status(400)
        .json({ error: "You have already voted for a candidate" });
    }

    // Save the vote
    await Vote.create({ voterEmail, candidateId: id });

    // Increment the candidate's vote count
    await candidate.increment("votes", { by: 1 });
    await candidate.reload();

    return res.status(200).json({
      message: "Vote counted successfully",
      candidate,
    });
  } catch (error) {
    console.error("Error incrementing votes:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Change a candidate's accepted status
export const acceptCandidate = async (req, res) => {
  const { id } = req.params;
  try {
    const candidate = await CandidatesModel.findByPk(id);
    if (!candidate) {
      return res.status(404).json({ error: "Candidate not found" });
    }
    if (candidate.accepted === "true") {
      return res.status(400).json({ message: "Candidate is already accepted" });
    }
    await candidate.update({ accepted: "true" });
      await SendEmail(
      candidate.email,
      "Application Accepted",
      `Congratulations ${candidate.fullName}!\n\nYour application has been accepted.`
    );
    return res
      .status(200)
      .json({ message: "Candidate accepted successfully", candidate });
  } catch (error) {
    console.error("Error accepting candidate:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Change a candidate's rejected
export const RejectCandidates = async (req, res) => {
  const { id } = req.params;
  try {
    const candidate = await CandidatesModel.findByPk(id);
    if (!candidate) {
      return res.status(404).json({ error: "Candidate not found" });
    }
    if (candidate.accepted === "false") {
      return res.status(400).json({ message: "Candidate is already rejected" });
    }
    await candidate.update({ accepted: "false" });
       await SendEmail(
      candidate.email,
      "Application Rejected",
      `Dear ${candidate.fullName},\n\nWe regret to inform you that your application has been rejected.`
    );
    return res.status(200).json({ message: "Candidate rejected", candidate });
  } catch (error) {
    console.error("Error rejecting candidate:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Get candidates in Gitwa
export const getCandidatesGitwa = async (req, res) => {
  try {
    const candidates = await CandidatesModel.findAll({
      where: { village: "Gitwa" },
    });

    return res.status(200).json({ candidates });
  } catch (error) {
    console.error("Error fetching Gitwa candidates:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Get candidates in Ituze
export const getCandidatesItuze = async (req, res) => {
  try {
    const candidates = await CandidatesModel.findAll({
      where: { village: "ituze" },
    });

    return res.status(200).json({ candidates });
  } catch (error) {
    console.error("Error fetching Ituze candidates:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Get candidates in Mpazi
export const getCandidatesMpazi = async (req, res) => {
  try {
    const candidates = await CandidatesModel.findAll({
      where: { village: "Mpazi" },
    });

    return res.status(200).json({ candidates });
  } catch (error) {
    console.error("Error fetching Mpazi candidates:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

