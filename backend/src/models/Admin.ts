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
  password :string;
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
    const [createdAdmin] = await db(TABLE_NAME).insert({
      mail: admin.mail,
      password: admin.password,
      name: admin.name,
    tlf: admin.tlf,
    }).returning('*');
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

export const findAdminByEmail = async (email: string) => {
  try {
    const admin = await db(TABLE_NAME).where({ mail: email }).first();
    return admin || null;
  } catch (error) {
    throw error;
  }
};
export const clearAdminResetToken = async (mail: string) => {
  try {
    const test = await db(TABLE_NAME)
      .where({ mail: mail }) 
      // Make sure 'mail' is the correct column name
      // .update({ resetToken: null }); // Supprimez cette ligne pour éviter l'erreur
    console.log(test);
  } catch (error) {
    console.log(error);
    throw error;
  }
};


// models/AdminModel.ts
export const updateAdminPassword = async (mail: string, newPassword: string) => {
  try {
  const up =  await db(TABLE_NAME).where({ mail: mail }).update({ password: newPassword });
 
console.log(up);
} catch (error) {
    throw error;
  }
};



export const getAdminByEmail = async (email: string): Promise<Admin | null> => {
  try {
    const admin = await db<Admin>(TABLE_NAME).where({ mail: email }).first();
    return admin || null;
  } catch (error) {
    console.error(error);
    throw error;
  }
};