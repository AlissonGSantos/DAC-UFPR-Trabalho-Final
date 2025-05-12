# Backend - EmiraTADS Airlines

Este diretório contém os serviços backend do sistema EmiraTADS Airlines, desenvolvidos para gerenciar reservas, voos, clientes, funcionários e autenticação.

## Estrutura do Projeto

O backend é composto por múltiplos serviços independentes, cada um responsável por uma parte específica do sistema. Abaixo está um resumo dos serviços:

### Serviços

1. **Voo Service (`voo-service`)**  
   Gerencia informações relacionadas a voos, como criação, cancelamento e consulta de voos.

2. **Reserva Service (`reserva-service`)**  
   Responsável por gerenciar reservas de voos, incluindo criação, cancelamento e consulta de reservas.

3. **Cliente Service (`cliente-service`)**  
   Gerencia informações de clientes, incluindo cadastro, atualização e gerenciamento de milhas.

4. **Funcionário Service (`funcionario-service`)**  
   Gerencia informações de funcionários, incluindo cadastro e autenticação.

5. **Autenticação Service (`autenticacao-service`)**  
   Responsável por autenticar usuários (clientes e funcionários) e gerenciar tokens JWT.

6. **Saga Orchestration Service (`saga-orchestration-service`)**  
   Orquestra processos distribuídos, como criação e cancelamento de reservas, utilizando RabbitMQ.

### Estrutura de Pastas

Cada serviço possui a seguinte estrutura básica:
- `src/main/kotlin`: Código-fonte principal.
- `src/main/resources`: Arquivos de configuração, como `application.yaml`.
- `Dockerfile`: Configuração para criar imagens Docker do serviço.

## Como Trabalhar com os Projetos

### Pré-requisitos

- **Java 17**: Certifique-se de ter o JDK 17 instalado.
- **Docker e Docker Compose**: Para rodar os serviços e dependências como RabbitMQ e PostgreSQL.
- **Maven**: Para gerenciar dependências e compilar os projetos.

### Configuração

1. **Configuração de Variáveis de Ambiente**  
   Certifique-se de configurar as variáveis de ambiente necessárias, como `GATEWAY_URL` e `EMAIL_APP_PASSWORD`.

2. **Banco de Dados**  
   Os serviços utilizam PostgreSQL como banco de dados. Certifique-se de que o banco esteja configurado corretamente e que os esquemas correspondam aos definidos nos arquivos `application.yaml`.

3. **RabbitMQ**  
   RabbitMQ é usado para comunicação entre serviços. Certifique-se de que ele esteja rodando e configurado conforme os arquivos `RabbitMQConfig.kt`.

### Passos para Rodar os Serviços

1. **Compilar o Projeto**  
   Navegue até o diretório de cada serviço e execute:
   ```bash
   mvn clean install
   ```

2. **Rodar com Docker Compose**  
   No diretório raiz, execute:
   ```bash
   docker compose up --build
   ```
   Isso irá iniciar todos os serviços e suas dependências.

3. **Acessar os Serviços**  
   Cada serviço estará disponível em uma porta específica. Por exemplo:
   - `voo-service`: `http://localhost:8081`
   - `reserva-service`: `http://localhost:8082`
   - `cliente-service`: `http://localhost:8083`
   - `funcionario-service`: `http://localhost:8084`
   - `autenticacao-service`: `http://localhost:8085`

### Testando os Serviços

- Utilize ferramentas como **Postman** ou **cURL** para testar os endpoints.
- Certifique-se de que o gateway está configurado corretamente para rotear as requisições.

### Desenvolvimento

- Para adicionar novos recursos, edite os arquivos no diretório `src/main/kotlin` do serviço correspondente.
- Atualize os testes e certifique-se de que o código está coberto antes de fazer o deploy.

## Contato

Para dúvidas ou suporte, entre em contato com a equipe EmiraTADS.
