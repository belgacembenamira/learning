/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 17/08/2023 - 12:10:45
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 17/08/2023
    * - Author          : belgacem
    * - Modification    : 
**/
import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  TableContainer,
  Paper,
} from '@mui/material';
import { Edit, Delete, Visibility } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer if needed
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Course {
  id: number;
  name: string;
  description: string;
  price: number;
  availability: string;
  instructor: string;
  category : string;
}





const CourseList: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);

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
  const navigate = useNavigate();


  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      <Typography variant="h4" gutterBottom style={{ color: 'red', textAlign: 'center' }}>
        Liste des cours
      </Typography>
  
      <div style={{ marginBottom: '1rem', padding: '8px', textAlign: 'center' }}>
        <input
          type="text"
          placeholder="Chercher par nom du cours"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: '100%', padding: '8px' }}
        />
      </div>
  
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nom du cours</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Prix</TableCell>
              <TableCell>Disponibilité</TableCell>
              <TableCell>Instructeur</TableCell>
              <TableCell>category</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCourses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6}>Aucun cours trouvé.</TableCell>
              </TableRow>
            ) : (
              filteredCourses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell>{course.name}</TableCell>
                  <TableCell>{course.description}</TableCell>
                  <TableCell>${course.price}</TableCell>
                  <TableCell>{course.availability}</TableCell>
                  <TableCell>{course.instructor}</TableCell>
                  <TableCell>{course.category}</TableCell>
                  <TableCell>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <Button
                        className="action-button"
                        variant="contained"
                        color="primary"
                        onClick={() => handleViewCourse(course)}
                        startIcon={<Visibility />}
                      >
                        Voir
                      </Button>
                      <Button
                        className="action-button"
                        variant="contained"
                        color="secondary"
                        onClick={() => handleDeleteCourse(course)}
                        startIcon={<Delete />}
                      >
                        Supprimer
                      </Button>
                      <Button
                        className="action-button"
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
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
  
      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateCourse}
        >
          Créer un cours
        </Button>
      </div>
    </Container>
  </div>
  
  );
};

export default CourseList;
