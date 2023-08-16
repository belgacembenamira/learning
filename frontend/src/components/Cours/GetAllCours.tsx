/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 15/08/2023 - 12:59:33
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 15/08/2023
    * - Author          : belgacem
    * - Modification    : 
**/
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Typography } from '@mui/material';
import { Delete, Edit, Visibility } from '@mui/icons-material';

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
      <Container maxWidth="lg" style={{ marginTop: '2rem', padding: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Liste des cours
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nom du cours</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Prix</TableCell>
              <TableCell>Disponibilité</TableCell>
              <TableCell>Instructeur</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell>{course.name}</TableCell>
                <TableCell>{course.description}</TableCell>
                <TableCell>${course.price}</TableCell>
                <TableCell>{course.availability}</TableCell>
                <TableCell>{course.instructor}</TableCell>
                <TableCell>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleViewCourse(course)}
                      startIcon={<Visibility />}
                    >
                      Voir
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDeleteCourse(course)}
                      startIcon={<Delete />}
                    >
                      Supprimer
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleEditCourse(course)}
                      startIcon={<Edit />}
                    >
                      Modifier
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        color="primary"
        onClick={handleCreateCourse}
        style={{ marginTop: '1rem' }}
      >
        Créer un cours
      </Button>
    </Container>
    </div>

  );
};

export default GetAllCourses;
