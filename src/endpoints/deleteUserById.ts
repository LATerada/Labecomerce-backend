// import { Request, Response } from "express";
// import { users } from "../database";

// export const deleteUserById = (req: Request, res: Response) => {
//   try {
//     const id = req.params.id;

//     const userExists = users.find((user) => {
//       return user.id === id;
//     });
//     if (!userExists) {
//       res.status(404);
//       throw new Error("Usuário não encontrado.");
//     }

//     const userIndex = users.findIndex((user) => user.id === id);
//     if (userIndex >= 0) {
//       users.splice(userIndex, 1);
//     }
//     res.status(200).send("User deletado com sucesso");
//   } catch (error) {
//     console.log(error);

//     if (res.statusCode === 200) {
//       res.status(500);
//     }
//     if (error instanceof Error) {
//       res.send(error.message);
//     } else {
//       res.send("Erro inesperado.");
//     }
//   }
// };
