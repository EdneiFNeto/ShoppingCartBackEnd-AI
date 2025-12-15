import { Request, Response, NextFunction } from 'express';
import * as ClientModel from '../models/clientModel';
import bcrypt from 'bcryptjs';

export const registerClient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, cpf, phone, password } = req.body;

    if (!name || !email || !cpf || !phone || !password) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    const existingClient = await ClientModel.findByEmail(email);
    if (existingClient) {
      return res.status(409).json({ message: 'Email já cadastrado.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newClient = await ClientModel.create({
      name, email, cpf, phone, password: hashedPassword,
    });

    const { password: _, ...clientWithoutPassword } = newClient;

    res.status(201).json(clientWithoutPassword);
  } catch (error) {
    next(error);
  }
};

export const getAllClients = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const clients = await ClientModel.getAll();
    res.status(200).json(clients);
  } catch (error) {
    next(error);
  }
};

