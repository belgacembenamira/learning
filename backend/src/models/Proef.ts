/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 13/08/2023 - 20:43:11
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 13/08/2023
    * - Author          : belgacem
    * - Modification    : 
**/
import db from '../config/db';

export interface proef {
  id: number;
  name: string;
  matricule: string;
  mail: string;
  numero_tlf: string;
  password : string;
}

const TABLE_NAME = 'proef';

export const getAllProef = async (): Promise<proef[]> => {
  return db(TABLE_NAME).select();
};

export const getProefById = async (id: number): Promise<proef | null> => {
  const proefs = await db(TABLE_NAME).where('id', id).select();
  return proefs.length ? proefs[0] : null;
};

export const createProef = async (proef: proef): Promise<proef | null> => {
  try {
    const [createdProef] = await db(TABLE_NAME)
      .insert({
        mail: proef.mail,
        password: proef.password,
        name: proef.name,
        matricule: proef.matricule,
        numero_tlf: proef.numero_tlf
      })
      .returning('*');

    return createdProef || null;
  } catch (error) {
    throw error;
  }
};




export const updateProef = async (id: number, proef: proef): Promise<proef | null> => {
  const [updatedProef] = await db(TABLE_NAME).where('id', id).update(proef).returning('*');
  return updatedProef || null;
};

export const deleteProef = async (id: number): Promise<number> => {
  return db(TABLE_NAME).where('id', id).delete();
};
export const getProefByMail = async (mail: string): Promise<proef | null> => {
  // const proef = await db(TABLE_NAME).whereRaw('LOWER("mail") = ?', mail.toLowerCase()).first();
  const proef = await db(TABLE_NAME).whereRaw('LOWER("mail") = ?', mail.toLowerCase()).first();
  return proef || null;
};




export const deleteAllProef = async (): Promise<number> => {
  return db(TABLE_NAME).del();
};

