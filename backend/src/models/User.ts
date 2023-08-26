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
import db from "../config/db";

export interface User {
  id: number;
  name: string;
  mail: string;
  password: string;
  niveau_educative: string;
  verified: boolean;
}

const TABLE_NAME = "users";

export const getAllUsers = async (): Promise<User[]> => {
  try {
    return await db(TABLE_NAME).select();
  } catch (error) {
    
    throw new Error("Error while fetching all users");
  }
};

// UserModel.ts
export const getUserById = async (id: number): Promise<User | null> => {
  try {
    const users = await db(TABLE_NAME).where("id", id).select();
    return users.length ? users[0] : null;
    console.log(users);
  } catch (error) {
    console.log(error);
    throw new Error(`Error while fetching user with ID ${id}`);
  }
};

export const createUser = async (user: User): Promise<User> => {
  try {
    const [createdUser] = await db(TABLE_NAME)
      .insert(user)
      .returning(["id", "name", "mail"]);
    return createdUser;
  } catch (error) {
    console.error(error);
    throw new Error("Error while creating a new user");
  }
};

export const updateUser = async (id: number, updatedUser: User): Promise<User | null> => {
  try {
    const existingUser = await getUserById(id);
    console.log(existingUser);

    if (!existingUser) {
      return null; // User not found, return null
    }

    const updateUserFields: Partial<User> = {}; // Initialize the fields to update

    // Check each field in the updatedUser object and add to updateUserFields if present
    if (updatedUser.name) {
      updateUserFields.name = updatedUser.name;
    }

    if (updatedUser.mail) {
      updateUserFields.mail = updatedUser.mail;
    }

    if (updatedUser.password) {
      updateUserFields.password = updatedUser.password;
    }

    if (updatedUser.niveau_educative) {
      updateUserFields.niveau_educative = updatedUser.niveau_educative;
    }


    if (Object.keys(updateUserFields).length === 0) {
      return null; // No fields to update
    }

    // Update the user in the database
    const [updatedUserResult] = await db(TABLE_NAME)
      .where('id', id)
      .update(updateUserFields)
      .returning('*');

    return updatedUserResult || null;
  } catch (error) {
    console.log(error);
    throw new Error(`Error while updating user with ID ${id}: ${error}`);
  }
};


export const deleteUser = async (id: number): Promise<number> => {
  try {
    return await db(TABLE_NAME).where("id", id).delete();
  } catch (error) {
    throw new Error(`Error while deleting user with ID ${id}`);
  }
};

export const findUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const user = await db("users").where({ mail: email }).first();
    return user || null;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
