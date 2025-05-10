FROM node:lts-bullseye

WORKDIR /app

# Copia os arquivos de dependências para o diretório de trabalho
COPY package.json package-lock.json* ./
RUN npm ci

COPY index.js ./
COPY src/ ./src/

EXPOSE 3030
CMD ["npm", "start"]