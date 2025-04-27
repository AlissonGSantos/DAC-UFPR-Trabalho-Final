#!/bin/bash

set -e  # Interrompe o script em caso de erro

echo "Iniciando a execução do Maven clean install nos projetos..."

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

echo "Iniciando o Docker Compose..."
docker compose up --build -d
if [ $? -ne 0 ]; then
    echo "Erro ao executar o Docker Compose. Saindo..."
    exit 1
fi

echo "Docker Compose iniciado com sucesso."