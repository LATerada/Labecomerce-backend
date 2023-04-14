import { Request, Response } from "express";
import { db } from "../database/knex";
import { TUser } from "../types";

export const deleteUserById = async (req: Request, res: Response) => {
  try {
    const idToDelete = req.params.id;

    if (idToDelete[0] !== "u") {
      res.status(400);
      throw new Error("'id' deve iniciar com a letra 'u'");
    }

    const [user]: TUser[] | undefined[] = await db("users").where({
      id: idToDelete,
    });

    if (!user) {
      res.status(404);
      throw new Error("Usuário não encontrado.");
    }

    await db("purchases").del().where({ buyer: idToDelete });
    await db("users").del().where({ id: idToDelete });

    res.status(200).send("User deletado com sucesso");
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
