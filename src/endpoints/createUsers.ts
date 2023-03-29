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
    } else if (typeof id !== "string") {
      res.status(400);
      throw new Error("'id' deve ser do tipo string");
    }

    if (!email) {
      res.status(400);
      throw new Error("É necessário incluir um 'email'");
    } else if (typeof email !== "string") {
      res.status(400);
      throw new Error("'email' deve ser do tipo string");
    }

    if (!password) {
      res.status(400);
      throw new Error("É necessário incluir um 'password'");
    } else if (typeof password !== "string") {
      res.status(400);
      throw new Error("'password' deve ser do tipo string");
    } else if (password.length <= 8) {
      res.status(400);
      throw new Error("'password' com no mínimo 8 caracteres.");
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
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado.");
    }
  }
};
