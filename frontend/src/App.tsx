/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 09/08/2023 - 15:04:38
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 09/08/2023
    * - Author          : belgacem
    * - Modification    : 
**/

import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import GetAllCours from './components/Cours/GetAllCours';
import UpdateCourse from './components/Cours/UpdateCours';
import CourseDetail from './components/Cours/CourseDetail';
import DeleteCourse from './components/Cours/DeleteCourse';
import CreateCourse from './components/Cours/CreateCourse';
import Login from './components/Authentification/Login';
import Register from './components/Authentification/Register';
import store from './api/Store';
import CardCours from './components/Cours/CardCours';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Routes>
          {/* Define your routes */}
          {/* Define a route for the GetAllCours component */}
          <Route path="/" element={<CardCours />} />
          <Route path="/courses" element={<GetAllCours />} />
          {/* Define a route for the UpdateCourse component */}
          <Route path="/edit-course/:id" element={<UpdateCourse />} />
          <Route path="/course-details/:id" element={<CourseDetail />} />
          {/* Define a route for the DeleteCourse component */}
          <Route path="/delete-course/:id" element={<DeleteCourse />} />
          <Route path="/create-course" element={<CreateCourse />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
