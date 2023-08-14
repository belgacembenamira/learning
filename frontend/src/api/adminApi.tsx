/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 14/08/2023 - 10:13:47
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 14/08/2023
    * - Author          : belgacem
    * - Modification    : 
**/
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export interface Admin {
  id: number;
  name: string;
  mail: string;
  tlf: string;
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
        body: admin,
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
        method: 'GET', // Method should be specified here
      }),
    }),
  }),
});

export const {
  useGetAllAdminsQuery,
  useCreateAdminMutation,
  useUpdateAdminMutation,
  useDeleteAdminMutation,
  useGetAdminByIdQuery} = adminApi;

