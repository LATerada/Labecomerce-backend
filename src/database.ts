// import { TProduct, TPurschase, TUser } from "./types";

// export const users: TUser[] = [
//   {
//     id: "user0",
//     name: "User0",
//     email: "user@gmail.com",
//     password: "12300",
//   },
//   {
//     id: "user1",
//     name: "User1",
//     email: "user1@gmail.com",
//     password: "12301",
//   },
// ];

// export const products: TProduct[] = [
//   {
//     id: "ProductO",
//     name: "ProductO",
//     price: 100,
//     // category: TICKETS_CATEGORY.OBSERVATORY,
//     description: "description",
//     imageUrl: "imageUrl",
//   },
//   {
//     id: "Product1",
//     name: "Product1",
//     price: 120,
//     // category: TICKETS_CATEGORY.MUSEUM,
//     description: "description",
//     imageUrl: "imageUrl",
//   },
// ];

// export const purchases: TPurschase[] = [
//   {
//     purchaseId: "",
//     userId: users[0].id,
//     productId: products[0].id,
//     // quantity: 2,
//     totalPrice: 2 * products[0].price,
//   },
//   {
//     purchaseId: "",
//     userId: users[1].id,
//     productId: products[1].id,
//     // quantity: 5,
//     totalPrice: 5 * products[1].price,
//   },
// ];

// // USER
// console.log(`

// | USER |
// `);
// const createUser = (id: string, email: string, password: string): string => {
//   const newUser: TUser = {
//     id: id,
//     email: email,
//     password: password,
//   };
//   // console.log(newUser);
//   return "Cadastro realizado com sucesso";
// };
// console.log(createUser("u003", "beltrano@email.com", "beltrano99"));

// const getAllUsers = (): TUser[] => {
//   return users;
// };
// console.log(
//   `
// List of users:`,
//   getAllUsers()
// );

// // PRODUCT
// console.log(`

// | PRODUCT |
// `);
// const createProduct = (
//   id: string,
//   name: string,
//   price: number,
//   category: TICKETS_CATEGORY
// ): string => {
//   const newProduct: TProduct = {
//     id: id,
//     name: name,
//     price: price,
//     category: category,
//   };
//   products.push(newProduct);
//   return "Produto criado com sucesso";
// };
// console.log(createProduct("p004", "Monitor HD", 800, TICKETS_CATEGORY.ZOO));

// const getAllProducts = (): TProduct[] => {
//   return products;
// };
// console.log(
//   `
// List of products: `,
//   getAllProducts()
// );

// const getProductById = (idToSearch: string): TProduct | undefined => {
//   const productOfId = products.find((product) => product.id === idToSearch);
//   return productOfId;
// };
// console.log(getProductById("p004"));

// const queryProductsByName = (query: string): TProduct[] | string => {
//   const productsL = products.filter((product) => product.name.toLowerCase() === query.toLowerCase());
//   return productsL.length !== 0 ? productsL : "Produto não encontrado.";
// };
// console.log(queryProductsByName("monitor"));

// // PURCHASE
// console.log(`

// | PURCHASE |
// `);
// const createPurchase = (
//   userId: string,
//   productId: string,
//   quantity: number,
//   totalPrice: number
// ): string => {
//   const newPurchase: TPurschase = {
//     userId: userId,
//     productId: productId,
//     quantity: quantity,
//     totalPrice: totalPrice,
//   };
//   purchases.push(newPurchase);
//   console.log(purchases);
//   return "Compra realizada com sucesso";
// };
// console.log(createPurchase("u003", "p004", 2, 1600));

// const getAllPurchasesFromUserId = (userIdToSearch: string): TPurschase[] => {
//   return purchases.filter((purchase) => purchase.userId === userIdToSearch);
// };
// console.log(getAllPurchasesFromUserId("u003"));
