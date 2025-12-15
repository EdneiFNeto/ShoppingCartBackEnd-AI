import express from 'express';
import dotenv from 'dotenv';
import routes from './routes';
import errorHandler from './middlewares/errorHandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para interpretar JSON no corpo das requisições
app.use(express.json());

// Rotas da API
app.use('/api', routes);

// Middleware de tratamento de erros (deve ser o último)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

