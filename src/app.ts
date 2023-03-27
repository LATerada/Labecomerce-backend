import express from "express";
import cors from "cors";
import { test } from "./endpoints/test";
import { getAllUsers } from "./endpoints/getAllUsers";
import { getAllProducts } from "./endpoints/getAllProducts";
import { createUsers } from "./endpoints/createUsers";
import { searchProductsByName } from "./endpoints/searchProductByName";
import { createProduct } from "./endpoints/createProduct";
import { createPurchase } from "./endpoints/createPurchase";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

//test
app.get("/ping", test);

//getAllUsers
app.get("/users", getAllUsers);

// getAllProducts
app.get("/products", getAllProducts);

// searchProductByName
app.get("/products/search", searchProductsByName);

// createUser
app.post("/users", createUsers);

// createProduct
app.post("/products", createProduct);

// createPurchase
app.post("/purchases", createPurchase);