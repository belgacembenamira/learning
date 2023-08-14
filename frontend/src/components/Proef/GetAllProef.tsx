/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 14/08/2023 - 08:58:17
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 14/08/2023
    * - Author          : belgacem
    * - Modification    : 
**/
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Proef {
  id: number;
  name: string;
  matricule: string;
  mail: string;
  numero_tlf: string;
  // Add more properties if needed
}

const GetAllProef: React.FC = () => {
  const [proefs, setProefs] = useState<Proef[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProefs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/proefs/');
        setProefs(response.data);
      } catch (error) {
        console.error('Error fetching proefs:', error);
      }
    };

    fetchProefs();
  }, []);

  const handleViewProef = (proef: Proef) => {
    notifySuccess(`Voir le proef "${proef.name}"`);
    navigate(`/proef-details/${proef.id}`);
  };

  const handleDeleteProef = (proef: Proef) => {
    console.log('Supprimer le proef', proef.name);
    notifyInfo(`Supprimer le proef "${proef.name}"`);
    navigate(`/delete-proef/${proef.id}`);
  };

  const handleEditProef = (proef: Proef) => {
    notifyInfo(`Modifier le proef "${proef.name}"`);
    navigate(`/edit-proef/${proef.id}`);
  };

  const handleCreateProef = () => {
    notifyInfo("Créer un proef");
    navigate('/create-proef');
  };

  const notifySuccess = (message: string) => {
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 5000,
      hideProgressBar: true,
      closeButton: true,
    });
  };

  const notifyInfo = (message: string) => {
    toast.info(message, {
      position: toast.POSITION.TOP_LEFT,
      autoClose: 5000,
      hideProgressBar: true,
      closeButton: true,
    });
  };

  return (
    <div>
      <ToastContainer />
      <div className="container">
        <h1>Liste des proefs</h1>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>Nom du proef</th>
                <th>Matricule</th>
                <th>Mail</th>
                <th>Numéro de téléphone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {proefs.map((proef) => (
                <tr key={proef.id}>
                  <td>{proef.name}</td>
                  <td>{proef.matricule}</td>
                  <td>{proef.mail}</td>
                  <td>{proef.numero_tlf}</td>
                  <td>
                    <button
                      className="btn btn-primary mr-2"
                      onClick={() => handleViewProef(proef)}
                    >
                      Voir
                    </button>
                    <button
                      className="btn btn-danger mr-2"
                      onClick={() => handleDeleteProef(proef)}
                    >
                      Supprimer
                    </button>
                    <button
                      className="btn btn-warning"
                      onClick={() => handleEditProef(proef)}
                    >
                      Modifier
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="btn btn-primary mb-3" onClick={handleCreateProef}>
          Créer un proef
        </button>
      </div>
    </div>
  );
};

export default GetAllProef;
