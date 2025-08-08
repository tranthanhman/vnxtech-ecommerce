import { Category } from "./category";
import { Media } from "./media";

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
  brand: Brand;
  categoryId: number;
  category: Category;
  thumbnailId?: number;
  thumbnail: Media;
  gallery: Media[];
  specifications?: {
    name: string;
    value: string;
    unit?: string;
  }[];
  variants?: {
    id: number;
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

export interface ProductListResponse {
  products: Product[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

export type Brand = {
  id?: number;
  name: string;
  slug: string;
  logo: string;
  createdAt: string;
  updatedAt?: string;
};
