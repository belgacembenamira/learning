/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 30/08/2023 - 14:03:03
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 30/08/2023
    * - Author          : belgacem
    * - Modification    : 
**/
// index.tsx
import React from 'react';
import { useRoutes, Route, useNavigate, Outlet } from 'react-router-dom';
import AdminList from '../components/Admin/AdminList';
import CommandeList from '../components/Command/CommandeList';
import CourseList from '../components/Cours/GetAllCours';
import jwtDecode from 'jwt-decode';
import AuthGuard from '../AuthGuard';



export const Index: React.FC = () => {
  const isAuthenticated = checkIfUserIsAuthenticated();

  return useRoutes([
    {
      element: (
        <AuthGuard isAuthenticated={isAuthenticated}>
            <Outlet/>
        </AuthGuard>
        
           
      ),
      children:[
        { path:"/protected-courses" ,element:<CourseList /> },
        { path:"/AllCommande" ,element:<CommandeList /> },
        { path:"/Admin" ,element:<AdminList /> }
      ]
    },
  ]);
};

function checkIfUserIsAuthenticated() {
  const jwtToken = localStorage.getItem('authToken');

  if (jwtToken) {
    try {
      const decodedToken: any = jwtDecode(jwtToken);
      const currentTime = Date.now() / 1000;

      return decodedToken.exp > currentTime;
    } catch (error) {
      console.error(error);
      return false;
    }
  } else {
    return false;
  }
}
