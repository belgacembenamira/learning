/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 16/08/2023 - 15:44:06
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 16/08/2023
    * - Author          : belgacem
    * - Modification    : 
**/

import { useState } from "react";
import { Container, Button ,Form } from "react-bootstrap";

const RegisterAdmin = () => {

  const [formData, setFormData] = useState({
    mail: '',
    password: '',
    name: '',
    tlf: '',
  });

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Your registration logic here
  };

  return (
    <Container>
    <div className="d-flex justify-content-center mt-4">
      <Form className="w-100" onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="mail"
            value={formData.mail}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Tlf</Form.Label>
          <Form.Control
            type="text"
            name="tlf"
            value={formData.tlf}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Button type="submit" variant="primary" className="w-100">
          Register
        </Button>
      </Form>
    </div>
  </Container>
  );
};

export default RegisterAdmin;
