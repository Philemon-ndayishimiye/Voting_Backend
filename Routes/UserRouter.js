import express from "express";
// UserRouter.js
import createUser from "../Controllers/UserController.js"; // "Controllers" with capital C

const router = express.Router();

// POST /api/users/register
router.post("/register", createUser);

export default router;
