/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 13/08/2023 - 21:00:01
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 13/08/2023
    * - Author          : belgacem
    * - Modification    : 
**/
// controllers/AdminController.ts
import { NextFunction, Request, Response } from "express";
import * as AdminModel from "../models/Admin";
import { User } from "../models/User";
import { VerifyErrors } from "jsonwebtoken";
import * as nodemailer from "nodemailer";
import * as bcrypt from "bcrypt";
import   { JwtPayload } from 'jsonwebtoken';
import  * as jwt from 'jsonwebtoken';

const SECRET_KEY = "secret-key 123 456 789";
// Create a file named jwtPayload.ts

export const getAllAdminsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const admins = await AdminModel.getAllAdmins();
    res.json(admins);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error while fetching all admins" });
  }
};

export const getAdminByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    const admin = await AdminModel.getAdminById(id);
    if (admin) {
      res.json(admin);
    } else {
      res.status(404).json({ error: "Admin not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error while fetching admin" });
  }
};

export const createAdminController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newAdmin: AdminModel.Admin = req.body;
    const createdAdmin = await AdminModel.createAdmin(newAdmin);

    res.json(createdAdmin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error while creating a new admin" });
  }
};

export const updateAdminController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const updatedAdmin: AdminModel.Admin = req.body;

    const admin = await AdminModel.updateAdmin(id, updatedAdmin);
    if (admin) {
      res.json(admin);
    } else {
      res.status(404).json({ error: "Admin not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error while updating admin" });
  }
};

export const deleteAdminController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    const deletedCount = await AdminModel.deleteAdmin(id);
    if (deletedCount > 0) {
      res.json({ message: "Admin deleted successfully" });
    } else {
      res.status(404).json({ error: "Admin not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error while deleting admin" });
  }
};


const sendEmailAdmin = async (toEmail: string, name: string) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 587,
      secure: false,
      auth: {
        user: "8886c8805731b6",
        pass: "3dc30dd939fd85",
      },
    });

    const mailOptions = {
      from: 'test@example.com',
      to: toEmail,
      subject: 'Welcome to the SITE',
      html: `
        <div style="background-color: #f8f9fa; padding: 20px;">
          <h2 style="color: #007bff;">Hello ${name}, welcome to the site My admin </h2>
          <h2 style="color: #007bff;">Have a nice Day ${name}</h2>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error while sending email:', error);
  }
};


export const registerAdmin = async (req :Request, res :Response) => {
  const { mail, password, name, tlf } = req.body;

  try {
    // Check if an admin with the provided email already exists
    const existingAdmin = await AdminModel.findAdminByEmail(mail);
    if (existingAdmin) {
      res.status(400).json({ message: 'Admin already exists.' });
      return;
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new admin object with the provided details
    const newAdmin = {
      mail: mail,
      password: hashedPassword,
      name: name,
      tlf: tlf,
      id: 0, // Initialize ID to 0
    };

    // Register the new admin in the database
    const createdAdmin = await AdminModel.createAdmin(newAdmin);

    // Generate a confirmation token
    const confirmationToken = jwt.sign({ mail }, SECRET_KEY, {
      expiresIn: '1d',
    });

    // Use your email sending function here
    await sendEmailAdmin(mail, name);

    // Set a confirmation cookie
    res.cookie('confirmationTokenAdmin', confirmationToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    // Respond with a success message
    res.status(201).json({
      message:
        'Registration successful. Check your email for a confirmation link.',
    });
  } catch (error) {
    // Handle errors
    console.error('Error while registering:', error);
    res.status(500).json({ message: 'Failed to register: ' + error });
  }
};

export const loginAdminController = async (req:Request, res :Response) => {
  const { mail, password } = req.body;

  try {
    const admin = await AdminModel.findAdminByEmail(mail);
    if (!admin) {
      res.status(404).json({ message: 'Admin not found.' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid credentials.' });
      return;
    }

    const token = jwt.sign(
      { id: admin.id, mail: admin.mail },
      SECRET_KEY,
      { expiresIn: '1h' }
    );
    // localStorage.setItem('adminToken', token);

    res.status(200).json({ token: token, message: 'Login successful.' + token});
  } catch (error) {
    console.error('Error while logging in:', error);
    res.status(500).json({ message: 'Failed to login.' });
  }
};




const generateRandomCode = () => {
  const code = Math.floor(1000 + Math.random() * 9000); // Generates a random 4-digit code
  return code.toString(); // Convert the code to a string before sending
};

const sendRandomCode = async (toEmail: string) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 587,
      secure: false,
      auth: {
        user: '8886c8805731b6',
        pass: '3dc30dd939fd85',
      },
    });

    const randomCode = generateRandomCode(); // Generate a random code

    const mailOptions = {
      from: 'test@example.com',
      to: toEmail,
      subject: 'Your Verification Code',
      html: `
        <div style="background-color: #f8f9fa; padding: 20px;">
          <h2 style="color: #007bff;">Your verification code is: ${randomCode}</h2>
          <p>This code will expire in a short time.</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Verification code sent:', info.response);
    return randomCode; // Return the code in case you need to verify it later
  } catch (error) {
    console.error('Error while sending verification code:', error);
    throw error; // Rethrow the error to handle it further up the call stack
  }
};

// Inside your server code


const sendEmailAdmiForget = async (toEmail: string, name: string, password: string) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 587,
      secure: false,
      auth: {
        user: "8886c8805731b6",
        pass: "3dc30dd939fd85",
      },
    });

    const mailOptions = {
      from: 'test@example.com',
      to: toEmail,
      subject: 'Your Admin Password',
      html: `
        <div style="background-color: #f8f9fa; padding: 20px;">
          <h2 style="color: #007bff;">Hello ${name}, here is your admin password: ${password}</h2>
          <p style="color: #007bff;">Please keep this password secure and do not share it with anyone.</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error while sending email:', error);
  }
};


export const forgetPassword = async (req: Request, res: Response) => {
  const { mail } = req.body; // Récupération de l'adresse e-mail directement du corps

  try {
    // Generate a new random password
    const newPassword = Math.random().toString(36).slice(-10); // Change to your password generation logic

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the admin's password in the database
    await AdminModel.updateAdminPassword(mail, hashedPassword);

    // Send the new password to the admin's email
    const admin = await AdminModel.getAdminByEmail(mail);
    if (admin && admin.name) {
      await sendEmailAdmiForget(admin.mail, admin.name, newPassword);
    } 

    // Clear the reset token from the admin's record
    await AdminModel.clearAdminResetToken(mail);

    res.status(200).json({ message: 'Password reset successful.' });
  } catch (error) {
    console.error('Error while resetting password:', error);
    res.status(500).json({ message: 'Failed to reset password.' + error });
  }
};


