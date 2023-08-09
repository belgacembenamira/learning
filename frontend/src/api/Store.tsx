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
import { api } from './index';

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer, // Add the API reducer to the store
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware), // Add the API middleware
});

export default store;

