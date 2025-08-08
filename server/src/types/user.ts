export type User = {
  id?: number;
  name: string;
  email: string;
  password: string;
  phone?: string;
  avatar?: string;
  role: Role;
  roleId: number;
  status: UserStatusEnum;
  createdAt: Date;
  // tokens: Token[];
  // addresses: Address[];
  // reviews: Review[];
  // cartItems: CartItem[];
  // orders: Order[];
  // wishlists: Wishlist[];
};


export type Role = {
  id: number;
  name: RoleEnum;
  description: string;
};

export enum RoleEnum {
  ADMIN = "ADMIN",
  USER = "USER",
}

export enum UserStatusEnum {
  ACTIVE = "active",
  INACTIVE = "inactive",
}