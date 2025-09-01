import CandidatesModel from "../models/Candidates.js";

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
      image, // Use the file path from Multer
      votes,
    });

    if (candidate) {
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
    return res.status(200).json({ message: "Candidate updated successfully", candidate });
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
export const incrementVotes = async (req, res) => {
  const { id } = req.params;
  try {
    const candidate = await CandidatesModel.findByPk(id);
    if (!candidate) {
      return res.status(404).json({ error: "Candidate not found" });
    }
    await candidate.increment('votes', { by: 1 });
    // Reload the candidate to get the updated votes count
    await candidate.reload();
    return res.status(200).json({ message: "Vote counted successfully", candidate });
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
    if (candidate.accepted === 'true') {
      return res.status(400).json({ message: "Candidate is already accepted" });
    }
    await candidate.update({ accepted: 'true' });
    return res.status(200).json({ message: "Candidate accepted successfully", candidate });
  } catch (error) {
    console.error("Error accepting candidate:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};