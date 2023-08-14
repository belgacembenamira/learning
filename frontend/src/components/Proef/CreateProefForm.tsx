/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 14/08/2023 - 09:07:27
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 14/08/2023
    * - Author          : belgacem
    * - Modification    : 
**/
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateProefForm = () => {
  const [proefData, setProefData] = useState({
    name: '',
    matricule: '',
    mail: '',
    numero_tlf: '',
  });

  const navigte = useNavigate();

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
      const response = await fetch('http://localhost:5000/proefs/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(proefData),
      });

      if (response.ok) {
        // Redirect to a success page or update the UI
        navigte('/proef');
      } else {
        console.error('Error creating proef');
      }
    } catch (error) {
      console.error('Error creating proef:', error);
    }
  };

  return (
    <div className="container mt-5">
  <div className="row justify-content-center">
    <div className="col-md-6">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">Créer un proef</h2>
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
              Créer Proef
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default CreateProefForm;
