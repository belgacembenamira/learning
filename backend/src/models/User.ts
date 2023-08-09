/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 06/08/2023 - 21:25:39
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 06/08/2023
    * - Author          : belgacem
    * - Modification    : 
**/
// models/User.ts
import db from '../config/db';

export interface User {
  id: number;
  name: string;
  mail: string;
  password : string;
  niveau_educative :string;
  

}

const TABLE_NAME = 'users';

export const getAllUsers = async (): Promise<User[]> => {
  try {
    return await db(TABLE_NAME).select();
  } catch (error) {
    throw new Error('Error while fetching all users');
  }
};

export const getUserById = async (id: number): Promise<User | null> => {
  try {
    const Users = await db(TABLE_NAME).where('id', id).select();
    return Users.length ? Users[0] : null;
  } catch (error) {
    throw new Error(`Error while fetching user with ID ${id}`);
  }
};

export const createUser = async (user: User): Promise<User> => {
  try {
    const [createdUser] = await db(TABLE_NAME).insert(user).returning(['id', 'name', 'mail']);
    return createdUser;
  } catch (error) {
    console.error(error);
    throw new Error('Error while creating a new user');
  }
};


export const updateUser = async (id: number, user: User): Promise<User | null> => {
  try {
    const [updatedUser] = await db(TABLE_NAME).where('id', id).update(user).returning('*');
    return updatedUser || null;
  } catch (error) {
    throw new Error(`Error while updating user with ID ${id}`);
  }
};

export const deleteUser = async (id: number): Promise<number> => {
  try {
    return await db(TABLE_NAME).where('id', id).delete();
  } catch (error) {
    throw new Error(`Error while deleting user with ID ${id}`);
  }
};


export const findUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const user = await db('users').where({ mail: email }).first();
    return user || null;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
