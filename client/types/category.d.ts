export interface Category {
  id: number;
  name: string;
  slug: string;
  parentId?: number;
  icon?: string;
  children?: Category[];
  parent?: Category;
  createdAt?: string;
  updatedAt?: string;
}