/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 07/08/2023 - 11:03:48
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 07/08/2023
    * - Author          : belgacem
    * - Modification    : 
**/
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function UpdateCourse() {
  const { id } = useParams(); // Get the course ID from the URL parameter
  const navigate = useNavigate(); // Corrected typo

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

    // Fetch the course data when the component mounts
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
      // Redirect to the course details page after successful update
      navigate(`/course-details/${id}`); // Corrected typo
    } catch (error) {
      console.error('Erreur lors de la mise à jour du cours :', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1>Modifier le cours</h1>
      <form onSubmit={handleSubmit}>
        {/* Add input fields here for each property of the course */}
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
        {/* Add other input fields for other properties */}
        <button type="submit" className="btn btn-primary">
          Mettre à jour
        </button>
      </form>
    </div>
  );
}
