# Utiliser une image Maven officielle
FROM maven:3.8.4-openjdk-17-slim AS build

WORKDIR /app

# Copier seulement le fichier pom.xml pour utiliser le cache Docker
COPY pom.xml ./
RUN mvn dependency:go-offline

# Copier les fichiers sources et de l'application web
COPY src ./src
COPY qcmplusweb ./qcmplusweb

# Construire l'application et nettoyer le répertoire des dépendances
RUN mvn clean package -DskipTests && rm -rf /root/.m2

# Use an official OpenJDK runtime as the base image
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /app/target/*.war /app/qcmplus.war
EXPOSE 8080

# Définir le point d'entrée pour démarrer l'application
ENTRYPOINT ["java", "-jar", "/app/qcmplus.war"]
