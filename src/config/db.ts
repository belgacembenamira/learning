/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 06/08/2023 - 20:38:26
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 06/08/2023
    * - Author          : belgacem
    * - Modification    : 
**/
import knex from 'knex';
import * as dotenv from 'dotenv';

dotenv.config();

const db = knex(require('../../knexfile')[process.env.NODE_ENV || 'development']);

export default db;
