Claro 🙂
Abaixo está um **README.md revisado, organizado e alinhado** com as **configurações corretas de Docker + Prisma** que você está usando agora, incluindo as boas práticas que aplicamos (Docker Compose v2, Prisma, seed, etc.).

---

# 🛒 ShoppingCart

API de carrinho de compras desenvolvida em **Node.js**, utilizando **Prisma ORM** e **PostgreSQL**, com ambiente totalmente containerizado via **Docker**.

---

## 🚀 Tecnologias

- Node.js
- Prisma ORM
- PostgreSQL
- Docker & Docker Compose (v2)

---

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Docker Desktop** (ou Docker Engine + Docker Compose v2)
- **Node.js** (apenas para execução local sem Docker)

---

## 🐳 Executando com Docker (Recomendado)

Esta aplicação inclui um `Dockerfile` e um `docker-compose.yml` para facilitar a execução em um ambiente containerizado, orquestrando a **API** e o **banco de dados PostgreSQL**.

---

### 1️⃣ Configuração do `.env`

Crie um arquivo `.env` na raiz do projeto com a seguinte variável:

```env
DATABASE_URL="postgresql://postgres:postgres@postgres:5432/app_db?schema=public"
```

📌 **Importante:**

- O host (`postgres`) deve ser o **nome do serviço do banco** definido no `docker-compose.yml`.
- Essas credenciais devem bater com as variáveis `POSTGRES_USER`, `POSTGRES_PASSWORD` e `POSTGRES_DB`.

---

### 2️⃣ Subindo os contêineres

Construa as imagens e inicie os serviços:

```bash
docker compose up --build
```

Ou em segundo plano:

```bash
docker compose up -d --build
```

✅ Ao iniciar:

- O PostgreSQL será inicializado
- A API aplicará automaticamente as **migrations do Prisma**

📍 A API ficará disponível em:
👉 **[http://localhost:3000](http://localhost:3000)**

---

### 3️⃣ Executando migrations manualmente (opcional)

Caso precise rodar as migrations manualmente:

```bash
docker compose run --rm app npx prisma migrate dev
```

📌 Esse comando cria um contêiner temporário apenas para executar a migration.

---

### 4️⃣ Executando Seeds com Docker

Para popular o banco de dados com dados iniciais:

```bash
docker compose run --rm app npx prisma db seed
```

✔️ Recomendado para ambientes de desenvolvimento e testes.

---

### 5️⃣ Parando os contêineres

Para parar e remover os contêineres, redes e volumes:

```bash
docker compose down
```

Se quiser remover também os volumes (⚠️ apaga os dados do banco):

```bash
docker compose down -v
```

---

## 🧪 Rodando a Aplicação sem Docker (Desenvolvimento Local)

> ⚠️ Requer PostgreSQL rodando localmente

1. Instale as dependências:

```bash
npm install
```

2. Configure o `.env` para apontar para o banco local:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/app_db?schema=public"
```

3. Rode as migrations:

```bash
npx prisma migrate dev
```

4. Inicie a aplicação:

```bash
npm run dev
```

📍 A aplicação estará disponível em:
👉 **[http://localhost:3000](http://localhost:3000)**

---

## 🧬 Prisma Studio

Para abrir uma interface gráfica e visualizar/editar os dados do banco de dados:

```bash
npx prisma studio
```

📍 Por padrão:
👉 **[http://localhost:5555](http://localhost:5555)**

---

## ✅ Boas práticas adotadas

- Docker Compose v2 (`docker compose`)
- Imagem `node:20-slim` (compatível com Prisma + OpenSSL)
- Migrations automatizadas
- Seed idempotente
- Banco com volume persistente

---

## 📌 Observações

- **Não use `docker-compose` (com hífen)** — utilize sempre `docker compose`
- Para produção, utilize `prisma migrate deploy`
- Seeds não devem rodar automaticamente em produção
