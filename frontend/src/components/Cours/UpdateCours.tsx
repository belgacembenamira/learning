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
import { Container, Card, CardContent, Typography, TextField, Button } from '@mui/material';


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
    <div style={{ backgroundColor: '#e9edf0', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>

      <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
        <Card>
          <CardContent>
          <Typography variant="h4" gutterBottom style={{ textAlign: 'center', color: '#2e7de6' }}>
                Modifier le cours
              </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Nom du cours"
                name="name"
                value={course.name}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                required
              />
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={course.description}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                multiline
                rows={4}
                required
              />
              <TextField
                fullWidth
                label="Durée"
                name="duration"
                value={course.duration}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                required
              />
              {/* Ajoutez d'autres champs ici */}
              <TextField
                fullWidth
                label="Prix"
                name="price"
                value={course.price}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                required
              />
              <TextField
                fullWidth
                label="Disponibilité"
                name="availability"
                value={course.availability}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                required
              />
              <div className="text-center mt-3">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{
                    marginTop: '1rem',
                    display: 'block', // To center the button
                    marginLeft: 'auto', // Center horizontally
                    marginRight: 'auto', // Center horizontally
                  }}
                >
                  Mettre à jour
                </Button>
                </div>
            </form>

          </CardContent>
        </Card>
      </Container>

    </div>
  );

}
