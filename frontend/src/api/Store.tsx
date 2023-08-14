/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 09/08/2023 - 15:02:00
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 09/08/2023
    * - Author          : belgacem
    * - Modification    : 
**/
import { configureStore } from '@reduxjs/toolkit';
import { api } from './index'; // Import the main API configuration
import { adminApi } from './adminApi'; // Import the admin API configuration

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer, // Add the main API reducer to the store
    [adminApi.reducerPath]: adminApi.reducer, // Add the admin API reducer to the store
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware, adminApi.middleware), // Add both API middlewares
});

export default store;


