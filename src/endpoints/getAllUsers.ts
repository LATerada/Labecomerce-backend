import { Request, Response } from "express";
import { db } from "../database/knex";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    // const users = await db.raw(`
    // SELECT * FROM users;
    // `);
    const users = await db("users").select(
      "id",
      "name",
      "email",
      "password",
      "created_At as createdAt"
    );

    res.status(200).send(users);
  } catch (error) {
    console.log(error);
  }
};
