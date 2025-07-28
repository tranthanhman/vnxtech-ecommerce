import { Request, Response } from 'express';
import * as UserService from './user.service';

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await UserService.getUsers();
  res.json(users);
};
