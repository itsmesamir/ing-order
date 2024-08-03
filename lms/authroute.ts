import express from "express";
import { loginHandler, refreshToken } from "../controllers/authController";
import { fetchAll, fetchByEmail, fetchById } from "../controllers/user";
import { authenticate } from "../middleware/auth";

const router = express.Router();

// authentication routes
router.use(authenticate);

// Login route
router.post("/login", loginHandler);

// Refresh token route
router.post("/token", refreshToken);

// Fetch user by email route
router.get("/user/email", fetchByEmail);

// Fetch all users route
router.get("/user/all", fetchAll);

// Fetch user by token route
// router.get('/user/token', fetch);

// Fetch user by ID route
router.get("/user/:id", fetchById);

export default router;
