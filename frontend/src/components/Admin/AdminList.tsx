/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 14/08/2023 - 10:16:18
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 14/08/2023
    * - Author          : belgacem
    * - Modification    : 
**/
import React from 'react';
import { useGetAllAdminsQuery } from '../../api/adminApi';



const AdminList = () => {
  const { data: admins, error, isLoading } = useGetAllAdminsQuery();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.log(error);
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4">List of Admins</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Mail</th>
            <th>Tlf</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {admins &&
            admins.map((admin) => (
              <tr key={admin.id}>
                <td>{admin.name}</td>
                <td>{admin.mail}</td>
                <td>{admin.tlf}</td>
                <td>
                  <button className="btn btn-primary btn-sm mr-2">Edit</button>
                  <button className="btn btn-danger btn-sm">Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminList;
