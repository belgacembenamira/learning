/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 07/08/2023 - 10:38:33
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 07/08/2023
    * - Author          : belgacem
    * - Modification    : 
**/
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'; 
import App from './App';

import 'bootstrap/dist/css/bootstrap.css';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
