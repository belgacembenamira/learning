/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 12/08/2023 - 20:32:43
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 12/08/2023
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
  image_url: string; // Add the image_url property
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
    <div className="bg-light py-5">
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-8">
            <div className="card p-4">
              <h1>{course.name}</h1>
              <p className="lead">{course.description}</p>
              <p><strong>Duration:</strong> {course.duration}</p>
              <p><strong>Difficulty:</strong> {course.difficulty}</p>
              <p><strong>Category:</strong> {course.category}</p>
              <p><strong>Price:</strong> ${course.price}</p>
              <p><strong>Availability:</strong> {course.availability}</p>
              {/* Add more course details here as needed */}
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <img
                src={course.image_url} // Use the image_url from the API
                className="card-img-top"
                alt={course.name}
              />
              <div className="card-body">
                <h5 className="card-title"><strong>Instructor:</strong> {course.instructor}</h5>
                <p className="card-text"><strong>Language:</strong> {course.language}</p>
                {/* Add more instructor details or other course-related information */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};





export default CourseDetail;

