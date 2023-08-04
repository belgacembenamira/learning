"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
const express_1 = require("express");
const CoursController_1 = require("../controllers/CoursController");
const UserController_1 = require("../controllers/UserController");
const router = (0, express_1.Router)();
/***********************course ****************************** */
router.get("/courses", CoursController_1.getAllCoursesController);
router.get("/courses/:id", CoursController_1.getCourseByIdController);
router.post("/courses", CoursController_1.createCourseController);
router.put("/courses/:id", CoursController_1.updateCourseController);
router.delete("/courses/:id", CoursController_1.deleteCourseController);
/*********************user */
router.get("/users", UserController_1.getAllUsersController);
router.get("/users/:id", UserController_1.getUserByIdController);
router.post("/users", UserController_1.createUserController);
router.put("/users/:id", UserController_1.updateUserController);
router.delete("/users/:id", UserController_1.deleteUserController);
exports.default = router;
