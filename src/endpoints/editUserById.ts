import { Request, Response } from "express";
import { users } from "../database";

export const editUserById = (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const newId = req.body.id as string | undefined;
    const newEmail = req.body.email as string | undefined;
    const newPassword = req.body.password as string | undefined;

    const newIdUsed = users.find((user) => {
      return user.id === newId;
    });
    if (newIdUsed) {
      res.status(409);
      throw new Error("'id' já existe.");
    }

    const newEmailUsed = users.find((user) => {
      return user.email === newEmail;
    });
    if (newEmailUsed) {
      res.status(409);
      throw new Error("'email' já existe.");
    }

    const userToEdit = users.find((user) => {
      return user.id === id;
    });
    if (userToEdit) {
      userToEdit.id = newId || userToEdit.id;
      userToEdit.email = newEmail || userToEdit.email;
      userToEdit.password = newPassword || userToEdit.password;
    } else if (!userToEdit) {
      res.status(404);
      throw new Error("Usuário não encontrado.");
    }

    res.status(200).send("Cadastro atualizado com sucesso");
  } catch (error) {
    res.send(error.message);
  }
};
