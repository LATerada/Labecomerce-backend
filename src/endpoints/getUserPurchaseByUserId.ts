import { Request, Response } from "express";
import { purchases } from "../database";

export const getUserPurchaseByUserId = (req: Request, res: Response) => {
  const id = req.params.id;
  const userPurchaseList = purchases.filter((purchase) => {
    return purchase.userId === id;
  });
  res.status(200).send(userPurchaseList);
};
