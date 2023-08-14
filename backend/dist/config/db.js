"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
const knex_1 = require("knex");
const dotenv = require("dotenv");
dotenv.config();
const db = (0, knex_1.default)(require('../../knexfile')[process.env.NODE_ENV || 'development']);
exports.default = db;
//# sourceMappingURL=db.js.map