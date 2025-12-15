import { Request, Response, NextFunction } from 'express';
import * as ClientModel from '../models/clientModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }

    const client = await ClientModel.findByEmail(email);
    if (!client) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    const isPasswordValid = await bcrypt.compare(password, client.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    const token = jwt.sign(
      { id: client.id, email: client.email },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

