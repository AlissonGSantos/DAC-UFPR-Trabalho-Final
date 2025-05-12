@echo off

set BUILD=false

REM Verifica se a flag --build ou -b foi passada
for %%A in (%*) do (
    if "%%A"=="--build" set BUILD=true
    if "%%A"=="-b" set BUILD=true
)

if "%BUILD%"=="true" (
    echo Iniciando a execução do Maven clean install nos projetos...
    cd backend
    set SERVICES=backend-services-utils saga-orchestration-service autenticacao-service cliente-service reserva-service voo-service funcionario-service

    for %%S in (%SERVICES%) do (
        cd %%S
        echo executando %%S
        mvn clean install -q -DskipTests
        if %errorlevel% neq 0 (
            echo Erro ao executar o Maven no %%S. Saindo...
            exit /b %errorlevel%
        )
        cd ..
    )

    echo Maven clean install concluído com sucesso em todos os projetos.
    cd ..
) else (
    echo Flag --build ou -b não detectada. Pulando a etapa de Maven clean install.
)

echo Iniciando o Docker Compose...
docker compose down
if %errorlevel% neq 0 (
    echo Erro ao executar o Docker Compose Down. Saindo...
    exit /b %errorlevel%
)

docker compose up --build -d
if %errorlevel% neq 0 (
    echo Erro ao executar o Docker Compose Up. Saindo...
    exit /b %errorlevel%
)

docker compose up --build -d --force-recreate dbdevelopment
if %errorlevel% neq 0 (
    echo Erro ao recriar o serviço dbdevelopment. Saindo...
    exit /b %errorlevel%
)

echo Docker Compose iniciado com sucesso.