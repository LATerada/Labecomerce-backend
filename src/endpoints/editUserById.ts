import { Request, Response } from "express";
import { users } from "../database";

export const editUserById = (req: Request, res: Response) => {
  const id = req.params.id;

  const newId = req.body.id as string | undefined;
  const newEmail = req.body.email as string | undefined;
  const newPassword = req.body.password as string | undefined;

  const userToEdit = users.find((user) => {
    return user.id === id;
  });

  if (userToEdit) {
    userToEdit.id = newId || userToEdit.id;
    userToEdit.email = newEmail || userToEdit.email;
    userToEdit.password = newPassword || userToEdit.password;
  }
  res.status(200).send("Cadastro atualizado com sucesso")
};
