// import { Request, Response } from "express";
// import { purchases, users } from "../database";

// export const getUserPurchaseByUserId = (req: Request, res: Response) => {
//   try {
//     const id = req.params.id;

//     const userExists = users.find((user) => {
//       return user.id === id
//     })
//     if(!userExists){
//       res.status(404)
//       throw new Error("Usuário não encontrado.")
//     }

//     const userPurchaseList = purchases.filter((purchase) => {
//       return purchase.userId === id;
//     });
//     res.status(200).send(userPurchaseList);
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
