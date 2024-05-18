# Use an official Maven image to build the application
FROM maven:3.8.4-openjdk-17-slim AS build
WORKDIR /app

# Copy only the pom.xml initially to leverage Docker cache
COPY pom.xml .
RUN mvn dependency:go-offline

COPY src ./src
COPY qcmplusweb ./qcmplusweb
RUN mvn clean package -DskipTests && rm -rf /root/.m2

# Use an official OpenJDK runtime as the base image
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /app/target/*.war /app/qcmplus.war
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/qcmplus.war"]
