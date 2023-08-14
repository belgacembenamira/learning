/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 13/08/2023 - 20:44:35
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 13/08/2023
    * - Author          : belgacem
    * - Modification    : 
**/
import { NextFunction, Request, Response } from "express";
import * as ProefModel from "../models/Proef";
import { proef } from '../models/Proef';

export const getAllProefController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const proefs = await ProefModel.getAllProef();
    res.json(proefs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error while fetching all proef" });
  }
};

export const getProefByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    const proef = await ProefModel.getProefById(id);
    if (proef) {
      res.json(proef);
    } else {
      res.status(404).json({ error: "Proef not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error while fetching proef" });
  }
};

export const createProefController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newProef: ProefModel.proef = req.body;
    const createdProef = await ProefModel.createProef(newProef);

    res.json(createdProef);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error while creating a new proef" });
  }
};

export const updateProefController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const updatedProef: ProefModel.proef = req.body;

    const proef = await ProefModel.updateProef(id, updatedProef);
    if (proef) {
      res.json(proef);
    } else {
      res.status(404).json({ error: "Proef not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error while updating proef" });
  }
};

export const deleteProefController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    const deletedCount = await ProefModel.deleteProef(id);
    if (deletedCount > 0) {
      res.json({ message: "Proef deleted successfully" });
    } else {
      res.status(404).json({ error: "Proef not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error while deleting proef" });
  }
};
