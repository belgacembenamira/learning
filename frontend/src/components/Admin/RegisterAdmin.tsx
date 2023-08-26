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
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
} from '@mui/material';
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

  return  (
    <Container>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Registration
        </Typography>
        <TextField
          label="Email"
          type="email"
          name="mail"
          value={formData.mail}
          onChange={handleInputChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Tlf"
          type="text"
          name="tlf"
          value={formData.tlf}
          onChange={handleInputChange}
          required
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Register
        </Button>
      </form>
    </Box>
  </Container>
  );
};

export default RegisterAdmin;
