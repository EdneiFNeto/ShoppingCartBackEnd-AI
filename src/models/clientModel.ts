import prisma from '../services/prisma';
import { Client } from '@prisma/client';

export const findByEmail = async (email: string): Promise<Client | null> => {
  return prisma.client.findUnique({
    where: { email },
  });
};

export const create = async (
  clientData: Omit<Client, 'id'>
): Promise<Client> => {
  return prisma.client.create({
    data: clientData,
  });
};

export const getAll = async (): Promise<Omit<Client, 'password'>[]> => {
  return prisma.client.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      cpf: true,
      phone: true,
    },
  });
};

