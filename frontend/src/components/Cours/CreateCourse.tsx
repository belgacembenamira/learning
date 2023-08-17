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
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Card,
  TextField,
  TextareaAutosize,
  Button,
  Grid,
  Typography
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
  };

  const [course, setCourse] = useState(initialCourseState);

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
      label="Disponibilité"
      fullWidth
      name="availability"
      value={course.availability}
      onChange={handleChange}
      variant="outlined" // Add this to use outlined style
    />
  </Grid>
  <Grid item xs={12}>
    <TextField
      label="Instructeur"
      fullWidth
      name="instructor"
      value={course.instructor}
      onChange={handleChange}
      variant="outlined" // Add this to use outlined style
    />
  </Grid>
  <Grid item xs={12} sx={{ marginTop: '1rem', textAlign: 'center' }}>
    <Button
      type="submit"
      variant="contained"
      color="primary"
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
