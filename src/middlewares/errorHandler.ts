import { Request, Response, NextFunction } from 'express';

interface AppError extends Error {
    statusCode?: number;
}

const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
    // Log do erro no console do servidor
    console.error("========================================");
    console.error(`[ERRO] ${new Date().toISOString()}`);
    console.error(`Rota: ${req.method} ${req.originalUrl}`);
    console.error("Mensagem:", err.message);
    console.error("Stack:", err.stack);
    console.error("========================================");

    // Envia uma resposta de erro genérica para o cliente
    res.status(500).json({
        message: 'Ocorreu um erro inesperado no servidor.',
    });
};

export default errorHandler;

