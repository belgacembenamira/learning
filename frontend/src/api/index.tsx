/* eslint-disable react-hooks/rules-of-hooks */
/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 09/08/2023 - 14:11:26
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 09/08/2023
    * - Author          : belgacem
    * - Modification    : 
**/
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Créez une instance d'API avec la configuration de base
export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }), // Changez l'URL de base vers l'URL de votre serveur
  endpoints: (builder) => ({
    login: builder.mutation<{ token: string }, { mail: string; password: string }>({
      query: (credentials) => ({
        url: '/login', // Change to your login endpoint
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation<void, { mail: string; password: string  ;name :string ; niveau_educative : string}>({
      query: (credentials) => ({
        url: '/register', // Change to your register endpoint
        method: 'POST',
        body: credentials,
      }),
    }),
    // Ajoutez d'autres endpoints si nécessaire
  }),
});

// Exportez les actions et les hooks générés par l'API
export const { useLoginMutation, useRegisterMutation } = api;


