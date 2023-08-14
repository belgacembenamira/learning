/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 13/08/2023 - 21:30:40
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 13/08/2023
    * - Author          : belgacem
    * - Modification    : 
**/
// models/Commande.ts
import db from '../config/db';

export interface Commande {

  id: number;
  name_command: string;
  name_user: string;
  numero_tlf_users: string;
  price: number;
  name_cours: string;
  stripeSessionId: any;
}

const TABLE_NAME = 'command';

export const getAllCommandes = async (): Promise<Commande[]> => {
  return db(TABLE_NAME).select();
};

export const getCommandeById = async (id: number): Promise<Commande | null> => {
  const commandes = await db(TABLE_NAME).where('id', id).select();
  return commandes.length ? commandes[0] : null;
};

export const createCommande = async (commande :Commande) => {
  try {
    const [createdCommande] = await db(TABLE_NAME)
      .insert(commande)
      .returning('*'); // Vous pouvez spécifier les colonnes que vous voulez retourner ici
  
    return createdCommande;
  } catch (error) {
    console.error('Error creating a new commande:', error);
    throw new Error('Failed to create a new commande.' + error);
  }
};
  
  

export const updateCommande = async (id: number, commande: Commande): Promise<Commande | null> => {
  const [updatedCommande] = await db(TABLE_NAME).where('id', id).update(commande).returning('*');
  return updatedCommande || null;
};

export const deleteCommande = async (id: number): Promise<number> => {
  return db(TABLE_NAME).where('id', id).delete();
};
