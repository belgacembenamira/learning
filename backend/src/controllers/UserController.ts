/**
 * @description      :
 * @author           : belgacem
 * @group            :
 * @created          : 08/08/2023 - 18:35:27
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 08/08/2023
 * - Author          : belgacem
 * - Modification    :
 **/
// controllers/UserController.ts
import { NextFunction, Request, Response } from "express";
import * as UserModel from "../models/User";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { VerifyErrors } from "jsonwebtoken";
import { mainModule } from "process";
import * as nodemailer from "nodemailer";

import { error } from "console";
import { User } from "../models/User";
const SECRET_KEY = "secret-key 123 456 789";
export const getAllUsersController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await UserModel.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error while fetching all users" });
  }
};

export const getUserByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    const user = await UserModel.getUserById(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error while fetching user" });
  }
};

export const createUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newUser: UserModel.User = req.body;
    const createdUser = await UserModel.createUser(newUser);
    console.log(createdUser); // Changed console.error to console.log

    res.json(createdUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error while creating a new user" + error });
  }
};

export const updateUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const updatedUser: User = req.body;

    const existingUser = await UserModel.getUserById(id);
    if (!existingUser) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const user = await UserModel.updateUser(id, updatedUser);
    if (user !== null) {
      res.json(user);
    } else {
      res.status(500).json({ error: "Error while updating user" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error while updating user: " + error });
  }
};


export const deleteUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    const deletedCount = await UserModel.deleteUser(id);
    if (deletedCount > 0) {
      res.json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error while deleting user" });
  }
};

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Unauthorized: Token missing" });
    return;
  }

  jwt.verify(token, SECRET_KEY, (err: VerifyErrors | null, decoded: any) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden: Token invalid" });
    }

    res.locals.user = { id: decoded.id };
    next();
  });
};

export const login = async (req: Request, res: Response): Promise<void> => {
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
  } catch (error) {
    console.error("Error while logging in:", error);
    res.status(500).json({ message: "Failed to login." });
  }
};

// export const register = async (req: Request, res: Response): Promise<void> => {
//   const { mail, password, name, niveau_educative, id } = req.body;

//   try {
//     // Vérifiez d'abord si l'utilisateur existe déjà avec l'adresse mail
//     const existingUser = await UserModel.findUserByEmail(mail);
//     if (existingUser) {
//       res.status(400).json({ message: "User already exists." });
//       return;
//     }

//     // Hashage du mot de passe avant de l'enregistrer
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Créez un nouvel utilisateur avec le mot de passe hashé
//     const newUser: UserModel.User = {
//       mail: mail,
//       password: hashedPassword,
//       id: id,
//       name: name,
//       niveau_educative: niveau_educative,
//       verified: false
//     };

//     const createdUser = await UserModel.createUser(newUser);
//     res
//       .status(201)
//       .json({ message: "Registration successful.", user: createdUser });
//   } catch (error) {
//     console.error("Error while registering:", error);
//     res.status(500).json({ message: "Failed to register." });
//   }
// };

//

const sendEmail = async (toEmail: string): Promise<void> => {
  try {
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 587,
      secure: false,
      auth: {
        user: "8886c8805731b6",
        pass: "3dc30dd939fd85",
      },
    });

    const mailOptions = {
      from: "teststage877@gmail.com",
      to: toEmail,
      subject: "Test Email",
      html: `
        <div style="background-color: #f8f9fa; padding: 20px;">
          <h2 style="color: #007bff;">Hello, welcome to the SITE</h2>
          <p style="font-size: 16px;">Thank you for joining us. We're excited to have you on board!</p>
          <p style="font-size: 16px;">If you have any questions or need assistance, feel free to contact us.</p>
         
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error while sending email:", error);
  }
};

export const register = async (req: Request, res: Response): Promise<void> => {
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
    const newUser: UserModel.User = {
      mail: mail,
      password: hashedPassword,
      id: id,
      name: name,
      niveau_educative: niveau_educative,
      verified: false,
    };

    const createdUser = await UserModel.createUser(newUser);

    // Générez un token de confirmation
    const confirmationToken = jwt.sign({ mail }, SECRET_KEY, {
      expiresIn: "1d", // Token expires in 1 day
    });

    // Envoyez un e-mail de confirmation avec le lien
    await sendEmail(mail);
    res.cookie("confirmationToken", confirmationToken, {
      httpOnly: true, // Empêche JavaScript côté client d'accéder au cookie
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // Expire en 1 jour
    });

    res
      .status(201)
      .json({
        message:
          "Registration successful. Check your email for a confirmation link.",
      });
  } catch (error) {
    console.error("Error while registering:", error);
    res.status(500).json({ message: "Failed to register." });
  }
};
