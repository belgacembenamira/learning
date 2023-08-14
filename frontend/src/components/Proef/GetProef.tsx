/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 14/08/2023 - 09:01:09
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 14/08/2023
    * - Author          : belgacem
    * - Modification    : 
**/
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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

const GetProef: React.FC = () => {
  const { id } = useParams();
  const [proef, setProef] = useState<Proef | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProef = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/proefs/${id}`);
        setProef(response.data);
      } catch (error) {
        console.error('Error fetching proef:', error);
      }
    };

    fetchProef();
  }, [id]);

  const handleDeleteProef = async () => {
    if (proef) {
      try {
        await axios.delete(`http://localhost:5000/proefs/${proef.id}`);
        notifySuccess(`Le proef "${proef.name}" a été supprimé avec succès`);
        navigate('/proefs');
      } catch (error) {
        console.error('Error deleting proef:', error);
        notifyError(`Erreur lors de la suppression du proef "${proef.name}"`);
      }
    }
  };

  const notifySuccess = (message: string) => {
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 5000,
      hideProgressBar: true,
      closeButton: true,
    });
  };

  const notifyError = (message: string) => {
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 5000,
      hideProgressBar: true,
      closeButton: true,
    });
  };

  return (
    <div className="container mt-5">
    <h2>Détails du proef</h2>
    <div className="card">
      <div className="card-body">
        {proef ? (
          <div>
            <p><strong>Nom du proef:</strong> {proef.name}</p>
            <p><strong>Matricule:</strong> {proef.matricule}</p>
            <p><strong>Mail:</strong> {proef.mail}</p>
            <p><strong>Numéro de téléphone:</strong> {proef.numero_tlf}</p>
            {/* Display other properties if needed */}
            <button className="btn btn-danger" onClick={handleDeleteProef}>
              Supprimer le proef
            </button>
          </div>
        ) : (
          <p>Chargement en cours...</p>
        )}
      </div>
    </div>
    <ToastContainer />
  </div>
  );
};

export default GetProef;
