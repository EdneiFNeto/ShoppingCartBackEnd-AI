import { Response, NextFunction } from 'express';
import * as ShoppingCartModel from '../models/shoppingCartModel';
import { AuthRequest } from '../middlewares/authMiddleware';

export const addProductToCart = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const clientId = req.user?.id;
    const { productId, quantity } = req.body;

    if (!clientId) {
      return res
        .status(401)
        .json({ message: 'Não autorizado, cliente não identificado.' });
    }

    if (
      typeof productId !== 'number' ||
      typeof quantity !== 'number' ||
      quantity <= 0
    ) {
      return res.status(400).json({
        message: 'productId (número) e quantity (número > 0) são obrigatórios.',
      });
    }

    const cartItem = await ShoppingCartModel.addItemToCart(clientId, productId, quantity);
    res.status(201).json(cartItem);
  } catch (error) {
    next(error);
  }
};

export const getCart = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const clientId = req.user?.id;

    if (!clientId) {
      return res
        .status(401)
        .json({ message: 'Não autorizado, cliente não identificado.' });
    }

    const cart = await ShoppingCartModel.getCartByClientId(clientId);

    // Se o cliente nunca adicionou um item, o carrinho pode não existir.
    // Retornamos o carrinho encontrado ou um objeto com uma lista de itens vazia.
    res.status(200).json(cart || { items: [] });
  } catch (error) {
    next(error);
  }
};


export const deleteProductFromCart = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const clientId = req.user?.id;
    const itemId = parseInt(req.params.itemId, 10);

    if (!clientId) {
      return res
        .status(401)
        .json({ message: 'Não autorizado, cliente não identificado.' });
    }

    if (isNaN(itemId)) {
      return res.status(400).json({ message: 'O ID do item é inválido.' });
    }

    const deletedItem = await ShoppingCartModel.deleteItemFromCart(itemId, clientId);

    if (!deletedItem) {
      return res.status(404).json({ message: 'Item do carrinho não encontrado ou não pertence ao usuário.' });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

