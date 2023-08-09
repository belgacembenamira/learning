/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 07/08/2023 - 11:58:08
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 07/08/2023
    * - Author          : belgacem
    * - Modification    : 
**/
// components/Users/DeleteUser.tsx
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const DeleteCourse = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const deleteUser = async () => {
      try {
        // Faire la requête API pour supprimer l'courses  avec l'ID donné
        await axios.delete(`http://localhost:5000/courses/${id}`);
        // Rediriger vers la liste des courses s après la suppression réussie
        navigate('/courses');
      } catch (error) {
        console.error('Erreur lors de la suppression de l\'courses  :', error);
        // Afficher un message d'erreur ou une alerte en cas d'erreur
      }
    };

    // Appeler la fonction pour supprimer courses  lorsque le composant est monté
    deleteUser();
  }, [id, navigate]);

  return (
    <div className="container mt-5">
      <p>Suppression de l'courses  en cours...</p>
    </div>
  );
};

export default DeleteCourse;
