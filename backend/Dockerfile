# Imagem base do Java para a aplicação
FROM openjdk:17-alpine

WORKDIR /app

# Copia os arquivos da pasta target para a imagem Docker
COPY target /app/target

# Filtra a pasta target pelo arquivo jar e salva seu nome na variável ARTIFACT_NAME
RUN ARTIFACT_NAME=$(find /app/target -name "*.jar" | head -n 1 | xargs -n 1 basename) && \
    if [ -n "$ARTIFACT_NAME" ]; then \
        cp /app/target/$ARTIFACT_NAME /app/$ARTIFACT_NAME; \
    else \
        echo "No JAR file found in target directory"; \
        exit 1; \
    fi

ENTRYPOINT ["sh", "-c", "java -jar /app/$(find /app -name '*.jar' | head -n 1 | xargs -n 1 basename)"]