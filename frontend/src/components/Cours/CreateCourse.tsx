/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 07/08/2023 - 14:43:36
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 07/08/2023
    * - Author          : belgacem
    * - Modification    : 
**/
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface CreateCourseProps {
  // Ajoutez les éventuelles propriétés nécessaires ici
}

interface Course {
  id?: number;
  name: string;
  description: string;
  duration: string;
  difficulty: string;
  category: string;
  prerequisites: string[];
  learning_objectives: string[];
  materials: string[];
  instructor: string;
  evaluation_method: string;
  price: number;
  availability: string;
  language: string;
}

const CreateCourse: React.FC<CreateCourseProps> = () => {
  const navigate = useNavigate();

  const initialCourseState: Course = {
    name: '',
    description: '',
    duration: '',
    difficulty: '',
    category: '',
    prerequisites: [],
    learning_objectives: [],
    materials: [],
    instructor: '',
    evaluation_method: '',
    price: 0,
    availability: '',
    language: '',
  };

  const [course, setCourse] = useState<Course>(initialCourseState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Faire la requête API pour ajouter le cours
      const response = await axios.post('http://localhost:5000/courses/', course);
      // Vérifier que la réponse est valide et que le cours a été créé avec succès
      if (response.status === 201) {
        // Rediriger vers la liste des cours après l'ajout réussi
        navigate('/');
      } else {
        // Afficher un message d'erreur si la création a échoué
        console.error('Erreur lors de l\'ajout du cours :', response.data.message);
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout du cours :', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1>Ajouter un cours</h1>
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
        {/* Ajoutez ici d'autres champs de formulaire avec des classes Bootstrap */}
        <button type="submit" className="btn btn-primary">
          Ajouter
        </button>
      </form>
    </div>
  );
};

export default CreateCourse;
