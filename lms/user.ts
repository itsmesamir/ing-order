// server/src/controllers/userController.ts
import { RequestHandler } from "express";
import {
  findByEmail as findUserByEmail,
  findAll as findAllUsers,
  findByToken as findUserByToken,
  findById as findUserById,
} from "../models/user";

export const fetchByEmail: RequestHandler = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await findUserByEmail(email);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const fetchAll: RequestHandler = async (req, res) => {
  try {
    const users = await findAllUsers();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const fetchById: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await findUserById(parseInt(id));
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
