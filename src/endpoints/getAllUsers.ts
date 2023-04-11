import { Request, Response } from "express";
import { db } from "../database/knex";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await db.raw(`
    SELECT * FROM users;
    `);
    res.status(200).send(users);
  } catch (error) {
    console.log(error);
  }
};
