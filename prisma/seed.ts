import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const productData = [
    {
      name: 'Notebook Gamer',
      price: 4500.50,
      category: 'Informatica',
    },
    {
      name: 'Cadeira de Escritório',
      price: 899.90,
      category: 'Móveis',
    },
    {
      name: 'Livro "Código Limpo"',
      price: 75.00,
      category: 'Livros',
    },
    {
      name: 'Geladeira Frost Free',
      price: 3500.00,
      category: 'Eletrodomesticos',
    },
    {
      name: 'Fogão 4 Bocas',
      price: 950.00,
      category: 'Eletrodomesticos',
    },
    {
      name: 'Micro-ondas 20L',
      price: 450.90,
      category: 'Eletrodomesticos',
    },
    {
      name: 'Smart TV 55" 4K',
      price: 2800.00,
      category: 'Eletroeletronicos',
    },
    {
      name: 'Soundbar com Subwoofer',
      price: 799.90,
      category: 'Eletroeletronicos',
    },
    {
      name: 'Monitor Ultrawide 29"',
      price: 1200.00,
      category: 'Informatica',
    },
    {
      name: 'Teclado Mecânico RGB',
      price: 350.00,
      category: 'Informatica',
    },
  ];
  
  async function main() {
    console.log(`Apagando dados antigos e iniciando o seed...`);
    
    await prisma.client.deleteMany({});
    await prisma.product.deleteMany({});
  
    await prisma.product.createMany({
      data: productData,
    });
    console.log(`Seed finalizado.`);
  
    const hashedPassword = await bcrypt.hash('123456', 10);
    await prisma.client.create({
      data: {
        name: 'Cliente Teste',
        email: 'cliente@teste.com',
        cpf: '123.456.789-00',
        phone: '11987654321',
        password: hashedPassword,
      },
    });
  
    console.log(`Seed finalizado.`);
  }
  
  main()
  
  