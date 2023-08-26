/* eslint-disable @typescript-eslint/no-unused-vars */
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
import GetAllProef from './components/Proef/GetAllProef';
import GetProef from './components/Proef/GetProef';
import CreateProefForm from './components/Proef/CreateProefForm';
import UpdateProefForm from './components/Proef/UpdateProefForm';
import DeleteProef from './components/Proef/DeleteProef';
import AdminList from './components/Admin/AdminList';
import { updateAdmin } from '../../backend/src/models/Admin';
import UpdateAdminForm from './components/Admin/UpdateAdminForm';
import CreateAdminForm from './components/Admin/CreateAdminForm';
import AdminDetail from './components/Admin/AdminDetail';
import CommandeForm from './components/Command/CommandeForm';
import CommandeList from './components/Command/CommandeList';
import CommandeUpdateForm from './components/Command/CommandeUpdateForm';
import CommandeDetails from './components/Command/CommandeDetails';
import Navbar from './page/Navbar';
import RegisterProef from './components/Proef/RegisterProef';
import LoginProef from './components/Proef/LoginProef';
import RegisterAdmin from './components/Admin/RegisterAdmin';
import ForgetPasswordAdmin from './components/Admin/ForgetPasswordAdmin';
import LoginAdmin from './components/Admin/handleLoginAdmin';
import InstructorCourses from './components/Cours/InstructorCourses';
import PlayerCourse from './components/Cours/PlayerCourse';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Navbar />
        <Routes>
          {/* Define your routes */}
          {/* Define a route for the GetAllCours component */}
          <Route path="/" element={<CardCours />} />
          <Route path="/courses" element={<GetAllCours />} />
          {/* Define a route for the UpdateCourse component */}
          <Route path="/edit-course/:id" element={<UpdateCourse />} />
          <Route path="/course-details/:id" element={<CourseDetail />} />
          <Route path="/instructor/:instructor" element={<InstructorCourses />} />

          {/* Define a route for the DeleteCourse component */}
          <Route path="/delete-course/:id" element={<DeleteCourse />} />
          <Route path="/create-course" element={<CreateCourse />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/*********Proef******************* */}
          <Route path="/Proef" element={<GetAllProef />} />
          <Route path="/proef-details/:id" element={<GetProef />} />
          <Route path="/create-proef" element={<CreateProefForm />} />
          <Route path="/edit-proef/:id" element={<UpdateProefForm />} />
          <Route path="/delete-proef/:id" element={<DeleteProef />} />
          <Route path="/RegisterProef" element={<RegisterProef />} />
          <Route path="/loginProef" element={<LoginProef />} />
          { /******************Admin********************************** */}
          <Route path="/Admin" element={<AdminList />} />
          <Route path="/create-admin" element={<CreateAdminForm />} />
          <Route path="/Admin-update/:id" element={<UpdateAdminForm />} />
          <Route path="/Admin-details/:id" element={<AdminDetail />} />
          <Route path="/registerAdmin" element={<RegisterAdmin />} />
          <Route path="/forget-password/" element={<ForgetPasswordAdmin />} />
          <Route path="/loginAdmin" element={<LoginAdmin />} />

          {/*********************commande ********* **/}
          <Route path="/commande/:coursName" element={<CommandeForm />} />

          <Route path="/commande/:id" element={<CommandeUpdateForm />} />
          <Route path="/AllCommande" element={<CommandeList />} />
          <Route path="/commandes-details/:id/" element={<CommandeDetails />} />

          {/* <Route
            path="/player-course/:url"
            element={({ params }: { params: { url: string } }) => (
              <PlayerCourse url={params.url} />
            )}
          /> */}












        </Routes>
      </div>
    </Provider>
  );
}

export default App;