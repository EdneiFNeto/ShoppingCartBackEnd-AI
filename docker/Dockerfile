# Use a imagem oficial do PostgreSQL como base
FROM postgres:16-alpine

# Define variáveis de ambiente para a configuração do banco de dados
# ATENÇÃO: Não coloque senhas diretamente aqui em produção. Use secrets.
ENV POSTGRES_USER=myuser
ENV POSTGRES_PASSWORD=mypassword
ENV POSTGRES_DB=mydatabase

# Copia scripts de inicialização para dentro da imagem.
# Scripts neste diretório serão executados na primeira vez que o contêiner for iniciado.
COPY init.sql /docker-entrypoint-initdb.d/

# Expõe a porta padrão do PostgreSQL
EXPOSE 5432
