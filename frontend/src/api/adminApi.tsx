/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 15/08/2023 - 15:28:06
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 15/08/2023
    * - Author          : belgacem
    * - Modification    : 
**/
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Admin {
  id: number;
  name: string;
  mail: string;
  tlf:string;
  
}

export const adminApi = createApi({
  reducerPath: 'adminApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  endpoints: (builder) => ({
    getAllAdmins: builder.query<Admin[], void>({
      query: () => '/admins',
    }),
    createAdmin: builder.mutation<Admin, Admin>({
      query: (admin) => ({
        url: '/admins',
        method: 'POST',
        body: admin, // Include the admin object as the request body
      }),
    }),
    
    updateAdmin: builder.mutation<Admin, { id: number; admin: Admin }>({
      query: ({ id, admin }) => ({
        url: `/admins/${id}`,
        method: 'PUT',
        body: admin,
      }),
    }),
    deleteAdmin: builder.mutation<void, number>({
      query: (id) => ({
        url: `/admins/${id}`,
        method: 'DELETE',
      }),
    }),
    getAdminById: builder.query<Admin, number>({
      query: (id) => ({
        url: `/admins/${id}`,
        method: 'GET', // Corrected: Method should be GET
      }),
    }),
  }),
});

export const {
  useGetAllAdminsQuery,
  useCreateAdminMutation,
  useUpdateAdminMutation,
  useDeleteAdminMutation,
  useGetAdminByIdQuery
} = adminApi;
