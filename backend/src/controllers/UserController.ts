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
import { Request, Response } from "express";
import * as UserModel from "../models/User";
import { User, findUserByEmail } from "../models/User";
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

export const getAllUsersController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await UserModel.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error while fetching all users" });
  }
};

export const getUserByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    const user = await UserModel.getUserById(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error while fetching user" });
  }
};

export const createUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newUser: UserModel.User = req.body;
    const createdUser = await UserModel.createUser(newUser);
    console.error(UserModel.createUser(newUser));

    res.json(createdUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error while creating a new user" });
  }
};

export const updateUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    const updatedUser: UserModel.User = req.body;
    const user = await UserModel.updateUser(id, updatedUser);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error while updating user" });
  }
};

export const deleteUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    const deletedCount = await UserModel.deleteUser(id);
    if (deletedCount > 0) {
      res.json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error while deleting user" });
  }
};


const SECRET_KEY = 'secretKey 1 2 3 4 5 6 7 8 9';

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      res.status(404).json({ message: 'User not found.' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid credentials.' });
      return;
    }

    const token = jwt.sign({ id: user.id, email: user.mail }, SECRET_KEY, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    console.error('Error while logging in:', error);
    res.status(500).json({ message: 'Failed to login.' });
  }
};