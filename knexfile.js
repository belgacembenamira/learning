"use strict";
/**
    * @description      :
    * @author           : belgacem
    * @group            :
    * @created          : 03/08/2023 - 11:15:53
    *
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 03/08/2023
    * - Author          : belgacem
    * - Modification    :
**/
module.exports = {
    development: {
        client: 'pg',
        connection: process.env.DB_CONNECTION_STRING,
        migrations: {
            directory: __dirname + '/src/database/migrations',
        },
        seeds: {
            directory: __dirname + '/src/database/seeds',
        },
    },
};
