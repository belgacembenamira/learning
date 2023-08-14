"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = exports.authenticateToken = exports.deleteUserController = exports.updateUserController = exports.createUserController = exports.getUserByIdController = exports.getAllUsersController = void 0;
const UserModel = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const SECRET_KEY = "secret-key 123 456 789";
const getAllUsersController = async (req, res) => {
    try {
        const users = await UserModel.getAllUsers();
        res.json(users);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error while fetching all users" });
    }
};
exports.getAllUsersController = getAllUsersController;
const getUserByIdController = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const user = await UserModel.getUserById(id);
        if (user) {
            res.json(user);
        }
        else {
            res.status(404).json({ error: "User not found" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error while fetching user" });
    }
};
exports.getUserByIdController = getUserByIdController;
const createUserController = async (req, res) => {
    try {
        const newUser = req.body;
        const createdUser = await UserModel.createUser(newUser);
        console.log(createdUser); // Changed console.error to console.log
        res.json(createdUser);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error while creating a new user" + error });
    }
};
exports.createUserController = createUserController;
const updateUserController = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const updatedUser = req.body;
        // Assurez-vous que l'objet updatedUser contient des valeurs à mettre à jour
        if (!Object.keys(updatedUser).length) {
            res.status(400).json({ error: "No update data provided" + updatedUser + "      " + req.body });
            return;
        }
        const user = await UserModel.updateUser(id, updatedUser);
        if (user) {
            res.json(user);
        }
        else {
            res.status(404).json({ error: "User not found" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error while updating user" + error });
    }
};
exports.updateUserController = updateUserController;
const deleteUserController = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const deletedCount = await UserModel.deleteUser(id);
        if (deletedCount > 0) {
            res.json({ message: "User deleted successfully" });
        }
        else {
            res.status(404).json({ error: "User not found" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error while deleting user" });
    }
};
exports.deleteUserController = deleteUserController;
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "Unauthorized: Token missing" });
        return;
    }
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Forbidden: Token invalid" });
        }
        res.locals.user = { id: decoded.id };
        next();
    });
};
exports.authenticateToken = authenticateToken;
const login = async (req, res) => {
    const { mail, password } = req.body;
    try {
        const user = await UserModel.findUserByEmail(mail);
        if (!user) {
            res.status(404).json({ message: "User not found." });
            return;
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: "Invalid credentials." });
            return;
        }
        const token = jwt.sign({ id: user.id, mail: user.mail }, SECRET_KEY, {
            expiresIn: "1h",
        });
        res.status(200).json({ token: token, message: "Login successful." });
    }
    catch (error) {
        console.error("Error while logging in:", error);
        res.status(500).json({ message: "Failed to login." });
    }
};
exports.login = login;
const register = async (req, res) => {
    const { mail, password, name, niveau_educative, id } = req.body;
    try {
        // Vérifiez d'abord si l'utilisateur existe déjà avec l'adresse mail
        const existingUser = await UserModel.findUserByEmail(mail);
        if (existingUser) {
            res.status(400).json({ message: "User already exists." });
            return;
        }
        // Hashage du mot de passe avant de l'enregistrer
        const hashedPassword = await bcrypt.hash(password, 10);
        // Créez un nouvel utilisateur avec le mot de passe hashé
        const newUser = {
            mail: mail,
            password: hashedPassword,
            id: id,
            name: name,
            niveau_educative: niveau_educative,
        };
        const createdUser = await UserModel.createUser(newUser);
        res
            .status(201)
            .json({ message: "Registration successful.", user: createdUser });
    }
    catch (error) {
        console.error("Error while registering:", error);
        res.status(500).json({ message: "Failed to register." });
    }
};
exports.register = register;
//# sourceMappingURL=UserController.js.map