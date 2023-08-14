/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 13/08/2023 - 21:31:43
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 13/08/2023
    * - Author          : belgacem
    * - Modification    : 
**/
// controllers/CommandeController.ts
import { NextFunction, Request, Response } from "express";
import * as CommandeModel from "../models/Commande";
import { createCommande } from "../models/Commande";
import Stripe from 'stripe';

export const getAllCommandesController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const commandes = await CommandeModel.getAllCommandes();
    res.json(commandes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error while fetching all commandes" });
  }
};

export const getCommandeByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    const commande = await CommandeModel.getCommandeById(id);
    if (commande) {
      res.json(commande);
    } else {
      res.status(404).json({ error: "Commande not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error while fetching commande" });
  }
};


const stripeSecretKey = 'sk_test_51MwFg1GRr5LN8XFFpv4lyuMd4hZRsQhBVp1xwXPMLu9GSPix42hk1KFyfeLHuZ7mxDOsSB1q4mxzHFt4ZRiF7UQm00RAuZhvJV';
const stripeClient = new Stripe(stripeSecretKey, {
  apiVersion: '2020-08-27', // Remplacez par la version d'API Stripe que vous utilisez
} as unknown as Stripe.StripeConfig); // Spécifiez le type de configuration explicitement

export const createCommandeController = async (req: Request, res: Response) => {
  try {
    const newCommande = req.body;

    // Créez une session de paiement avec Stripe et récupérez l'ID de session
    const session = await stripeClient.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: newCommande.name_command,
            },
            unit_amount: newCommande.price * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:5000/success',
      cancel_url: 'http://localhost:5000/canceled',
    });

    // Assurez-vous que l'ID de session est récupéré avec succès
    if (session && session.id) {
      // Ajoutez l'ID de session à la nouvelle commande
      newCommande.stripeSessionId = session.id;

      // Créez la commande dans la base de données en utilisant la fonction createCommande
      const createdCommande = await createCommande(newCommande);

      res.json(createdCommande);
    } else {
      throw new Error('Failed to create a Stripe session');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error while creating a new commande' + error });
  }
};


  
  
  
  

export const updateCommandeController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const updatedCommande: CommandeModel.Commande = req.body;

    const commande = await CommandeModel.updateCommande(id, updatedCommande);
    if (commande) {
      res.json(commande);
    } else {
      res.status(404).json({ error: "Commande not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error while updating commande" });
  }
};

export const deleteCommandeController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    const deletedCount = await CommandeModel.deleteCommande(id);
    if (deletedCount > 0) {
      res.json({ message: "Commande deleted successfully" });
    } else {
      res.status(404).json({ error: "Commande not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error while deleting commande" });
  }
};
