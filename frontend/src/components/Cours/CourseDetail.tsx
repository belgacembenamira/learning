/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 15/08/2023 - 12:05:09
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 15/08/2023
    * - Author          : belgacem
    * - Modification    : 
**/
import { Grid, CardMedia, CardContent, Typography, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Card, Button, Col, Row, Table } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

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
  image_url: string;
}

const CourseDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/courses/${id}`);
        if (response.ok) {
          const data = await response.json();
          setCourse(data);
        } else {
          console.error('Failed to fetch course details:', response);
        }
      } catch (error) {
        console.error('Error while fetching course details:', error);
      }
    };

    fetchCourseDetails();
  }, [id]);

  if (!course) {
    return <div>Loading...</div>;
  }


  return (
    <div className="container my-5">
  <Grid container justifyContent="center">
    <Grid item xs={12} lg={8}>
      <Card style={{ margin: '1rem', padding: '1rem' }}>
        <Row>
          <Col xs={12} md={6}>
            <CardMedia
              component="img"
              src={course.image_url}
              alt={course.name}
              style={{ maxHeight: '100%', width: '100%', objectFit: 'cover' }}
            />
          </Col>
          <Col xs={12} md={6}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                {course.name}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {course.description}
              </Typography>
              <TableContainer>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell><strong>Duration:</strong></TableCell>
                      <TableCell>{course.duration}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><strong>Difficulty:</strong></TableCell>
                      <TableCell>{course.difficulty}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><strong>Category:</strong></TableCell>
                      <TableCell>{course.category}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><strong>Price:</strong></TableCell>
                      <TableCell>${course.price}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><strong>Instructor:</strong></TableCell>
                      <TableCell>{course.instructor}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><strong>Language:</strong></TableCell>
                      <TableCell>{course.language}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><strong>Availability:</strong></TableCell>
                      <TableCell>{course.availability}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <div className="text-center mt-3">
                <Button
                  variant="contained"
                  color="primary"
                  style={{
                    marginRight: '8px',
                    backgroundColor: '#007bff', // Custom primary color
                    color: '#fff', // Text color
                  }}
                >
                  Add To Cart
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  style={{
                    marginLeft: '8px',
                    backgroundColor: '#dc3545', // Custom secondary color
                    color: '#fff', // Text color
                  }}
                >
                  Shop Now
                </Button>
              </div>
            </CardContent>
          </Col>
        </Row>
      </Card>
    </Grid>
  </Grid>
</div>

  
  );
};

export default CourseDetail;