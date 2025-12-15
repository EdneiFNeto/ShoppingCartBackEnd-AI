import { Request, Response, NextFunction } from 'express';
import * as ProductModel from '../models/productModel';

export const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await ProductModel.getAll();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'O ID do produto é inválido.' });
    }

    const product = await ProductModel.getById(id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: 'Produto não encontrado' });
    }
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newProduct = await ProductModel.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

