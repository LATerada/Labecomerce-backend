import e, { Request, Response } from "express";
import { users } from "../database";
import { TUser } from "../types";

export const createUsers = (req: Request, res: Response) => {
  try {
    const id = req.body.id as string;
    const email = req.body.email as string;
    const password = req.body.password as string;

    if (!id) {
      res.status(400);
      throw new Error("É necessário incluir um 'id'");
    }
    if (!email) {
      res.status(400);
      throw new Error("É necessário incluir um 'email'");
    }
    if (!password) {
      res.status(400);
      throw new Error("É necessário incluir um 'password'");
    }

    const idUsed = users.find((user) => {
      return user.id === id;
    });
    if (idUsed) {
      res.status(409);
      throw new Error("'id' já existe.");
    }

    const emailUsed = users.find((user) => {
      return user.email === email;
    });
    if (emailUsed) {
      res.status(409);
      throw new Error("'email' já existe.");
    }

    const newUser: TUser = {
      id,
      email,
      password,
    };
    users.push(newUser);
    res.status(201).send("Usuário criado com sucesso.");
  } catch (error) {
    res.send(error.message);
  }
};
