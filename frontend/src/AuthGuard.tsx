/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 30/08/2023 - 13:04:12
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 30/08/2023
    * - Author          : belgacem
    * - Modification    : 
**/
import jwtDecode from 'jwt-decode';
import React from 'react';
import { Navigate, redirect, useNavigate } from 'react-router-dom';

type AuthGuardPropsType = {
  children: JSX.Element;
  isAuthenticated: boolean; // Assurez-vous que cette propriété est définie ici
};

export default function AuthGuard({ children, isAuthenticated }: AuthGuardPropsType) {
    // redirect ('/loginAdmin')
     const navigate = useNavigate();
    // alert("AuthGuard")
    
    // navigate('/loginAdmin');

    // return <Navigate to={"/loginAdmin"}/>
   
    
    
    // return null;
    if (false) {
      return <>{children}</>;
    } else {
        return <Navigate to={"/loginAdmin"}/>
    }
  }
