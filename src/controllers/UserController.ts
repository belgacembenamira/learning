/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 04/08/2023 - 12:21:27
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 04/08/2023
    * - Author          : belgacem
    * - Modification    : 
**/
import db from '../config/db';

export interface User {
  id: number;
  name: string;
  mail: string;
}

const TABLE_NAME = 'Users';

export const getAllUsersController = async (): Promise<User[]> => {
  try {
    return await db(TABLE_NAME).select();
  } catch (error) {
    console.log(error)
    throw new Error('Error while fetching all users');
  }
};

export const getUserByIdController = async (id: number): Promise<User | null> => {
  try {
    const Users = await db(TABLE_NAME).where('id', id).select();
    return Users.length ? Users[0] : null;
  } catch (error) {
    throw new Error(`Error while fetching user with ID ${id}`);
  }
};

export const createUserController = async (User: User): Promise<User> => {
  try {
    const [createdUser] = await db(TABLE_NAME).insert(User).returning(['id', 'name', 'mail']);
    return createdUser;
  } catch (error) {
    console.log(error);
    throw new Error('Error while creating a new user');
  }
};

export const updateUserController = async (id: number, User: User): Promise<User | null> => {
  try {
    const [updatedUser] = await db(TABLE_NAME).where('id', id).update(User).returning('*');
    return updatedUser || null;
  } catch (error) {
    throw new Error(`Error while updating user with ID ${id}`);
  }
};

export const deleteUserController = async (id: number): Promise<number> => {
  try {
    return await db(TABLE_NAME).where('id', id).delete();
  } catch (error) {
    throw new Error(`Error while deleting user with ID ${id}`);
  }
};
