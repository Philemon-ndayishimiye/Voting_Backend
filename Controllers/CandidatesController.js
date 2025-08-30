import CandidatesModel from "../models/Candidates.js";

export const createCandidates = async (req, res) => {
  const {
    identificationCard,
    fullName,
    phoneNumber,
    email,
    supportiveDocument,
    objectives,
    image,
    votes,
  } = req.body;

  try {
    const existingCandidate = await CandidatesModel.findOne({
      where: { identificationCard },
    });

    if (existingCandidate) {
      return res.status(409).json({
        error: "Identification number already exist in our candidates",
      });
    }

    const candidate = await CandidatesModel.create({
      identificationCard,
      fullName,
      phoneNumber,
      email,
      supportiveDocument,
      objectives,
      image,
      votes,
    });

    if (candidate) {
      return res
        .status(200)
        .json({ message: "candidates created successfully", candidate });
    }
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
