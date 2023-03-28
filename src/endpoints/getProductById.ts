import { Request, Response } from "express";
import { products } from "../database";

export const getProductById = (req:Request, res:Response) => {
    const id = req.params.id
    const product = products.find((product) => {
        return product.id === id
    })
    res.status(200).send(product)
}