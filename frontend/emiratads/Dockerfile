# Use uma imagem Node LTS como base
FROM node:lts-bullseye

# Diretório de trabalho no container
WORKDIR /app

# Copie os arquivos de dependências
COPY package.json package-lock.json* ./

# Instale as dependências
RUN npm ci

# Copie o código-fonte
COPY . .

# Construa o aplicativo
RUN npm run build

# Exponha a porta que o Next.js usa
EXPOSE 3000

# Comando para iniciar o aplicativo
CMD ["npm", "start"]