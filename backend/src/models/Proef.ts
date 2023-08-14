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
}

const TABLE_NAME = 'proef';

export const getAllProef = async (): Promise<proef[]> => {
  return db(TABLE_NAME).select();
};

export const getProefById = async (id: number): Promise<proef | null> => {
  const proefs = await db(TABLE_NAME).where('id', id).select();
  return proefs.length ? proefs[0] : null;
};

export const createProef = async (proef: proef): Promise<proef> => {
  try {
    const [createdProef] = await db(TABLE_NAME).insert(proef).returning('*');
    return createdProef;
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
