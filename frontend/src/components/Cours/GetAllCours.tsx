/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 07/08/2023 - 10:42:04
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 07/08/2023
    * - Author          : belgacem
    * - Modification    : 
**/
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function GetAllCours() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/courses/');
        setCourses(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des cours :', error);
      }
    };

    // Appeler la fonction pour effectuer la requête GET lors du rendu initial
    fetchCourses();
  }, []);

  // Interface pour représenter la structure d'un cours
  interface Course {
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
  }

  const navigate = useNavigate();

  const handleViewCourse = (course: Course) => {
    alert(`Voir le cours "${course.name}"`);
  };

  const handleDeleteCourse = (course: Course) => {
    alert(`Supprimer le cours "${course.name}"`);
  };

  const handleEditCourse = (course: Course) => {
    // Naviguer vers le composant de modification avec l'ID du cours comme paramètre d'URL
    navigate(`/edit-course/${course.id}`);
  };

  return (
    <div>
      <h1>Liste des cours</h1>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Nom du cours</th>
            <th>Description</th>
            <th>Durée</th>
            <th>Difficulté</th>
            <th>Catégorie</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.name}</td>
              <td>{course.description}</td>
              <td>{course.duration}</td>
              <td>{course.difficulty}</td>
              <td>{course.category}</td>
              <td>
                <button
                  className="btn btn-primary mr-2"
                  onClick={() => handleViewCourse(course)}
                >
                  Voir
                </button>
                <button
                  className="btn btn-danger mr-2"
                  onClick={() => handleDeleteCourse(course)}
                >
                  Supprimer
                </button>
                <button
                  className="btn btn-warning"
                  onClick={() => handleEditCourse(course)}
                >
                  Modifier
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
