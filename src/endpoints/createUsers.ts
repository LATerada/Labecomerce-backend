import { Request, Response } from "express";
import { db } from "../database/knex";
import { TUser } from "../types";

export const createUsers = async (req: Request, res: Response) => {
  try {
    const { id, name, email, password } = req.body;

    if (typeof id !== "string") {
      res.status(400);
      throw new Error("'id' deve ser string");
    }
    if (id.length < 4) {
      res.status(400);
      throw new Error("'id' deve possuir pelo menos 4 caracteres");
    }

    if (typeof name !== "string") {
      res.status(400);
      throw new Error("'name' deve ser string");
    }
    if (name.length < 2) {
      res.status(400);
      throw new Error("'name' deve possuir pelo menos 2 caracteres");
    }

    if (typeof email !== "string") {
      res.status(400);
      throw new Error("'email' deve ser string");
    }

    if (
      !password.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,12}$/g
      )
    ) {
      res.status(400);
      throw new Error(
        "'password' deve possuir entre 8 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial"
      );
    }

    const [userIdAlreadyExists]: TUser[] | undefined[] = await db(
      "users"
    ).where({ id });
    if (userIdAlreadyExists) {
      res.status(400);
      throw new Error("'id' já existe");
    }

    const [userEmailAlreadyExists]: TUser[] | undefined[] = await db(
      "users"
    ).where({ email });
    if (userEmailAlreadyExists) {
      res.status(400);
      throw new Error("'email' já existe");
    }

    const newUser: TUser = {
      id,
      name,
      email,
      password,
    };

    await db("users").insert(newUser);

    res
      .status(201)
      .send({ message: "Usuário criado com sucesso.", user: newUser });
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
