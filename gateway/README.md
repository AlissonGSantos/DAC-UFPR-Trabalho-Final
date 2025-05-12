# API Gateway

Este projeto é o gateway da aplicação, responsável por gerenciar as requisições entre os clientes e os serviços internos. Ele atua como um ponto central de entrada para a comunicação com os microserviços, garantindo segurança, roteamento e controle de acesso.

## Estrutura do Projeto

- **index.js**: Arquivo principal que inicializa o servidor e configura o middleware, incluindo CORS e logging.
- **src/config/corsConfig.js**: Configuração de CORS para permitir apenas origens e métodos específicos.
- **src/routes/routes.js**: Define as rotas disponíveis no gateway e os controladores associados.
- **src/controllers/**: Contém os controladores responsáveis por processar as requisições e interagir com os serviços.
- **src/services/**: Contém os serviços que fazem chamadas HTTP para os microserviços internos.

## Principais Rotas

- **Autenticação**: `/login`, `/logout`
- **Clientes**: `/clientes`, `/clientes/:id`, `/clientes/:id/milhas`, `/clientes/:id/reservas`
- **Funcionários**: `/funcionarios`, `/funcionarios/:id`
- **Voos**: `/voos`, `/voos/:id`, `/voos/:id/estado`, `/aeroportos`
- **Reservas**: `/reservas`, `/reservas/:id`, `/reservas/:id/estado`

## Variáveis de Ambiente

As seguintes variáveis de ambiente são necessárias para o funcionamento do gateway:

- **`FRONTEND_URL`**: URL do frontend para configurar CORS (padrão: `http://localhost:3000`).
- **`RESERVA_SERVICE_URL`**: URL do serviço de reservas.
- **`SAGA_ORCHESTRATOR_URL`**: URL do orquestrador SAGA.
- **`VOO_SERVICE_URL`**: URL do serviço de voos.
- **`FUNCIONARIO_SERVICE_URL`**: URL do serviço de funcionários.
- **`CLIENTE_SERVICE_URL`**: URL do serviço de clientes.
- **`AUTH_SERVICE_URL`**: URL do serviço de autenticação.

## Como Executar

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Configure as variáveis de ambiente em um arquivo `.env`:
   ```
   FRONTEND_URL=http://localhost:3000
   RESERVA_SERVICE_URL=http://reserva-service:3001
   SAGA_ORCHESTRATOR_URL=http://saga-orchestrator:3002
   VOO_SERVICE_URL=http://voo-service:3003
   FUNCIONARIO_SERVICE_URL=http://funcionario-service:3004
   CLIENTE_SERVICE_URL=http://cliente-service:3005
   AUTH_SERVICE_URL=http://auth-service:3006
   ```

3. Inicie o servidor:
   ```bash
   npm start
   ```

4. O gateway estará disponível em `http://localhost:3030/api/v1`.

## Docker

Para executar o gateway em um contêiner Docker:

1. Construa a imagem:
   ```bash
   docker build -t gateway .
   ```

2. Execute o contêiner:
   ```bash
   docker run -p 3030:3030 --env-file .env gateway
   ```

## Logs

O gateway registra todas as requisições com informações de método, URL, status e tempo de resposta.