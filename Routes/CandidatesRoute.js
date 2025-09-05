import express from "express";
import upload from "../middleware/upload.js";
import {
  createCandidates,
  getAllCandidates,
  getCandidateById,
  deleteCandidate,
  updateCandidate,
  incrementVotes,
  acceptCandidate,
} from "../Controllers/CandidatesController.js";

const Router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Candidate:
 *       type: object
 *       required:
 *         - identificationCard
 *         - fullName
 *         - phoneNumber
 *         - email
 *         - objectives
 *         - votes
 *         - image
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated ID
 *         identificationCard:
 *           type: string
 *         fullName:
 *           type: string
 *         phoneNumber:
 *           type: string
 *         email:
 *           type: string
 *         objectives:
 *           type: string
 *         votes:
 *           type: integer
 *         image:
 *           type: string
 *           format: binary
 *         accepted:
 *           type: string
 *           description: Candidate acceptance status
 *       example:
 *         id: "1"
 *         identificationCard: "1122334455123456"
 *         fullName: "Alice Candidate"
 *         phoneNumber: "0781234567"
 *         email: "alice@example.com"
 *         objectives: "Improve education in the district"
 *         votes: 0
 *         image: "uploads/alice.jpg"
 *         accepted: "false"
 */

/**
 * @swagger
 * /api/candidate/getallcandidates:
 *   get:
 *     summary: Get all candidates
 *     tags: [Candidates]
 *     responses:
 *       200:
 *         description: List of candidates
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Candidate'
 *             example:
 *               - identificationCard: "1122334455123456"
 *                 fullName: "Alice Candidate"
 *                 phoneNumber: "0781234567"
 *                 email: "alice@example.com"
 *                 objectives: "Improve education in the district"
 *                 votes: 0
 *                 image: "uploads/alice.jpg"
 *                 accepted: "false"
 *               - identificationCard: "2233445566778899"
 *                 fullName: "Bob Candidate"
 *                 phoneNumber: "0782345678"
 *                 email: "bob@example.com"
 *                 objectives: "Improve healthcare access"
 *                 votes: 0
 *                 image: "uploads/bob.jpg"
 *                 accepted: "false"
 *               - identificationCard: "3344556677889900"
 *                 fullName: "Catherine Candidate"
 *                 phoneNumber: "0783456789"
 *                 email: "catherine@example.com"
 *                 objectives: "Develop local economy"
 *                 votes: 0
 *                 image: "uploads/catherine.jpg"
 *                 accepted: "false"
 *               - identificationCard: "4455667788990011"
 *                 fullName: "David Candidate"
 *                 phoneNumber: "0784567890"
 *                 email: "david@example.com"
 *                 objectives: "Promote sports and youth activities"
 *                 votes: 0
 *                 image: "uploads/david.jpg"
 *                 accepted: "false"
 */

/**
 * @swagger
 * /api/candidate/registerCandidates:
 *   post:
 *     summary: Register a new candidate
 *     tags: [Candidates]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Candidate'
 *           encoding:
 *             image:
 *               contentType: image/jpeg
 *     responses:
 *       201:
 *         description: Candidate created successfully
 */

/**
 * @swagger
 * /api/candidate/updatecandidate/{id}:
 *   put:
 *     summary: Update a candidate by ID
 *     tags: [Candidates]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Candidate ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Candidate'
 *     responses:
 *       200:
 *         description: Candidate updated successfully
 */

/**
 * @swagger
 * /api/candidate/deleteCandidate/{id}:
 *   delete:
 *     summary: Delete a candidate by ID
 *     tags: [Candidates]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Candidate ID
 *     responses:
 *       200:
 *         description: Candidate deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Candidate deleted successfully"
 */

/**
 * @swagger
 * /api/candidate/votes/{id}:
 *   post:
 *     summary: Increment votes for a candidate
 *     tags: [Candidates]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Candidate ID
 *     responses:
 *       200:
 *         description: Votes incremented successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Vote counted successfully"
 *                 candidate:
 *                   $ref: '#/components/schemas/Candidate'
 */

/**
 * @swagger
 * /api/candidate/accept/{id}:
 *   post:
 *     summary: Accept a candidate
 *     tags: [Candidates]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Candidate ID
 *     responses:
 *       200:
 *         description: Candidate accepted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Candidate accepted successfully"
 *                 candidate:
 *                   $ref: '#/components/schemas/Candidate'
 */

Router.post("/registerCandidates", upload.single("image"), createCandidates);
Router.post("/votes/:id", incrementVotes);
Router.post("/accept/:id", acceptCandidate);
Router.get("/getallcandidates", getAllCandidates);
Router.get("/getsingleCandidates/:id", getCandidateById);
Router.delete("/deleteCandidate/:id", deleteCandidate);
Router.put("/updatecandidate/:id", updateCandidate);

export default Router;
