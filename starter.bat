@echo off
setlocal enabledelayedexpansion

set BUILD=false

REM Verifica se a flag --build ou -b foi passada
for %%A in (%*) do (
    if "%%A"=="--build" set BUILD=true
    if "%%A"=="-b" set BUILD=true
)

if "%BUILD%"=="true" (
    echo Iniciando a execucao do Maven clean install nos projetos...
    set SERVICES=backend-services-utils saga-orchestration-service autenticacao-service cliente-service reserva-service voo-service funcionario-service

    for %%S in (!SERVICES!) do (
        echo executando %%S
        mvn clean install -q -DskipTests -f backend\%%S\pom.xml
        if !errorlevel! neq 0 (
            echo Erro ao executar o Maven no %%S. Saindo...
            exit /b !errorlevel!
        )
    )

    echo Maven clean install concluido com sucesso em todos os projetos.
) else (
    echo Flag --build ou -b não detectada. Pulando a etapa de Maven clean install.
)

echo Iniciando o Docker Compose...
docker compose down
if %errorlevel% neq 0 (
    echo Erro ao executar o Docker Compose Down. Saindo...
    exit /b %errorlevel%
)

docker compose -f docker-compose.yml up -d --build
if %errorlevel% neq 0 (
    echo Erro ao executar o Docker Compose Up. Saindo...
    exit /b %errorlevel%
)

echo Docker Compose iniciado com sucesso.