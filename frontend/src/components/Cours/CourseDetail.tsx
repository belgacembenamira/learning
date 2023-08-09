/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 07/08/2023 - 14:42:18
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 07/08/2023
    * - Author          : belgacem
    * - Modification    : 
**/
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Interface to represent the type of the 'course' prop
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

const CourseDetail: React.FC = () => {
  const { id } = useParams(); // Get the course ID from the URL parameter
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
    return <div>Loading...</div>; // Add a loading state while fetching the data
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8">
          <h1>{course.name}</h1>
          <p className="lead">{course.description}</p>
          <p>Duration: {course.duration}</p>
          <p>Difficulty: {course.difficulty}</p>
          <p>Category: {course.category}</p>
          <p>Price: ${course.price}</p>
          <p>Availability: {course.availability}</p>
          {/* Add more course details here as needed */}
        </div>
        <div className="col-md-4">
          <div className="card">
            <img
              src="https://via.placeholder.com/300"
              className="card-img-top"
              alt={course.name}
            />
            <div className="card-body">
              <h5 className="card-title">Instructor: {course.instructor}</h5>
              <p className="card-text">Language: {course.language}</p>
              {/* Add more instructor details or other course-related information */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
