# Documentation of the New_QCM_Plus_V1 project
qcmplus, is a platform dedicated to skills management and assessment. 

## Docker Setup
Ensure you have the following installed before proceeding:

    Docker: Download and install Docker from Docker Hub.
    Docker Compose: Included with Docker Desktop, used for managing multi-container applications.

## Building Services
Build or rebuild services:
### `docker-compose build`
Force a rebuild without using any cache:
### `docker-compose build --no-cache`

## Starting Services
To start all services as defined in your docker-compose.yml, run the application in detached mode:
### `docker-compose up -d`

## Logs
View logs from all running containers:
### `docker-compose logs`
To view logs for a specific service:
### `docker-compose logs [service_name]`

## Stopping the Application
Stop and remove all containers, networks, and volumes:
### `docker-compose down`





  