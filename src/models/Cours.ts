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
import db from '../config/db';

export interface Course {
  id: number;
  name: string;
}

const TABLE_NAME = 'courses';

export const getAllCourses = async (): Promise<Course[]> => {
  return db(TABLE_NAME).select();
};

export const getCourseById = async (id: number): Promise<Course | null> => {
  const courses = await db(TABLE_NAME).where('id', id).select();
  return courses.length ? courses[0] : null;
};

export const createCourse = async (course: Course): Promise<Course> => {
  try {
    const [createdCourse] = await db(TABLE_NAME).insert(course).returning('*');
    return createdCourse;
    
  } catch (error) {
    throw error
  }
};

export const updateCourse = async (id: number, course: Course): Promise<Course | null> => {
  const [updatedCourse] = await db(TABLE_NAME).where('id', id).update(course).returning('*');
  return updatedCourse || null;
};

export const deleteCourse = async (id: number): Promise<number> => {
  return db(TABLE_NAME).where('id', id).delete();
};
