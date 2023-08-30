/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 30/08/2023 - 10:44:56
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 30/08/2023
    * - Author          : belgacem
    * - Modification    : 
**/
import React, { ComponentType, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const withAuth = <P extends object>(Component: ComponentType<P>): React.FC<P> => {
  const WithAuth: React.FC<P> = (props) => {
    const token = localStorage.getItem('authToken');
    const navigate = useNavigate();

    useEffect(() => {
      // Récupérer le token depuis le localStorage
      const storedToken = localStorage.getItem('token');
    
      if (!storedToken) {
        // Rediriger vers la page de connexion admin
        navigate('/loginAdmin');
      }
    }, [navigate]);
    // User is authorized, render the component
    return <Component {...props} />;
  };

  return WithAuth;
};

export default withAuth;
