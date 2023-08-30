/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 28/08/2023 - 12:05:51
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 28/08/2023
    * - Author          : belgacem
    * - Modification    : 
**/
import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

interface Course {
  id: number;
  name: string;
  description: string;
  price: number;
  availability: string;
  instructor: string;
  category: string;
}

function CustomNavbar() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);

  useEffect(() => {
    // Fetch courses when component mounts
    console.log('hello²')
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

  useEffect(() => {
    console.log('hellokkkkkkkkkkkkk')

    try {
      // Filter courses based on searchQuery whenever it changes
      const filteredResults = courses.filter((course: Course) =>
        course.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCourses(filteredResults);
    } catch (error) {
      console.error('Error filtering courses:', error);
    }
  }, [searchQuery, courses]);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const inputValue = formData.get('searchQuery') as string;
    setSearchQuery(inputValue);
  };
  


  return (

    <div>
      <Navbar expand="lg" className="navbar-wrapper bg-primary py-3">
        <Container>
          <Navbar.Brand href="/" className="text-light d-flex align-items-center">
            <img
              src={require('../assest/logo.png')}
              alt="Logo"
              className="logo mr-2"
              style={{ width: '100px', height: 'auto', marginRight: '10px' }} />
            <span className="font-weight-bold">My App</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto text-light d-flex justify-content-between align-items-center w-100">
              <NavDropdown title="Professeur" id="professorDropdown">
                <NavDropdown.Item href="/loginProef">Login</NavDropdown.Item>
                <NavDropdown.Item href="/registerProef">Register</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="User" id="userDropdown">
                <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                <NavDropdown.Item href="/register">Register</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="/loginAdmin">Admin</Nav.Link>
              <Nav.Link href="/contact">Contact</Nav.Link>
              <Nav.Link href="/faq">FAQ</Nav.Link>
              <Form className="form-inline d-flex" onSubmit={handleSearch}>
                <FormControl type="text" name="searchQuery" placeholder="Rechercher un cours" className="mr-sm-2" />
                <Button type="submit" variant="outline-light">
                  <FontAwesomeIcon icon={faSearch} />
                </Button>
              </Form>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div />

    </div>
  );
}


export default CustomNavbar;
