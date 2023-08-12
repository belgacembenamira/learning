/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 12/08/2023 - 21:42:04
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 12/08/2023
    * - Author          : belgacem
    * - Modification    : 
**/
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DeleteCourse = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const deleteCourse = async () => {
      try {
        // Make API request to delete the course with the given ID
        await axios.delete(`http://localhost:5000/courses/${id}`);
        // Redirect to the courses list page after successful deletion
        navigate('/courses');
      } catch (error) {
        console.error('Error deleting course:', error);
        // Display an error message or alert in case of an error
      }
    };

    // Call the function to delete the course when the component is mounted
    deleteCourse();
  }, [id, navigate]);

  return (
    <div className="container mt-5">
      <div className="alert alert-danger">
        <h4 className="alert-heading">Deleting Course</h4>
        <p>This course is being deleted...</p>
      </div>
    </div>
  );
};

export default DeleteCourse;
