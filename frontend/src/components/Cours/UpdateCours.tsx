/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 12/08/2023 - 21:51:36
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 12/08/2023
    * - Author          : belgacem
    * - Modification    : 
**/
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function UpdateCourse() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState({
    name: '',
    description: '',
    duration: '',
    difficulty: '',
    category: '',
    prerequisites: [],
    learningObjectives: [],
    materials: [],
    instructor: '',
    evaluationMethod: '',
    price: 0,
    availability: '',
    certificates: false,
    interactive: false,
    language: '',
    image_url: '',
  });

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/courses/${id}`);
        setCourse(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération du cours :', error);
      }
    };

    fetchCourse();
  }, [id]);

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
      await axios.put(`http://localhost:5000/courses/${id}`, course);
      navigate(`/course-details/${id}`);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du cours :', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card bg-light p-4">
        <h1 className="mb-4">Modifier le cours</h1>
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
            <label htmlFor="duration" className="form-label">
              Durée:
            </label>
            <input
              type="text"
              className="form-control"
              id="duration"
              name="duration"
              value={course.duration}
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
          <button type="submit" className="btn btn-primary">
            Mettre à jour
          </button>
        </form>
      </div>
    </div>
  );
}
