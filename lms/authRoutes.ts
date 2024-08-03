import express from "express";
import { refreshToken, loginHandler } from "../controllers/authController";

const router = express.Router();

router.post("/refresh_token", async (req, res) => {
  await refreshToken(req, res);
});

router.post("/login", async (req, res) => {
  await loginHandler(req, res);
});

export default router;
