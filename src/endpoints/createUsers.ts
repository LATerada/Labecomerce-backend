import { Request, Response } from "express";
import { users } from "../database";
import { TUser } from "../types";

export const createUsers = (req: Request, res: Response) => {
  const id = req.body.id as string;
  const email = req.body.email as string;
  const password = req.body.password as string;

  const newUser: TUser = {
    id,
    email,
    password,
  };
  users.push(newUser);
  res.status(201).send("Usuário criado com sucesso.");
};
