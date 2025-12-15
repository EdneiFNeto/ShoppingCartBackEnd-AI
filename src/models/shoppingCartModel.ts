import prisma from '../services/prisma';
import { CartItem } from '@prisma/client';

export const addItemToCart = async (
  clientId: number,
  productId: number,
  quantity: number
): Promise<CartItem> => {
  // Usamos upsert para criar o carrinho se ele não existir, tudo em uma única operação.
  const shoppingCart = await prisma.shoppingCart.upsert({
    where: { clientId },
    update: {},
    create: { clientId },
  });

  return prisma.cartItem.upsert({
    where: {
      shoppingCartId_productId: {
        shoppingCartId: shoppingCart.id,
        productId,
      },
    },
    update: {
      quantity: { increment: quantity },
    },
    create: {
      shoppingCartId: shoppingCart.id,
      productId,
      quantity,
    },
  });
};

export const getCartByClientId = async (clientId: number) => {
    const cart = await prisma.shoppingCart.findUnique({
      where: { clientId },
      include: {
        items: {
          orderBy: {
            id: 'asc',
          },
          include: {
            product: true,
          },
        },
      },
    });
  
    return cart;
};

export const deleteItemFromCart = async (
  itemId: number,
  clientId: number
): Promise<CartItem | null> => {
  // Verifica se o item do carrinho pertence ao carrinho do cliente autenticado
  const item = await prisma.cartItem.findFirst({
    where: {
      id: itemId,
      shoppingCart: {
        clientId: clientId,
      },
    },
  });

  // Se o item não for encontrado ou não pertencer ao usuário, retorna nulo
  if (!item) {
    return null;
  }

  // Se o item for válido, deleta-o
  return prisma.cartItem.delete({
    where: {
      id: itemId,
    },
  });
};

