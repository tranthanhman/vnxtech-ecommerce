import { Request, Response } from 'express';
import * as productService from './product.service';

export const createProduct = async (req: Request, res: Response) => {
  const product = await productService.createProduct(req.body);
  res.json(product);
};