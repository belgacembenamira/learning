/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 03/08/2023 - 11:18:45
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 03/08/2023
    * - Author          : belgacem
    * - Modification    : 
**/
import { Request, Response } from 'express';
import { Course, getAllCourses, getCourseById, createCourse, updateCourse, deleteCourse } from '../models/Cours';

export const getAllCoursesController = async (req: Request, res: Response): Promise<void> => {
  try {
    const courses = await getAllCourses();
    res.status(200).json(courses);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to get courses.' });
  }
};

export const getCourseByIdController = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    res.status(400).json({ message: 'Invalid course ID.' });
    return;
  }

  try {
    const course = await getCourseById(id);
    if (course) {
      res.status(200).json(course);
    } else {
      res.status(404).json({ message: 'Course not found.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to get course.' });
  }
};

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
export const createCourseController = async (req: Request, res: Response): Promise<void> => {
  const course: Course = req.body;

  if (!course.name) {
    res.status(400).json({ message: 'Course name is required.' });
    return;
  }

  try {
    const createdCourse = await createCourse(course);
    res.status(201).json(createdCourse);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to create course.', error: error });
  }
};

export const updateCourseController = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    res.status(400).json({ message: 'Invalid course ID.' });
    return;
  }

  const course: Course = req.body;

  if (!course.name) {
    res.status(400).json({ message: 'Course name is required.' });
    return;
  }

  try {
    const updatedCourse = await updateCourse(id, course);
    if (updatedCourse) {
      res.status(200).json(updatedCourse);
    } else {
      res.status(404).json({ message: 'Course not found.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to update course.', error });
  }
};

export const deleteCourseController = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    res.status(400).json({ message: 'Invalid course ID.' });
    return;
  }

  try {
    const rowsAffected = await deleteCourse(id);
    if (rowsAffected) {
      res.status(200).json({ message: 'Course deleted successfully.' });
    } else {
      res.status(404).json({ message: 'Course not found.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete course.' });
  }
};
