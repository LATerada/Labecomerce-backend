import { Request, Response } from "express";
// import { products } from "../database";
import { db } from "../database/knex";
import { TProduct } from "../types";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const id = req.body.id as string;
    const name = req.body.name as string;
    const price = req.body.price as number;
    // const category = req.body.category as TICKETS_CATEGORY;
    const description = req.body.description as string;
    const imageUrl = req.body.imageUrl as string;

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
    } else if (typeof name !== "string") {
      res.status(400);
      throw new Error("'name' deve ser do tipo string");
    }

    if (!price) {
      res.status(400);
      throw new Error("É necessário incluir um 'price'");
    } else if (price) {
      if (typeof price !== "number") {
        res.status(400);
        throw new Error("'price' deve ser do tipo number");
      }
      if (price < 0) {
        res.status(400);
        throw new Error("'price' deve ser maior ou igual a zero.");
      }
    }

    // if (!category) {
    //   res.status(400);
    //   throw new Error("É necessário incluir 'category'");
    // } else if (category) {
    //   if (
    //     category !== TICKETS_CATEGORY.LIBRARY &&
    //     category !== TICKETS_CATEGORY.MUSEUM &&
    //     category !== TICKETS_CATEGORY.OBSERVATORY &&
    //     category !== TICKETS_CATEGORY.ZOO
    //   ) {
    //     res.status(400);
    //     throw new Error("'type' deve ser um dos tipos válidos");
    //   }
    // }

    if (!description) {
      res.status(400);
      throw new Error("É necessário incluir um 'description'");
    } else if (typeof description !== "string") {
      res.status(400);
      throw new Error("'description' deve ser do tipo string");
    }

    if (!imageUrl) {
      res.status(400);
      throw new Error("É necessário incluir um 'imageUrl'");
    } else if (typeof imageUrl !== "string") {
      res.status(400);
      throw new Error("'imageUrl' deve ser do tipo string");
    }

    // const idUsed = await db.raw(`
    // SELECT * FROM users
    // WHERE id LIKE ${id};
    // `);

    // products.find((product) => {
    //   return product.id === id;
    // });
    const [idUsed] = await db("users").where({ id: id });
    if (idUsed) {
      res.status(409);
      throw new Error("'id' já existe.");
    }

    const newProduct: TProduct = {
      id,
      name,
      price,
      // category,
      description,
      imageUrl,
    };
    // products.push(newProduct);

    // await db.raw(`
    // INSERT INTO products
    // VALUES ("${newProduct.id}","${newProduct.name}","${newProduct.price}","${newProduct.description}","${newProduct.imageUrl}")
    // `);
    await db("products").insert(newProduct);
    res.status(201).send("Produto cadastrado com sucesso");
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
