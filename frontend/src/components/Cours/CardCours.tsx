/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 12/08/2023 - 20:24:08
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 12/08/2023
    * - Author          : belgacem
    * - Modification    : 
**/
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

interface Course {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string; // Use "image_url" to match the API response
}

export default function CardCours() {
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
    <div className="container">
      <div className="row">
        {courses.map((course) => (
          <div key={course.id} className="col-md-4 mb-4">
            <Card style={{ height: '100%' }}>
              <div style={{ height: '250px', overflow: 'hidden' }}>
                <Card.Img
                  variant="top"
                  src={course.image_url}
                  alt={course.name}
                  style={{ objectFit: 'cover', height: '100%', width: '100%' }}
                />
              </div>
              <Card.Body>
                <Card.Title className="mb-2">
                  <strong>Nom du cours:</strong> {course.name}
                </Card.Title>
                <Card.Text className="mb-3">
                  <strong>Description:</strong> {course.description}
                </Card.Text>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <span className="font-weight-bold">Prix:</span> {course.price} $
                  </div>
                  <Button
                    variant="primary"
                    onClick={() => handleViewDetails(course.id)} // Call the function with course ID
                  >
                    Voir les détails
                  </Button>
                </div>
              </Card.Body>
              

            </Card>
          </div>
        ))}
      </div>
    </div>
  );

}

