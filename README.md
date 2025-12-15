# Shopping Cart API

API de carrinho de compras desenvolvida com Node.js, TypeScript e Prisma.

## Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 16.13 ou superior)
- [NPM](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)
- Um banco de dados (ex: PostgreSQL, MySQL, SQLite)

## Instalação

1.  Clone o repositório:

    ```bash
    git clone <url-do-seu-repositorio>
    cd shoppingcart
    ```

2.  Instale as dependências:
    ```bash
    npm install
    ```
    ou
    ```bash
    yarn install
    ```

## Configuração

1.  Crie um arquivo `.env` na raiz do projeto. Você pode copiar o `.env.example` se ele existir:

    ```bash
    cp .env.example .env
    ```

2.  Configure as variáveis de ambiente no arquivo `.env`. A principal variável é a `DATABASE_URL`, que contém a string de conexão com o seu banco de dados. [1]

    Exemplo para PostgreSQL:

    ```env
    DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
    ```

## Banco de Dados

Este projeto utiliza o Prisma para gerenciar o banco de dados.

### Migrations

Para aplicar as migrações e criar as tabelas no banco de dados, execute o seguinte comando. Isso aplicará todas as migrações pendentes da pasta `prisma/migrations`. [2]

```bash
npx prisma migrate dev
```
