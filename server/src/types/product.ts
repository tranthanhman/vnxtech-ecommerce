export type Product = {
  id?: number;
  name: string;
  slug: string;
  sku: string;
  price: number;
  discountPrice?: number;
  stock: number;
  description: string;
  isFeatured?: boolean;
  brandId: number;
  categoryId: number;
  specifications?: {
    name: string;
    value: string;
    unit?: string;
  }[];
  variants?: {
    sku: string;
    name: string;
    price: number;
    discountPrice?: number;
    stock: number;
    images?: {
      imageUrl: string;
      altText?: string;
      isPrimary?: boolean;
    }[];
    options?: {
      name: string;
      value: string;
    }[];
  }[];
};