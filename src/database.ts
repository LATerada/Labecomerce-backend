import { TProduct, TPurschase, TUser } from "./types";

export const users: TUser[] = [
  {
    id: "user0",
    email: "user@gmail.com",
    password: "12300",
  },
  {
    id: "user1",
    email: "user1@gmail.com",
    password: "12301",
  },
];

export const products: TProduct[] = [
  {
    id: "ProductO",
    name: "ProductO",
    price: 100,
    category: "Entertainment",
  },
  {
    id: "Product1",
    name: "Product1",
    price: 120,
    category: "Entertainment",
  },
];

export const purchases: TPurschase[] = [
  {
    userId: users[0].id,
    productId: products[0].id,
    quantity: 2,
    totalPrice: 2 * products[0].price,
  },
  {
    userId: users[1].id,
    productId: products[1].id,
    quantity: 5,
    totalPrice: 5 * products[1].price,
  },
];
