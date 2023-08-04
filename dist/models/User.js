"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getAllUsers = void 0;
/**
    * @description      :
    * @author           : belgacem
    * @group            :
    * @created          : 03/08/2023 - 17:05:08
    *
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 03/08/2023
    * - Author          : belgacem
    * - Modification    :
**/
const db_1 = require("../config/db");
const TABLE_NAME = 'Users';
const getAllUsers = async () => {
    return (0, db_1.default)(TABLE_NAME).select();
};
exports.getAllUsers = getAllUsers;
const getUserById = async (id) => {
    const Users = await (0, db_1.default)(TABLE_NAME).where('id', id).select();
    return Users.length ? Users[0] : null;
};
exports.getUserById = getUserById;
const createUser = async (User) => {
    const [createdUser] = await (0, db_1.default)(TABLE_NAME).insert(User).returning('*');
    return createdUser;
};
exports.createUser = createUser;
const updateUser = async (id, User) => {
    const [updatedUser] = await (0, db_1.default)(TABLE_NAME).where('id', id).update(User).returning('*');
    return updatedUser || null;
};
exports.updateUser = updateUser;
const deleteUser = async (id) => {
    return (0, db_1.default)(TABLE_NAME).where('id', id).delete();
};
exports.deleteUser = deleteUser;
