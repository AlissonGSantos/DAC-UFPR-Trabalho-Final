#!/bin/bash

set -e  # Interrompe o script em caso de erro

BUILD=false

# Verifica se a flag --build ou -b foi passada
for arg in "$@"; do
    if [ "$arg" == "--build" ] || [ "$arg" == "-b" ]; then
        BUILD=true
        break
    fi
done

if [ "$BUILD" = true ]; then
    echo "Iniciando a execução do Maven clean install nos projetos..."
    cd ./backend

    for dir in backend-services-utils saga-orchestration-service autenticacao-service cliente-service reserva-service voo-service funcionario-service
    do
        echo "Executando Maven clean install no projeto: $dir"
        cd $dir
        mvn clean install -q -DskipTests
        if [ $? -ne 0 ]; then
            echo "Erro ao executar o Maven no projeto $dir. Saindo..."
            exit 1
        fi
        cd ..
    done

    echo "Maven clean install concluído com sucesso em todos os projetos."
    cd ..
else
    echo "Flag --build ou -b não detectada. Pulando a etapa de Maven clean install."
fi

echo "Iniciando o Docker Compose..."
docker compose down
docker compose up --build -d
docker compose up --build -d --force-recreate dbdevelopment
if [ $? -ne 0 ]; then
    echo "Erro ao executar o Docker Compose. Saindo..."
    exit 1
fi

echo "Docker Compose iniciado com sucesso."