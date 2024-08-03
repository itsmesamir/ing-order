import express from "express";
import knex from "../db";
import { authenticate } from "../middleware/auth";

const router = express.Router();

router.get("/profile", authenticate, async (req: any, res) => {
  try {
    const user = await knex("users").where({ id: req.userId }).first();
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
