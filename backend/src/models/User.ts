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
  verified :boolean;
  

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
    // Crée un objet pour stocker les champs à mettre à jour
    const updateUserFields: Partial<User> = {};

    // Vérifiez chaque champ et mettez à jour si présent
    if (user.name) {
      updateUserFields.name = user.name;
    }

    if (user.mail) {
      updateUserFields.mail = user.mail;
    }

    if (user.password) {
      updateUserFields.password = user.password;
    }

    if (user.niveau_educative) {
      updateUserFields.niveau_educative = user.niveau_educative;
    }

    // Vérifiez s'il y a des champs à mettre à jour
    if (Object.keys(updateUserFields).length === 0) {
      // Aucun champ à mettre à jour
      return null;
    }

    // Mettez à jour l'utilisateur dans la base de données
    const [updatedUser] = await db(TABLE_NAME)
      .where('id', id) // Assurez-vous que l'ID est correctement utilisé
      .update(updateUserFields)
      .returning('*');

    return updatedUser || null;
  } catch (error) {
    console.log(error);
    throw new Error(`Error while updating user with ID ${id}: ${error}`);
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
