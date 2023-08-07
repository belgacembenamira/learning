"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserController = exports.updateUserController = exports.createUserController = exports.getUserByIdController = exports.getAllUsersController = void 0;
const User_1 = require("../models/User");
const getAllUsersController = async (req, res) => {
    try {
        const Users = await (0, User_1.getAllUsers)();
        res.status(200).json(Users);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to get Users.' });
    }
};
exports.getAllUsersController = getAllUsersController;
const getUserByIdController = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        res.status(400).json({ message: 'Invalid User ID.' });
        return;
    }
    try {
        const User = await (0, User_1.getUserById)(id);
        if (User) {
            res.status(200).json(User);
        }
        else {
            res.status(404).json({ message: 'User not found.' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to get User.' });
    }
};
exports.getUserByIdController = getUserByIdController;
const createUserController = async (req, res) => {
    const User = req.body;
    if (!User.name) {
        res.status(400).json({ message: 'User name is required.' });
        return;
    }
    try {
        const createdUser = await (0, User_1.createUser)(User);
        res.status(201).json(createdUser);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to create User.' });
    }
};
exports.createUserController = createUserController;
const updateUserController = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        res.status(400).json({ message: 'Invalid User ID.' });
        return;
    }
    const User = req.body;
    if (!User.name) {
        res.status(400).json({ message: 'User name is required.' });
        return;
    }
    try {
        const updatedUser = await (0, User_1.updateUser)(id, User);
        if (updatedUser) {
            res.status(200).json(updatedUser);
        }
        else {
            res.status(404).json({ message: 'User not found.' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to update User.' });
    }
};
exports.updateUserController = updateUserController;
const deleteUserController = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        res.status(400).json({ message: 'Invalid User ID.' });
        return;
    }
    try {
        const rowsAffected = await (0, User_1.deleteUser)(id);
        if (rowsAffected) {
            res.status(200).json({ message: 'User deleted successfully.' });
        }
        else {
            res.status(404).json({ message: 'User not found.' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to delete User.' });
    }
};
exports.deleteUserController = deleteUserController;
