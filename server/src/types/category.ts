export interface Category {
  id?: number;
  name?: string;
  slug?: string;
  parentId?: number;
  icon?: string;
  createdAt?: string;
  updatedAt?: string;
  children?: Category[];
  parent?: Category;
}
