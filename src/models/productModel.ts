import prisma from '../services/prisma';
import { Product } from '@prisma/client';

export const getAll = async (): Promise<Product[]> => {
  return prisma.product.findMany({
    orderBy: { id: 'asc' },
  });
};

export const getById = async (id: number): Promise<Product | null> => {
  return prisma.product.findUnique({
    where: { id },
  });
};

export const create = async (productData: Omit<Product, 'id'>): Promise<Product> => {
  return prisma.product.create({
    data: productData,
  });
};

