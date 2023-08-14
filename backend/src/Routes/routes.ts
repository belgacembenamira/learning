/**
 * @description      :
 * @author           : belgacem
 * @group            :
 * @created          : 03/08/2023 - 11:19:39
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 03/08/2023
 * - Author          : belgacem
 * - Modification    :
 **/
import { Router } from "express";
import * as  cookieParser from "cookie-parser"; 

import {
  getAllCoursesController,
  getCourseByIdController,
  createCourseController,
  updateCourseController,
  deleteCourseController,
} from "../controllers/CoursController";
import {
  authenticateToken,
  createUserController,
  deleteUserController,
  getAllUsersController,
  getUserByIdController,
  
  login,
  
  register,
  
  updateUserController,
} from "../controllers/UserController";
import { createProefController, deleteProefController, getAllProefController, getProefByIdController, updateProefController } from "../controllers/ProefController";
import { getAllAdminsController, getAdminByIdController, createAdminController, updateAdminController, deleteAdminController } from "../controllers/AdminController";
import { getAllCommandesController, getCommandeByIdController, createCommandeController, updateCommandeController, deleteCommandeController } from "../controllers/CommandeController";

const router = Router();
// router.use(cookieParser());

/***********************course ****************************** */

// router.use(authenticateToken);


router.get("/courses", getAllCoursesController);
router.get("/courses/:id", getCourseByIdController);
router.post("/courses", createCourseController);
router.put("/courses/:id", updateCourseController);
router.delete("/courses/:id", deleteCourseController);
/*********************user ************************************/
router.get("/users", getAllUsersController);
router.get("/users/:id", getUserByIdController);
router.post("/users", createUserController);
router.put("/users/:id", updateUserController);
router.delete("/users/:id", deleteUserController);
/*********************Proef********************** */
router.get("/proefs", getAllProefController);
router.get("/proefs/:id", getProefByIdController);
router.post("/proefs", createProefController);
/*** put lazema naselha *************** */
router.put("/proefs/:id", updateProefController);
router.delete("/proefs/:id", deleteProefController);
/*************************Admin ************ */
router.get("/admins", getAllAdminsController);
router.get("/admins/:id", getAdminByIdController);
router.post("/admins", createAdminController);
router.put("/admins/:id", updateAdminController);
router.delete("/admins/:id", deleteAdminController);
/**********************command********** */
router.get("/commandes", getAllCommandesController);
router.get("/commandes/:id", getCommandeByIdController);
router.post("/commandes", createCommandeController);
router.put("/commandes/:id", updateCommandeController);
router.delete("/commandes/:id", deleteCommandeController);

/********************AUTH USER********************** */
router.post("/register", register);
router.post("/login", login);
export default router;

