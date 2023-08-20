/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 20/08/2023 - 22:18:11
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 20/08/2023
    * - Author          : belgacem
    * - Modification    : 
**/
import { CardContent, Typography, TextField, CircularProgress } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

export default function UpdateCourse() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState({
    name: '',
    description: '',
    duration: '',
    difficulty: '',
    category: '',
    prerequisites: '',
    learningObjectives: '',
    materials: '',
    instructor: '',
    evaluationMethod: '',
    price: 0,
    availability: '',
    certificates: false, // Utiliser des boolean ici
    interactive: false, // Utiliser des boolean ici
    language: '',
    image_url: '',
    lien_courses: '',
  });

  const [isLoading, setIsLoading] = useState(true); // Ajout de l'état de chargement

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/courses/${id}`);
        setCourse(response.data);
        setIsLoading(false); // Mettre à jour l'état de chargement
      } catch (error) {
        console.error('Erreur lors de la récupération du cours :', error);
        setIsLoading(false); // Mettre à jour l'état de chargement en cas d'erreur
      }
    };

    fetchCourse();
  }, [id]);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;

    // Utiliser checked pour les champs boolean
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/courses/${id}`, course);
      navigate(`/course-details/${id}`);
    } catch (error) {
      console.log(error);
      console.error('Erreur lors de la mise à jour du cours :', error);
    }
  };
  return (
    <Container>
      <Card>
        <CardContent>
          <Typography variant="h4">Modifier le cours</Typography>
          {isLoading ? (
            <CircularProgress /> // Afficher un indicateur de chargement
          ) : (
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Nom du cours"
                name="name"
                value={course.name}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                required
              />
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={course.description}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                multiline
                rows={4}
                required
              />
              <TextField
                fullWidth
                label="Durée"
                name="duration"
                value={course.duration}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                required
              />
              <TextField
                fullWidth
                label="image_url"
                name="image_url"
                value={course.image_url}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                required
              />
              <TextField
                fullWidth
                label="lien_courses"
                name="lien_courses"
                value={course.lien_courses}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                required
              />
              <TextField
                fullWidth
                label="category"
                name="category"
                value={course.category}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                required
              />
              {/* Ajoutez d'autres champs ici */}
              <TextField
                fullWidth
                label="Prix"
                name="price"
                value={course.price}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                required
              />
              <TextField
                fullWidth
                label="Disponibilité"
                name="availability"
                value={course.availability}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                required
              />
              <div className="text-center mt-3">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{
                    marginTop: '1rem',
                    display: 'block', // To center the button
                    marginLeft: 'auto', // Center horizontally
                    marginRight: 'auto', // Center horizontally
                  }}
                >
                  Mettre à jour
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </Container>

  );

}
