/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 14/08/2023 - 09:13:23
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 14/08/2023
    * - Author          : belgacem
    * - Modification    : 
**/
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateProefForm = () => {
  const { id } = useParams();
  const history = useNavigate();

  const [proefData, setProefData] = useState({
    name: '',
    matricule: '',
    mail: '',
    numero_tlf: '',
  });

  useEffect(() => {
    const fetchProef = async () => {
      try {
        const response = await fetch(`http://localhost:5000/proefs/${id}`);
        const data = await response.json();
        setProefData(data);
      } catch (error) {
        console.error('Error fetching proef:', error);
      }
    };

    fetchProef();
  }, [id]);

  const handleInputChange = (event: { target: { name: any; value: any; }; }) => {
    const { name, value } = event.target;
    setProefData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/proefs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(proefData),
      });

      if (response.ok) {
        // Redirect to a success page or update the UI
        history('/proef');
      } else {
        console.error('Error updating proef');
      }
    } catch (error) {
      console.error('Error updating proef:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Modifier le proef</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nom</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={proefData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Matricule</label>
          <input
            type="text"
            className="form-control"
            name="matricule"
            value={proefData.matricule}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Mail</label>
          <input
            type="email"
            className="form-control"
            name="mail"
            value={proefData.mail}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Numéro de téléphone</label>
          <input
            type="text"
            className="form-control"
            name="numero_tlf"
            value={proefData.numero_tlf}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Enregistrer les modifications
        </button>
      </form>
    </div>
  );
};

export default UpdateProefForm;
