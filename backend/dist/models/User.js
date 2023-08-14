"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserByEmail = exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getAllUsers = void 0;
/**
    * @description      :
    * @author           : belgacem
    * @group            :
    * @created          : 06/08/2023 - 21:25:39
    *
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 06/08/2023
    * - Author          : belgacem
    * - Modification    :
**/
// models/User.ts
const db_1 = require("../config/db");
const TABLE_NAME = 'users';
const getAllUsers = async () => {
    try {
        return await (0, db_1.default)(TABLE_NAME).select();
    }
    catch (error) {
        throw new Error('Error while fetching all users');
    }
};
exports.getAllUsers = getAllUsers;
const getUserById = async (id) => {
    try {
        const Users = await (0, db_1.default)(TABLE_NAME).where('id', id).select();
        return Users.length ? Users[0] : null;
    }
    catch (error) {
        throw new Error(`Error while fetching user with ID ${id}`);
    }
};
exports.getUserById = getUserById;
const createUser = async (user) => {
    try {
        const [createdUser] = await (0, db_1.default)(TABLE_NAME).insert(user).returning(['id', 'name', 'mail']);
        return createdUser;
    }
    catch (error) {
        console.error(error);
        throw new Error('Error while creating a new user');
    }
};
exports.createUser = createUser;
const updateUser = async (id, user) => {
    try {
        const [updatedUser] = await (0, db_1.default)(TABLE_NAME).where('id', id).update(user).returning('*');
        return updatedUser || null;
    }
    catch (error) {
        throw new Error(`Error while updating user with ID ${id}: ${error}`);
    }
};
exports.updateUser = updateUser;
const deleteUser = async (id) => {
    try {
        return await (0, db_1.default)(TABLE_NAME).where('id', id).delete();
    }
    catch (error) {
        throw new Error(`Error while deleting user with ID ${id}`);
    }
};
exports.deleteUser = deleteUser;
const findUserByEmail = async (email) => {
    try {
        const user = await (0, db_1.default)('users').where({ mail: email }).first();
        return user || null;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
exports.findUserByEmail = findUserByEmail;
//# sourceMappingURL=User.js.map