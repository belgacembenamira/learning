/**
 * @description      :
 * @author           : belgacem
 * @group            :
 * @created          : 13/08/2023 - 20:44:35
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 13/08/2023
 * - Author          : belgacem
 * - Modification    :
 **/
import { NextFunction, Request, Response } from "express";
import * as ProefModel from "../models/Proef";
import { VerifyErrors } from "jsonwebtoken";
import * as jwt from "jsonwebtoken";
import * as nodemailer from "nodemailer";
import * as bcrypt from "bcrypt";
export interface proef {
  id: number;
  name: string;
  matricule: string;
  mail: string;
  numero_tlf: string;
  password: string;
}

export const getAllProefController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const proefs = await ProefModel.getAllProef();
    res.json(proefs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error while fetching all proef" });
  }
};

export const getProefByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    const proef = await ProefModel.getProefById(id);
    if (proef) {
      res.json(proef);
    } else {
      res.status(404).json({ error: "Proef not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error while fetching proef" });
  }
};

export const createProefController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newProef: ProefModel.proef = req.body;
    const createdProef = await ProefModel.createProef(newProef);

    res.json(createdProef);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error while creating a new proef" });
  }
};

export const updateProefController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const updatedProef: ProefModel.proef = req.body;

    const proef = await ProefModel.updateProef(id, updatedProef);
    if (proef) {
      res.json(proef);
    } else {
      res.status(404).json({ error: "Proef not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error while updating proef" });
  }
};

export const deleteProefController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    const deletedCount = await ProefModel.deleteProef(id);
    if (deletedCount > 0) {
      res.json({ message: "Proef deleted successfully" });
    } else {
      res.status(404).json({ error: "Proef not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error while deleting proef" });
  }
};
const SECRET_KEY = "secret-key 123 456 789";

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

const sendEmailProef = async (toEmail: string, name: string): Promise<void> => {
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
      from: "test@example.com",
      to: toEmail,
      subject: "Welcome to the SITE",
      html: `
      <div style="background-color: #f8f9fa; padding: 20px;">
        <h2 style="color: #007bff;">Hello ${name}, welcome to the  teams </h2>
        <h2 style="color: #007bff;">Have a nice Day ${name}</h2>
       
      </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error while sending email:", error);
  }
};


export const registerProef = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { mail, password, name, matricule ,numero_tlf  } = req.body;

  try {
    // Vérifier si le proef existe déjà avec cette adresse e-mail
    const existingProef = await ProefModel.getProefByMail(mail);
    if (existingProef) {
      res.status(400).json({ message: "Proef already exists." });
      return;
    }

    // Hasher le mot de passe avant de l'enregistrer dans la base de données
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer un nouvel objet "proef" avec les détails fournis
    const newProef: proef = {
      mail: mail,
      password: hashedPassword,
      name: name,
      matricule: matricule,
      id: 0, // ID initialisé à 0
      numero_tlf: "",
    };
    

    // Enregistrer le nouvel "proef" dans la base de données
    const createdProef = await ProefModel.createProef(newProef);

    // Générer un jeton de confirmation
    const confirmationToken = jwt.sign({ mail }, SECRET_KEY, {
      expiresIn: "1d",
    });

    // Utiliser votre fonction d'envoi d'e-mail ici
    await sendEmailProef(mail, name);

    // Définir un cookie de confirmation
    res.cookie("confirmationTokenProef", confirmationToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    // Répondre avec un message de réussite
    res.status(201).json({
      message:
        "Registration successful. Check your email for a confirmation link.",
    });
  } catch (error) {
    // Gérer les erreurs
    console.error("Error while registering:", error);
    res.status(500).json({ message: "Failed to register: " + error });
  }
};


export const loginProefController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { mail, password } = req.body;

  try {
    const proef = await ProefModel.getProefByMail(mail);
    if (!proef) {
      res.status(404).json({ message: "Proef not found." });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, proef.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid credentials." });
      return;
    }

    const token = jwt.sign({ id: proef.id, mail: proef.mail }, SECRET_KEY, {
      expiresIn: "1h",
    });

    res.status(200).json({ token: token, message: "Login successful." });
  } catch (error) {
    console.error("Error while logging in:", error);
    res.status(500).json({ message: "Failed to login." });
  }
};

export const deleteAllProefController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const deletedCount = await ProefModel.deleteAllProef();
    res.json({ message: `${deletedCount} admins deleted successfully.` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error while deleting all admins" });
  }
};
