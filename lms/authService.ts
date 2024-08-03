// server/src/services/authService.ts

import jwt from "jsonwebtoken";
import { findByEmail, findById } from "../models/user";
import { validatePassword } from "../utils/password";
import { createAccessToken, createRefreshToken } from "../utils/jwt";

export async function login(
  email: string,
  password: string
): Promise<{ accessToken: string; refreshToken: string }> {
  const user = await findByEmail(email);

  if (!user || !validatePassword(password, user.password)) {
    throw new Error("Invalid credentials");
  }

  const accessToken = createAccessToken(user);
  const refreshToken = createRefreshToken(user);

  return { accessToken, refreshToken };
}

export function refreshAccessToken(refreshToken: string): string {
  let payload: any = null;

  try {
    payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!);
  } catch (err) {
    throw new Error("Invalid refresh token");
  }

  // Token is valid, check if user exists in database (optional)
  const user = findById(payload.userId);

  if (!user) {
    throw new Error("User not found");
  }

  // Generate new access token
  const accessToken = createAccessToken(user);

  return accessToken;
}
