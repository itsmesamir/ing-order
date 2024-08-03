// server/src/controllers/authController.ts

import { Request, Response } from "express";
import { login, refreshAccessToken } from "../services/authService";

export async function refreshToken(req: Request, res: Response) {
  try {
    const refreshToken = req.cookies.jid;

    if (!refreshToken) {
      return res.status(401).json({ ok: false, accessToken: "" });
    }

    const accessToken = refreshAccessToken(refreshToken);

    res.json({ ok: true, accessToken });
  } catch (err) {
    console.error(err);
    res.status(401).json({ ok: false, accessToken: "" });
  }
}

export async function loginHandler(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const tokens = await login(email, password);
    res.cookie("jid", tokens.refreshToken, { httpOnly: true });
    res.json({ accessToken: tokens.accessToken });
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Invalid credentials" });
  }
}
