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
import {
  getAllCoursesController,
  getCourseByIdController,
  createCourseController,
  updateCourseController,
  deleteCourseController,
} from "../controllers/CoursController";
import {
  createUserController,
  deleteUserController,
  getAllUsersController,
  getUserByIdController,
  login,
  updateUserController,
} from "../controllers/UserController";

const router = Router();
/***********************course ****************************** */

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
/********************AUTH USER********************** */
router.post("/login", login);

export default router;
