/**
    * @description      : 
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

import  * as express from 'express';
import * as  bodyParser from 'body-parser';
import router from './src/Routes/routes';
import * as cors from 'cors';

const app = express();
app.use(cors());

console.log(__dirname);
console.log(__filename);


// Middleware
app.use(bodyParser.json());

// Routes
app.use(router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


