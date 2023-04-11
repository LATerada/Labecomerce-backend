import { Request, Response } from "express";
import { db } from "../database/knex";
import { TUser } from "../types";

export const createUsers = async (req: Request, res: Response) => {
  try {
    const id = req.body.id as string;
    const name = req.body.id as string;
    const email = req.body.email as string;
    const password = req.body.password as string;

    if (!id) {
      res.status(400);
      throw new Error("É necessário incluir um 'id'");
    } else if (typeof id !== "string") {
      res.status(400);
      throw new Error("'id' deve ser do tipo string");
    }

    if (!name) {
      res.status(400);
      throw new Error("É necessário incluir um 'name'");
    } else if (typeof id !== "string") {
      res.status(400);
      throw new Error("'name' deve ser do tipo string");
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
    } else if (password.length <= 4) {
      res.status(400);
      throw new Error("'password' com no mínimo 4 caracteres.");
    }

    const idUsed = await db.raw(`
    SELECT * FROM users
    WHERE id LIKE "${id}";
    `);
    if (!idUsed) {
      res.status(409);
      throw new Error("'id' já existe.");
    }

    const emailUsed = await db.raw(`
    SELECT * FROM users
    WHERE email LIKE "${email}";
    `);
    if (!emailUsed) {
      res.status(409);
      throw new Error("'email' já existe.");
    }

    const newUser: TUser = {
      id,
      name,
      email,
      password,
    };

    await db.raw(`
    INSERT INTO users (id, name, email, password)
      VALUES ("${newUser.id}","${newUser.name}","${newUser.email}","${newUser.password}")
    `);
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
