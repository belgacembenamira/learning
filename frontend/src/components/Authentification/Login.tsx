/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 15/08/2023 - 12:19:34
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 15/08/2023
    * - Author          : belgacem
    * - Modification    : 
**/
import React, { useState } from 'react';
import { useLoginMutation } from '../../api';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { MDBIcon, MDBInput, MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage } from 'mdb-react-ui-kit';
import { Typography } from '@mui/material';

const Login: React.FC = () => {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading, isError }] = useLoginMutation();
  const navigate = useNavigate(); // Utilisez useNavigate pour la navigation

  const handleLogin = async () => {
    try {
      const credentials = { mail, password };
      await login(credentials);

      // Si la connexion réussit, naviguez vers la page souhaitée (par exemple, '/')
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <MDBContainer fluid>
      <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
              <Typography variant="h3" align="center" sx={{ fontWeight: 'bold', marginBottom: '2rem' }}>
                Connexion
              </Typography>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="envelope me-3" size='lg' />
                <div className="w-100">
                  <MDBInput
                    label='Votre Email'
                    id='form2'
                    type='email'
                    value={mail}
                    onChange={(e) => setMail(e.target.value)}
                    className="mb-0"
                    style={{ border: '1px solid #ced4da' }} // Ajoutez la bordure ici
                  />
                </div>
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="lock me-3" size='lg' />
                <div className="w-100">
                  <MDBInput
                    label='Mot de passe'
                    id='form3'
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mb-0"
                    style={{ border: '1px solid #ced4da' }} // Ajoutez la bordure ici
                  />
                </div>
              </div>



              <div className="d-flex justify-content-center">
                <MDBBtn color='primary' size='lg' onClick={handleLogin}>
                  Se connecter
                </MDBBtn>
              </div>
            </MDBCol>


            <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
              <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid />
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default Login;
