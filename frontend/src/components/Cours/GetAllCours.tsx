/* eslint-disable react/jsx-no-undef */
/**
 * @description      :
 * @author           :
 * @group            :
 * @created          : 07/08/2023 - 10:42:04
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 07/08/2023
 * - Author          :
 * - Modification    :
 **/
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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

    notifySuccess(`Voir le cours "${course.name}"`);
    console.log(`Voir le cours "${course.name}"`);
    navigate(`/course-details/${course.id}`);
  }
  
  const handleDeleteCourse = (course: Course) => {
    console.log('Supprimer le cours', course.name); // Ajoutez cette ligne
    notifyInfo(`Supprimer le cours "${course.name}"`);
    navigate(`/delete-course/${course.id}`);
  };
  
  const handleEditCourse = (course: Course) => {
    notifyInfo(`/edit-course/${course.id}`);
    navigate(`/edit-course/${course.id}`);
  };

  const handleCreateCourse = () => {
    notifyInfo("Create Course")
    navigate('/create-course');
  };

  const notifySuccess = (message: string) => {
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 5000,
      hideProgressBar: true,
      closeButton: true,
    });
  };

  const notifyInfo = (message: string) => {
    toast.info(message, {
      position: toast.POSITION.TOP_LEFT, // Position en haut à gauche
      autoClose: 5000, // 
      hideProgressBar: true,
      closeButton: true,
    });
  };
  

  return (
    <><ToastContainer /><div>
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
                  className="btn btn-primary mr-2 m-1"
                  onClick={() => handleViewCourse(course)}
                >
                  Voir
                </button>
                <button
                  className="btn btn-danger mr-2 m-1"
                  onClick={() => handleDeleteCourse(course)}
                >
                  Supprimer
                </button>
                <button
                  className="btn btn-warning m-1"
                  onClick={() => handleEditCourse(course)}
                >
                  Modifier
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-primary mb-3" onClick={handleCreateCourse}>
        Créer un cours
      </button>
    </div></>
  );
}
