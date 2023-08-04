/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 03/08/2023 - 11:14:46
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 03/08/2023
    * - Author          : belgacem
    * - Modification    : 
**/
import knex from 'knex';
import * as dotenv from 'dotenv';

dotenv.config();

const db = knex(require('../../knexfile')[process.env.NODE_ENV || 'development']);

export default db;
