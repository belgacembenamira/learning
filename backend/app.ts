/**
 * @description      : Ce commentaire pourrait être utilisé pour décrire l'objectif de ce script.
 * @author           : belgacem
 * @group            :
 * @created          : 03/08/2023 - 11:19:57
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 03/08/2023
 * - Author          : belgacem
 * - Modification    :
 **/

// Import des modules nécessaires
import * as express from "express"; // Importe le module Express pour gérer les routes et les middleware
import * as bodyParser from "body-parser"; // Middleware pour analyser les données JSON des requêtes
import router from "./src/Routes/routes"; // Importe les routes définies dans un fichier distinct
import * as cors from "cors"; // Middleware pour gérer les autorisations CORS (Cross-Origin Resource Sharing)

// Crée une instance d'application Express
const app = express();

// Utilise le middleware CORS pour gérer les autorisations Cross-Origin
app.use(cors());
// app.use(cookieParser());

// Affiche le répertoire du script en cours d'exécution
console.log(__dirname);

// Affiche le chemin complet du fichier du script en cours d'exécution
console.log(__filename);

// Middleware
app.use(bodyParser.json()); // Utilise le middleware bodyParser pour analyser les données JSON des requêtes
app.use(express.json());
app.use(express.json());

// Routes
app.use(router); // Utilise les routes définies dans le fichier routes.js

// Définit le port sur lequel le serveur écoutera, utilise 5000 par défaut
const PORT = process.env.PORT || 5000;

// Démarrage du serveur pour écouter les connexions entrantes
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
