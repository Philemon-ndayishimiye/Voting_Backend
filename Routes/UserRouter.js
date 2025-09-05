import express from "express";
import {
  CreateUser,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
} from "../Controllers/UserController.js";

const Router = express.Router();
/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *           example:
 *             fullName: "David Uwimana"
 *             phoneNumber: "0784567890"
 *             email: "david@example.com"
 *             password: "password123"
 *             identificationCard: "1122334455"
 *             district: "Gasabo"
 *             sector: "Kimironko"
 *             cell: "Cell4"
 *             village: "VillageD"
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 * /api/user/update/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *           example:
 *             fullName: "David Uwimana Updated"
 *             phoneNumber: "0784567890"
 *             email: "david_updated@example.com"
 *             password: "newpassword123"
 *             identificationCard: "1122334455"
 *             district: "Gasabo"
 *             sector: "Kimironko"
 *             cell: "Cell4"
 *             village: "VillageD"
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 * /api/user/delete/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User deleted successfully"
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - fullName
 *         - phoneNumber
 *         - email
 *         - password
 *         - identificationCard
 *         - district
 *         - sector
 *         - cell
 *         - village
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated ID
 *         fullName:
 *           type: string
 *         phoneNumber:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         identificationCard:
 *           type: string
 *         district:
 *           type: string
 *         sector:
 *           type: string
 *         cell:
 *           type: string
 *         village:
 *           type: string
 *       example:
 *         id: "1"
 *         fullName: "Alice Uwase"
 *         phoneNumber: "0781234567"
 *         email: "alice@example.com"
 *         password: "password123"
 *         identificationCard: "123456789"
 *         district: "Gasabo"
 *         sector: "Kacyiru"
 *         cell: "Cell1"
 *         village: "VillageA"
 */

/**
 * @swagger
 * /api/user/getallUser:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *             example:
 *               - id: "1"
 *                 fullName: "Alice Uwase"
 *                 phoneNumber: "0781234567"
 *                 email: "alice@example.com"
 *                 password: "password123"
 *                 identificationCard: "123456789"
 *                 district: "Gasabo"
 *                 sector: "Kacyiru"
 *                 cell: "Cell1"
 *                 village: "VillageA"
 *               - id: "2"
 *                 fullName: "Bob Nkurunziza"
 *                 phoneNumber: "0782345678"
 *                 email: "bob@example.com"
 *                 password: "password123"
 *                 identificationCard: "987654321"
 *                 district: "Kicukiro"
 *                 sector: "Gikondo"
 *                 cell: "Cell2"
 *                 village: "VillageB"
 *               - id: "3"
 *                 fullName: "Catherine Mukamana"
 *                 phoneNumber: "0783456789"
 *                 email: "catherine@example.com"
 *                 password: "password123"
 *                 identificationCard: "456789123"
 *                 district: "Nyarugenge"
 *                 sector: "Nyamirambo"
 *                 cell: "Cell3"
 *                 village: "VillageC"
 */

// Your CRUD routes
Router.get("/getallUser", getAllUsers);
Router.get("/getoneuser/:id", getUserById);
Router.post("/register", CreateUser);
Router.put("/update/:id", updateUser);
Router.delete("/delete/:id", deleteUser);

export default Router;
