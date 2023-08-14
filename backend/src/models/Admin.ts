/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 13/08/2023 - 20:58:51
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 13/08/2023
    * - Author          : belgacem
    * - Modification    : 
**/
// models/Admin.ts
import db from '../config/db';

export interface Admin {
  id: number;
  name: string;
  mail: string;
  tlf: string;
}

const TABLE_NAME = 'admin';

export const getAllAdmins = async (): Promise<Admin[]> => {
  return db(TABLE_NAME).select();
};

export const getAdminById = async (id: number): Promise<Admin | null> => {
  const admins = await db(TABLE_NAME).where('id', id).select();
  return admins.length ? admins[0] : null;
};

export const createAdmin = async (admin: Admin): Promise<Admin> => {
  try {
    const [createdAdmin] = await db(TABLE_NAME).insert(admin).returning('*');
    return createdAdmin;
  } catch (error) {
    throw error;
  }
};

export const updateAdmin = async (id: number, admin: Admin): Promise<Admin | null> => {
  const [updatedAdmin] = await db(TABLE_NAME).where('id', id).update(admin).returning('*');
  return updatedAdmin || null;
};

export const deleteAdmin = async (id: number): Promise<number> => {
  return db(TABLE_NAME).where('id', id).delete();
};
