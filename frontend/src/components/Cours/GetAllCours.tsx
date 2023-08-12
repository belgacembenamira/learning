/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 12/08/2023 - 20:38:44
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 12/08/2023
    * - Author          : belgacem
    * - Modification    : 
**/
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Course {
  id: number;
  name: string;
  description: string;
  duration: string;
  difficulty: string;
  category: string;
  price: number;
  availability: string;
  instructor: string;
  language: string;
  // Add more properties if needed
}

const GetAllCourses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/courses/');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const handleViewCourse = (course: Course) => {
    notifySuccess(`Voir le cours "${course.name}"`);
    navigate(`/course-details/${course.id}`);
  };

  const handleDeleteCourse = (course: Course) => {
    console.log('Supprimer le cours', course.name);
    notifyInfo(`Supprimer le cours "${course.name}"`);
    navigate(`/delete-course/${course.id}`);
  };

  const handleEditCourse = (course: Course) => {
    notifyInfo(`Modifier le cours "${course.name}"`);
    navigate(`/edit-course/${course.id}`);
  };

  const handleCreateCourse = () => {
    notifyInfo("Créer un cours");
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
      position: toast.POSITION.TOP_LEFT,
      autoClose: 5000,
      hideProgressBar: true,
      closeButton: true,
    });
  };

  return (
    <div>
      <ToastContainer />
      <div className="container">
        <h1>Liste des cours</h1>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>Nom du cours</th>
                <th>Description</th>
                <th>Durée</th>
                <th>Difficulté</th>
                <th>Catégorie</th>
                <th>Prix</th>
                <th>Disponibilité</th>
                <th>Instructeur</th>
                <th>Langue</th>
                <th>Actions</th>
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
                  <td>${course.price}</td>
                  <td>{course.availability}</td>
                  <td>{course.instructor}</td>
                  <td>{course.language}</td>
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
        <button className="btn btn-primary mb-3" onClick={handleCreateCourse}>
          Créer un cours
        </button>
      </div>
    </div>
  );
};

export default GetAllCourses;
