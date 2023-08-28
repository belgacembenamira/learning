/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 15/08/2023 - 12:30:37
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 15/08/2023
    * - Author          : belgacem
    * - Modification    : 
**/
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Button, Grid } from '@mui/material';

interface Course {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
}

function CardCours() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/courses/'); // Replace with your API endpoint
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    // Call the function to perform the GET request during the initial render
    fetchCourses();
  }, []);

  const navigate = useNavigate();

  const handleViewDetails = (id: number) => {
    navigate(`/course-details/${id}`);
  };

  return (
    <div className="container m-2 p-2 ">
      <Grid container spacing={3}>
        {courses.map((course) => (
          <Grid key={course.id} item xs={12} md={4}>
            <Card>
              <CardMedia
                component="img"
                style={{
                  maxHeight: '100%',
                  width: '100%',
                  objectFit: 'cover',
                }}
                src={course.image_url}
                alt={course.name}
                title={course.name} // Titre de l'image pour l'accessibilité
                loading="lazy" // Chargement paresseux de l'image
              />


              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {course.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {course.description}
                </Typography>
                <div style={{ marginTop: '1rem' }}>
                  <Typography variant="subtitle1" color="primary">
                    Prix: {course.price} $
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleViewDetails(course.id)} // Call the function with course ID
                    style={{ marginTop: '0.5rem' }}
                  >
                    Voir les détails
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
export default CardCours;
