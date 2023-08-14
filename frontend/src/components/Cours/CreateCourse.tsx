/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 12/08/2023 - 21:20:41
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 12/08/2023
    * - Author          : belgacem
    * - Modification    : 
**/
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateCourse: React.FC = () => {
  const navigate = useNavigate();

  interface Course {
    availability: string | number |  string[] | undefined;
    instructor: string | number |  string[] | undefined;
    name: string;
    description: string;
    price: number;
    image_url: string;
  }

  const initialCourseState: Course = {
    name: '',
    description: '',
    price: 0,
    image_url: '',
    availability: '',
    instructor: '',
  };

  const [course, setCourse] = useState<Course>(initialCourseState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/courses/', course);
      if (response.status === 201) {
        navigate('/');
      } else {
        console.error('Erreur lors de l\'ajout du cours:',);
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout du cours:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card bg-light p-4">
        <h1 className="mb-4">Ajouter un cours</h1>
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Nom du cours:
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={course.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description:
            </label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={course.description}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="image_url" className="form-label">
              URL de l'image:
            </label>
            <input
              type="text"
              className="form-control"
              id="image_url"
              name="image_url"
              value={course.image_url}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">
              Prix:
            </label>
            <input
              type="number"
              className="form-control"
              id="price"
              name="price"
              value={course.price}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="availability" className="form-label">
              Disponibilité:
            </label>
            <input
              type="text"
              className="form-control"
              id="availability"
              name="availability"
              value={course.availability}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="instructor" className="form-label">
              Instructeur:
            </label>
            <input
              type="text"
              className="form-control"
              id="instructor"
              name="instructor"
              value={course.instructor}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Ajouter
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;
