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
  description: string;
  image_url: string;
};

export type TPurschase = {
  purchaseId: string;
  userId: string;
  productId: string;
  // quantity: number;
  totalPrice: number;
};
