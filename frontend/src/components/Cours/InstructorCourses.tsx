/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 21/08/2023 - 15:58:41
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 21/08/2023
    * - Author          : belgacem
    * - Modification    : 
**/
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Table } from 'react-bootstrap'; // Assurez-vous d'importer correctement la bibliothèque de composants

interface Course {
  id: number;
  name: string;
  description: string;
  duration: number; // Ajoutez la propriété de durée si nécessaire
  price: number;
  availability: string;
  instructor: string;
}

const InstructorCourses: React.FC = () => {
  const { instructor } = useParams();

  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchAllCourses = async () => {
      try {
        const response = await fetch('http://localhost:5000/courses/');
        if (response.ok) {
          const data = await response.json();
          setCourses(data);
        } else {
          console.error('Failed to fetch all courses:', response);
        }
      } catch (error) {
        console.error('Error while fetching all courses:', error);
      }
    };

    fetchAllCourses();
  }, []);

  useEffect(() => {
    const filtered = courses.filter(
      (course) =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        course.instructor === instructor
    );
    setFilteredCourses(filtered);
  }, [courses, instructor, searchTerm]);

  return (
    <div className="container my-5">
      <h2>Courses by Instructor: {instructor}</h2>
      <input
        type="text"
        placeholder="Search course..."
        className="form-control my-3"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Price</th>
            <th>Availability</th>
          </tr>
        </thead>
        <tbody>
          {filteredCourses.map((course) => (
            <tr key={course.id}>
              <td>{course.name}</td>
              <td>{course.description}</td>
              <td>{course.duration}</td>
              <td>${course.price}</td>
              <td>{course.availability}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default InstructorCourses;
