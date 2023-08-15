/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 15/08/2023 - 13:47:46
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 15/08/2023
    * - Author          : belgacem
    * - Modification    : 
**/
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, CircularProgress } from '@mui/material';
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
    <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <CircularProgress style={{ marginBottom: '1rem' }} />
        <Typography variant="h6">Deleting Course</Typography>
        <Typography variant="body2" color="textSecondary">
          This course is being deleted...
        </Typography>
      </div>
    </Container>
  );
};

export default DeleteCourse;
