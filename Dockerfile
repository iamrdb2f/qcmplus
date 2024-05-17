# Use an official Maven image to build the application
FROM maven:3.8.4-openjdk-17-slim AS build

# Set the working directory
WORKDIR /app

# Copy the pom.xml file and the source code
COPY pom.xml .
COPY src ./src
COPY qcmplusweb ./qcmplusweb

# Package the application
RUN mvn clean package -DskipTests

# Use an official OpenJDK runtime as the base image
FROM openjdk:17-jdk-slim

# Set the working directory
WORKDIR /app

# Copy the WAR file from the build stage
COPY --from=build /app/target/*.war /app/qcmplus.war

# Expose the port
EXPOSE 8080

# Set the entrypoint to run the application
ENTRYPOINT ["java", "-jar", "/app/qcmplus.war"]
