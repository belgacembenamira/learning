/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 13/08/2023 - 21:00:01
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 13/08/2023
    * - Author          : belgacem
    * - Modification    : 
**/
// controllers/AdminController.ts
import { NextFunction, Request, Response } from "express";
import * as AdminModel from "../models/Admin";

export const getAllAdminsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const admins = await AdminModel.getAllAdmins();
    res.json(admins);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error while fetching all admins" });
  }
};

export const getAdminByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    const admin = await AdminModel.getAdminById(id);
    if (admin) {
      res.json(admin);
    } else {
      res.status(404).json({ error: "Admin not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error while fetching admin" });
  }
};

export const createAdminController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newAdmin: AdminModel.Admin = req.body;
    const createdAdmin = await AdminModel.createAdmin(newAdmin);

    res.json(createdAdmin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error while creating a new admin" });
  }
};

export const updateAdminController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const updatedAdmin: AdminModel.Admin = req.body;

    const admin = await AdminModel.updateAdmin(id, updatedAdmin);
    if (admin) {
      res.json(admin);
    } else {
      res.status(404).json({ error: "Admin not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error while updating admin" });
  }
};

export const deleteAdminController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    const deletedCount = await AdminModel.deleteAdmin(id);
    if (deletedCount > 0) {
      res.json({ message: "Admin deleted successfully" });
    } else {
      res.status(404).json({ error: "Admin not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error while deleting admin" });
  }
};
