"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCourse = exports.updateCourse = exports.createCourse = exports.getCourseById = exports.getAllCourses = void 0;
/**
    * @description      :
    * @author           : belgacem
    * @group            :
    * @created          : 03/08/2023 - 11:18:23
    *
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 03/08/2023
    * - Author          : belgacem
    * - Modification    :
**/
const db_1 = require("../config/db");
const TABLE_NAME = 'courses';
const getAllCourses = async () => {
    return (0, db_1.default)(TABLE_NAME).select();
};
exports.getAllCourses = getAllCourses;
const getCourseById = async (id) => {
    const courses = await (0, db_1.default)(TABLE_NAME).where('id', id).select();
    return courses.length ? courses[0] : null;
};
exports.getCourseById = getCourseById;
const createCourse = async (course) => {
    try {
        const [createdCourse] = await (0, db_1.default)(TABLE_NAME).insert(course).returning('*');
        return createdCourse;
    }
    catch (error) {
        throw error;
    }
};
exports.createCourse = createCourse;
const updateCourse = async (id, course) => {
    const [updatedCourse] = await (0, db_1.default)(TABLE_NAME).where('id', id).update(course).returning('*');
    return updatedCourse || null;
};
exports.updateCourse = updateCourse;
const deleteCourse = async (id) => {
    return (0, db_1.default)(TABLE_NAME).where('id', id).delete();
};
exports.deleteCourse = deleteCourse;
//# sourceMappingURL=Cours.js.map