/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 15/08/2023 - 12:27:22
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 15/08/2023
    * - Author          : belgacem
    * - Modification    : 
**/
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Card,
  TextField,
  TextareaAutosize,
  Button,
  Grid,
  Typography,
  MenuItem,
  Select,
  InputLabel
} from '@mui/material';

const CreateCourse: React.FC = () => {
  const navigate = useNavigate();

  const initialCourseState = {
    name: '',
    description: '',
    price: 0,
    image_url: '',
    availability: '',
    instructor: '',
    category: '',
  };
  interface Instructor {
    name: string;
  }

  const [course, setCourse] = useState(initialCourseState);
  const [instructors, setInstructors] = useState<Instructor[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any) => {
    const { name, value } = e.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));
  };

  useEffect(() => {
    // Fetch the list of instructors from the API
    axios.get('http://localhost:5000/proefs/')
      .then(response => {
        setInstructors(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des instructeurs:', error);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/courses/', course);
      if (response.status === 201) {
        navigate('/');
      } else {
        console.error('Erreur lors de l\'ajout du cours:');
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout du cours:', error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: '2rem', backgroundColor: '#f4f4f4', padding: '2rem' }}>
      <Card variant="outlined" sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom style={{ color: 'red', textAlign: 'center' }}>
          Ajouter  cours
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Nom du cours"
                fullWidth
                name="name"
                value={course.name}
                onChange={handleChange}
                variant="outlined" // Add this to use outlined style
              />
            </Grid>
            <Grid item xs={12}>
              <TextareaAutosize
                minRows={3}
                placeholder="Description"
                name="description"
                value={course.description}
                onChange={handleChange}
                style={{ marginTop: '1rem', width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} // Custom styling for the textarea
              />
            </Grid>
            <Grid container spacing={3}>

              <Grid item xs={12}>
                <TextField
                  label="image_url"
                  type="string"
                  fullWidth
                  name="image_url"
                  value={course.image_url}
                  onChange={handleChange}
                  variant="outlined" // Add this to use outlined style
                />
              </Grid>
              {/* ... (autres champs) */}
              <Grid item xs={12}>
                <TextField
                  label="Prix"
                  type="number"
                  fullWidth
                  name="price"
                  value={course.price}
                  onChange={handleChange}
                  variant="outlined" // Add this to use outlined style
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="category"
                  type="text"
                  fullWidth
                  name="category"
                  value={course.category}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Disponibilité"
                  fullWidth
                  name="availability"
                  value={course.availability}
                  onChange={handleChange}
                  variant="outlined" // Add this to use outlined style
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel htmlFor="instructor-select" sx={{ marginBottom: '0.5rem' }}>
                  Sélectionner un instructeur
                </InputLabel>
                <Select
                  fullWidth
                  name="instructor"
                  value={course.instructor}
                  onChange={handleChange}
                  variant="outlined"
                  // Add style to align select field
                  sx={{ marginBottom: '1rem' }}
                  inputProps={{
                    id: 'instructor-select',
                  }}
                >
                  {instructors.map((instructor, index) => (
                    <MenuItem key={index} value={instructor.name}>{instructor.name}</MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12} sx={{ textAlign: 'center' }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  // Add style to center the button
                  sx={{ marginTop: '1rem' }}
                >
                  Ajouter
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Card>
    </Container>


  );
}

export default CreateCourse;
