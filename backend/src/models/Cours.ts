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
  description: string;
  duration: string;
  difficulty: string;
  category: string;
  prerequisites: string[];
  learningObjectives: string[];
  materials: string[];
  instructor: string;
  evaluationMethod: string;
  price: number;
  availability: string;
  certificates: boolean;
  interactive: boolean;
  language: string;
  lien_courses : string;
  image_url : string;
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
  try {
    const updatedRows = await db(TABLE_NAME).where('id', id).update(course);

    if (updatedRows > 0) {
      const updatedCourse = await db(TABLE_NAME).where('id', id).first();
      return updatedCourse || null;
    } else {
      return null; // Aucune mise à jour effectuée, le cours n'a pas été trouvé
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour du cours :', error);
    throw error; // Rejette l'erreur pour que la couche supérieure la gère
  }
};


export const deleteCourse = async (id: number): Promise<number> => {
  return db(TABLE_NAME).where('id', id).delete();
};
