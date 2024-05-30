# QCMPLUS
![Texte alternatif](qcmplusweb/public/qcmplus_logo.png)
## Aperçu du Projet

QCMPLUS est une plateforme complète conçue pour gérer efficacement les quiz et les questionnaires. La structure du projet comprend divers composants pour les contrôleurs, les modèles, les dépôts et les services, permettant une architecture robuste et évolutive.

## Table des Matières

- [Aperçu du Projet](#aperçu-du-projet)
- [Structure du Projet](#structure-du-projet)
- [Installation](#installation)
- [Utilisation](#utilisation)
- [Contribution](#contribution)
- [Travail en Équipe](#travail-en-Équipe)
- [Licence](#licence)
- [Contact](#contact)

## Structure du Projet

- Java `version 17`
- Spring Boot  `version 3.2.4`
- Maven `version 3.9.6`

Le projet est organisé en plusieurs répertoires et fichiers :

    qcmplus
    │
    ├── .idea
    ├── qcmplusweb
    ├── src
    │ ├── main
    │ │ └── java
    │ │ └── com.qcmplus.qcmplus
    │ │ ├── controller
    │ │ ├── model
    │ │ ├── repository
    │ │ └── service
    │ └── test
    ├── target
    ├── .env
    ├── .gitignore
    ├── docker-compose.yml
    ├── Dockerfile
    ├── LICENSE
    ├── package-lock.json
    ├── pom.xml
    ├── qcmplus.iml
    └── README.md


### Répertoires et Fichiers Clés

- **qcmplus/qcmplusweb** : Contient le projet frontend web développé avec React.
- **src/main/java/com.qcmplus.qcmplus** : Contient les fichiers source Java principaux organisés en packages `controller`, `model`, `repository` et `service`.
- **src/test** : Contient les cas de test de l'application.
- **docker-compose.yml** : Définit les services Docker pour l'application.
- **Dockerfile** : Dockerfile pour construire l'image de l'application.
- **pom.xml** : Fichier de configuration Maven.
- **.env** : Fichier des variables d'environnement.
- **.gitignore** : Spécifie les fichiers et répertoires à ignorer par Git.

## Installation

Pour configurer le projet localement, suivez ces étapes :

1. **Cloner le dépôt :**
   ```bash
   git clone https://github.com/yourusername/qcmplus.git
   cd qcmplus

   Configurer l'environnement : 
   Install MYSQL/DB
   Assurez-vous d'avoir un fichier .env avec les variables d'environnement nécessaires.


2. **Configurer l'environnement :**

   Installer MySQL :

   Téléchargez et installez MySQL à partir de MySQL Downloads.
   Créez une base de données MySQL pour le projet.

Configurer les variables d'environnement :

    Créez un fichier .env à la racine du projet avec les variables suivantes :

      DB_HOST=localhost
      DB_PORT=3306
      DB_NAME=qcmplus
      DB_USER=root
      DB_PASSWORD=yourpassword

Remplacez yourpassword par le mot de passe de l'utilisateur MySQL.

3. **Setup-local**

- cd qcmplus     
  `mvn clean install` //Construire le projet

- cd qcmplus/qcmplusweb
- Install dependencies `npm install`
- Run `npm run start`
- Visit `http://localhost:3000/`




3. **Docker Setup :**       
   Assurez-vous d'avoir installé les éléments suivants avant de continuer :


    Docker : Téléchargez et installez Docker depuis Docker Hub.
    Docker Compose : Inclus avec Docker Desktop, utilisé pour gérer des applications multi-conteneurs.

**Construction des Services**

Construire ou reconstruire les services :

`docker-compose build`

Forcer une reconstruction sans utiliser le cache :

`docker-compose build --no-cache`

**Démarrage des Services**

Pour démarrer tous les services définis dans votre docker-compose.yml, exécutez l'application en mode détaché :

`docker-compose up -d`

**Journaux**

Voir les journaux de tous les conteneurs en cours d'exécution :

`docker-compose logs`

Pour voir les journaux d'un service spécifique :

`docker-compose logs [nom_du_service]`

**Arrêt de l'Application**

Arrêter et supprimer tous les conteneurs, réseaux et volumes :

`docker-compose down`



## Contribution

### Branches Principales

- **master** : Branche destinée à la production. Cette branche contient le code stable et prêt à être déployé.
- **develop** : Branche destinée au développement backend. Elle est utilisée pour intégrer les nouvelles fonctionnalités et les corrections de bugs avant de les fusionner dans `master`.
- **develop-front** : Branche destinée au développement frontend. Comme `develop`, elle sert à intégrer les nouvelles fonctionnalités et les corrections de bugs pour la partie frontend avant de les fusionner dans `master`.

### Branches Locales et Distantes

L'image montre plusieurs branches locales (comme `develop`, `master`, `features/QCMPLUS-103`, etc.) et des branches distantes (comme `origin/develop`, `origin/master`, etc.). Les branches locales sont celles sur lesquelles vous travaillez directement sur votre machine, tandis que les branches distantes sont celles sur le dépôt distant (par exemple, GitHub).

### Convention de Nommage

Le projet utilise une convention de nommage claire pour les branches, indiquant leur but. Par exemple, `features/QCMPLUS-103` indique une branche dédiée à une fonctionnalité spécifique liée à un ticket ou une tâche numérotée `QCMPLUS-103`.

mvn clean install //Construire le projet

- cd qcmplus/qcmplusweb
- Install dependencies `npm install`
- Run `npm run start`
- Visit `http://localhost:3000/`




3. **Docker Setup :**       
   Assurez-vous d'avoir installé les éléments suivants avant de continuer :


    Docker : Téléchargez et installez Docker depuis Docker Hub.
    Docker Compose : Inclus avec Docker Desktop, utilisé pour gérer des applications multi-conteneurs.

**Construction des Services**

Construire ou reconstruire les services :

`docker-compose build`

Forcer une reconstruction sans utiliser le cache :

`docker-compose build --no-cache`

**Démarrage des Services**

Pour démarrer tous les services définis dans votre docker-compose.yml, exécutez l'application en mode détaché :

`docker-compose up -d`

**Journaux**

Voir les journaux de tous les conteneurs en cours d'exécution :

`docker-compose logs`

Pour voir les journaux d'un service spécifique :

`docker-compose logs [nom_du_service]`

**Arrêt de l'Application**

Arrêter et supprimer tous les conteneurs, réseaux et volumes :

`docker-compose down`



## Contribution

### Branches Principales

- **master** : Branche destinée à la production. Cette branche contient le code stable et prêt à être déployé.
- **develop** : Branche destinée au développement backend. Elle est utilisée pour intégrer les nouvelles fonctionnalités et les corrections de bugs avant de les fusionner dans `master`.
- **develop-front** : Branche destinée au développement frontend. Comme `develop`, elle sert à intégrer les nouvelles fonctionnalités et les corrections de bugs pour la partie frontend avant de les fusionner dans `master`.

### Branches Locales et Distantes

Les branches locales sont comme `develop`, `master`, `features/QCMPLUS-103`, etc.)
Les branches distantes sont  comme `origin/develop`, `origin/master`, etc.).
### Convention de Nommage

Le projet utilise une convention de nommage claire pour les branches, indiquant leur but. Par exemple, `features/QCMPLUS-103` indique une branche dédiée à une fonctionnalité spécifique liée à un ticket ou une tâche numérotée `QCMPLUS-103`.

