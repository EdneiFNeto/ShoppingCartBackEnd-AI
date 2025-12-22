# 🛒 ShoppingCart

> **Aviso:** Este projeto foi **100% gerado por IA generativa**, utilizando o **gemani Assistent**. Todo o código, estrutura e conteúdo foram criados automaticamente, sem desenvolvimento manual direto.

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
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/app_db?schema=public"
JWT_SECRET="seu_segredo_aqui"
```

📌 **Importante:**

- O host (`postgres`) deve ser o **nome do serviço do banco** definido no `docker-compose.yml`.
- Essas credenciais devem bater com as variáveis `POSTGRES_USER`, `POSTGRES_PASSWORD` e `POSTGRES_DB`.

Observação importante sobre ambiente local vs Docker:

- **Ao rodar via Docker Compose:** o `DATABASE_URL` deve apontar para o host `postgres` (nome do serviço do compose). Exemplo:

```env
DATABASE_URL="postgresql://postgres:postgres@postgres:5432/app_db?schema=public"
```

- **Ao rodar localmente (sem Docker):** o `DATABASE_URL` deve apontar para `localhost` (ou outro host acessível localmente). Exemplo:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/app_db?schema=public"
```

Se você mantém o mesmo `.env` para ambos os cenários, a aplicação tenta resolver o host presente na variável. Para evitar conflitos ao rodar localmente (quando o `.env` aponta para `postgres`), há uma pequena lógica no código (`src/services/prisma.ts`) que substitui `@postgres:` por `@localhost:` quando `NODE_ENV` não é `production` e `IN_DOCKER` não está definido.

Isso permite que você:

- Rode a API com Docker Compose sem alterações (o container resolve `postgres`).
- Rode a API localmente com `npm run dev` sem precisar editar o `.env` (desde que você não defina `IN_DOCKER=true`).

---

### Dependências e comandos úteis

- **Instalar dependências (local):**

```bash
npm install
```

- **Rodar em desenvolvimento (local):**

```bash
PORT=3001 npm run dev
```

> Use `PORT` diferente se a porta 3000 já estiver ocupada.

- **Construir e rodar com Docker Compose (recomendado):**

```bash
docker compose up -d --build
```

- **Executar migrations manualmente (no contexto do compose):**

```bash
docker compose run --rm app npx prisma migrate dev
```

- **Executar migrations localmente (sem Docker):**

```bash
npx prisma migrate dev
```

- **Rodar seeds (populate):**

```bash
docker compose run --rm app npx prisma db seed
```

---

Se quiser, eu posso adicionar instruções para rodar testes automatizados (Jest + Supertest).

**Collection de API (Postman / Insomnia)**

Você pode usar a collection `collections_shopping_cart.yml` incluída no repositório para facilitar chamadas às APIs e testes manuais.

- **Baixar o arquivo:** ele está disponível na raiz do repositório com o nome `collections_shopping_cart.yml`. Você pode baixar diretamente do repositório (GitHub/Gitlab) ou copiar o arquivo localmente.

- **Importar no Postman:** `File` → `Import` → selecione `collections_shopping_cart.yml`.

- **Importar no Insomnia:** `Create` → `Import/Export` → `Import Data` → selecione o arquivo YAML.

- **O que inclui:** requests pré-configurados para `register`, `login`, criação de produtos e operações do carrinho (adicionar, listar, remover). Basta ajustar o `baseUrl` e o token (`Authorization: Bearer <token>`) após o login.

Esse arquivo acelera testes manuais e serve como referência para os endpoints disponíveis.

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
