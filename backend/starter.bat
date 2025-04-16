@echo off
echo Iniciando a execução do Maven clean install nos projetos...

cd backend-services-utils
mvn clean install -q -DskipTests
if %errorlevel% neq 0 (
    echo Erro ao executar o Maven no backend-services-utils. Saindo...
    exit /b %errorlevel%
)
cd ..

cd saga-orchestration-service
mvn clean install -q -DskipTests
if %errorlevel% neq 0 (
    echo Erro ao executar o Maven no saga-orchestration-service. Saindo...
    exit /b %errorlevel%
)
cd ..

cd autenticacao-service
mvn clean install -q -DskipTests
if %errorlevel% neq 0 (
    echo Erro ao executar o Maven no autenticacao-service. Saindo...
    exit /b %errorlevel%
)
cd ..

cd cliente-service
mvn clean install -q -DskipTests
if %errorlevel% neq 0 (
    echo Erro ao executar o Maven no cliente-service. Saindo...
    exit /b %errorlevel%
)
cd ..

cd reserva-service
mvn clean install -q -DskipTests
if %errorlevel% neq 0 (
    echo Erro ao executar o Maven no reserva-service. Saindo...
    exit /b %errorlevel%
)
cd ..

cd voo-service
mvn clean install -q -DskipTests
if %errorlevel% neq 0 (
    echo Erro ao executar o Maven no voo-service. Saindo...
    exit /b %errorlevel%
)
cd ..

cd funcionario-service
mvn clean install -q -DskipTests
if %errorlevel% neq 0 (
    echo Erro ao executar o Maven no funcionario-service. Saindo...
    exit /b %errorlevel%
)
cd ..

echo Maven clean install concluído com sucesso em todos os projetos.

echo Iniciando o Docker Compose...
docker compose up --build -d
if %errorlevel% neq 0 (
    echo Erro ao executar o Docker Compose. Saindo...
    exit /b %errorlevel%
)

echo Docker Compose iniciado com sucesso.