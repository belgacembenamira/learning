/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 06/08/2023 - 21:26:31
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 06/08/2023
    * - Author          : belgacem
    * - Modification    : 
**/
// controllers/UserController.ts
import { Request, Response } from 'express';
import * as UserModel from '../models/User';
import { User } from '../models/User';

export const getAllUsersController = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await UserModel.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error while fetching all users' });
  }
};

export const getUserByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    const user = await UserModel.getUserById(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error while fetching user' });
  }
};

export const createUserController = async (req: Request, res: Response): Promise<void> => {
  try {
    const newUser: UserModel.User = req.body;
    const createdUser = await UserModel.createUser(newUser);
    console.error(UserModel.createUser(newUser));
  

    res.json(createdUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error while creating a new user' });
  }
};

export const updateUserController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    const updatedUser: UserModel.User = req.body;
    const user = await UserModel.updateUser(id, updatedUser);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error while updating user' });
  }
};

export const deleteUserController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    const deletedCount = await UserModel.deleteUser(id);
    if (deletedCount > 0) {
      res.json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error while deleting user' });
  }
};
