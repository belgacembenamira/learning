"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCourseController = exports.updateCourseController = exports.createCourseController = exports.getCourseByIdController = exports.getAllCoursesController = void 0;
const Cours_1 = require("../models/Cours");
const getAllCoursesController = async (req, res) => {
    try {
        const courses = await (0, Cours_1.getAllCourses)();
        res.status(200).json(courses);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to get courses.' });
    }
};
exports.getAllCoursesController = getAllCoursesController;
const getCourseByIdController = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        res.status(400).json({ message: 'Invalid course ID.' });
        return;
    }
    try {
        const course = await (0, Cours_1.getCourseById)(id);
        if (course) {
            res.status(200).json(course);
        }
        else {
            res.status(404).json({ message: 'Course not found.' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to get course.' });
    }
};
exports.getCourseByIdController = getCourseByIdController;
// export const createCourseController = async (req: Request, res: Response): Promise<void> => {
//   const course: Course = req.body;
//   if (!course.name) {
//     res.status(400).json({ message: 'Course name is required.' });
//     return;
//   }
//   try {
//     const createdCourse = await createCourse(course);
//     res.status(201).json(createdCourse);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: 'Failed to create course.     ',  error} ,);
//   }
// };
const createCourseController = async (req, res) => {
    const course = req.body;
    if (!course.name) {
        res.status(400).json({ message: 'Course name is required.' });
        return;
    }
    try {
        const createdCourse = await (0, Cours_1.createCourse)(course);
        res.status(201).json(createdCourse);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to create course.', error: error });
    }
};
exports.createCourseController = createCourseController;
const updateCourseController = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        res.status(400).json({ message: 'Invalid course ID.' });
        return;
    }
    const course = req.body;
    if (!course.name) {
        res.status(400).json({ message: 'Course name is required.' });
        return;
    }
    try {
        const updatedCourse = await (0, Cours_1.updateCourse)(id, course);
        if (updatedCourse) {
            res.status(200).json(updatedCourse);
        }
        else {
            res.status(404).json({ message: 'Course not found.' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to update course.', error });
    }
};
exports.updateCourseController = updateCourseController;
const deleteCourseController = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        res.status(400).json({ message: 'Invalid course ID.' });
        return;
    }
    try {
        const rowsAffected = await (0, Cours_1.deleteCourse)(id);
        if (rowsAffected) {
            res.status(200).json({ message: 'Course deleted successfully.' });
        }
        else {
            res.status(404).json({ message: 'Course not found.' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to delete course.' });
    }
};
exports.deleteCourseController = deleteCourseController;
//# sourceMappingURL=CoursController.js.map