# EmiraTADS Airlines - DAC UFPR Trabalho Final

Este repositório contém o projeto final da disciplina de Desenvolvimento de Aplicações Corporativas (DAC) da UFPR, intitulado **EmiraTADS Airlines**. O sistema simula uma companhia aérea, utilizando arquitetura de microsserviços, integração via API Gateway e frontend moderno.

## Visão Geral

O sistema é composto por três camadas principais:

- **Backend**: Conjunto de microsserviços responsáveis pela lógica de negócio, autenticação, orquestração de processos, comunicação assíncrona e persistência de dados.
- **Gateway**: API Gateway centraliza o acesso aos microsserviços, gerenciando autenticação, CORS, roteamento e logging.
- **Frontend**: Aplicação web desenvolvida em Next.js, responsável pela interface com o usuário.

## Estrutura do Projeto

```
.
├── backend/         # Microsserviços (Java/Kotlin, Spring Boot)
├── gateway/         # API Gateway (Node.js/Express)
├── frontend/        # Aplicação web (Next.js)
├── docker-compose.yml
├── .env, .example.env
└── README.md
```

### Backend

O backend é composto por múltiplos microsserviços independentes, cada um responsável por uma parte do domínio:

- **voo-service**: Gerencia voos (criação, consulta, cancelamento).
- **reserva-service**: Gerencia reservas de passagens.
- **cliente-service**: Cadastro e gerenciamento de clientes e milhas.
- **funcionario-service**: Cadastro e autenticação de funcionários.
- **autenticacao-service**: Autenticação de usuários e emissão de tokens JWT.
- **saga-orchestration-service**: Orquestra processos distribuídos (ex: criação/cancelamento de reservas) usando RabbitMQ.

Cada serviço possui:
- `src/main/kotlin`: Código-fonte principal.
- `src/main/resources`: Configurações (ex: `application.yaml`).
- `Dockerfile`: Para build e deploy via Docker.

### Gateway

O [gateway](gateway/README.md) é responsável por:

- Centralizar e rotear requisições para os microsserviços.
- Gerenciar autenticação e autorização.
- Configurar CORS para o frontend.
- Logging de requisições.

Principais rotas:
- `/login`, `/logout` (autenticação)
- `/clientes`, `/funcionarios`, `/voos`, `/reservas` e sub-rotas

Configuração via variáveis de ambiente (exemplo em `.env`):
```
FRONTEND_URL=http://localhost:3000
RESERVA_SERVICE_URL=http://reserva-service:3001
SAGA_ORCHESTRATOR_URL=http://saga-orchestrator:3002
VOO_SERVICE_URL=http://voo-service:3003
FUNCIONARIO_SERVICE_URL=http://funcionario-service:3004
CLIENTE_SERVICE_URL=http://cliente-service:3005
AUTH_SERVICE_URL=http://auth-service:3006
```

### Frontend

O frontend está em [frontend/emiratads](frontend/emiratads/README.md) e utiliza Next.js:

- Interface web moderna e responsiva.
- Comunicação com o gateway para autenticação, reservas, consulta de voos, etc.
- Para rodar em desenvolvimento:
  ```bash
  npm install
  npm run dev
  # ou yarn dev
  ```

## Como Executar o Projeto

1. **Pré-requisitos**: Java 17, Node.js, Docker e Docker Compose, Maven.
2. **Compilar os microsserviços**:
   ```bash
   cd backend/voo-service && mvn clean install
   # repita para cada serviço
   ```
3. **Subir os serviços com Docker Compose**:
   ```bash
   docker compose up --build
   ```
4. **Acessar**:
   - Frontend: http://localhost:3000
   - Gateway: http://localhost:3030/api/v1
   - Microsserviços: portas específicas (ver backend/README.md)

## Principais Características

- Arquitetura de microsserviços desacoplados.
- Comunicação assíncrona via RabbitMQ.
- Orquestração de processos distribuídos (SAGA).
- Autenticação JWT para clientes e funcionários.
- API Gateway centralizando segurança, roteamento e CORS.
- Frontend moderno com Next.js.
- Deploy simplificado via Docker Compose.

## Contato

Para dúvidas ou suporte, entre em contato com a equipe EmiraTADS.