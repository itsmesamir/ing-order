// server/src/models/User.ts
import db from "../db";
import { User } from "../interfaces/user";

export const findByEmail = (email: string): Promise<User | null> => {
  return db<User>("users").where({ email }).first() as Promise<User | null>;
};

export const findAll = (): Promise<User[]> => {
  return db<User>("users");
};

export const findByToken = (token: string): Promise<User | null> => {
  // Implement logic to find a user by token
  // This could involve checking a table of active tokens
  return Promise.resolve(null);
};

export const findById = (id: number): Promise<User | null> => {
  return db<User>("users")
    .where({ id })
    .first()
    .then((result) => result || null);
};
