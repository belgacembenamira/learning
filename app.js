"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
const express_1 = require("express");
const body_parser_1 = require("body-parser");
const routes_1 = require("./src/Routes/routes");
const app = (0, express_1.default)();
// Middleware
app.use(body_parser_1.default.json());
// Routes
app.use(routes_1.default);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
