export type TUser = {
  id: string;
  name: string;
  email: string;
  password: string;
};
export type TProduct = {
  id: string;
  name: string;
  price: number;
  category: TICKETS_CATEGORY;
  description: string;
  imageUrl: string;
};
export type TPurschase = {
  purchaseId: string;
  userId: string;
  productId: string;
  // quantity: number;
  totalPrice: number;
};
export enum TICKETS_CATEGORY {
  MUSEUM = "museum",
  OBSERVATORY = "observatory",
  LIBRARY = "library",
  ZOO = "zoo",
}
