# Étape de construction
FROM node:18-alpine AS build

WORKDIR /app

# Copier les fichiers de dépendances et installer les dépendances
COPY package.json package-lock.json ./
RUN npm install
COPY . .

# Construire l'application
RUN npm run build

# Étape de production
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80

# Commande pour démarrer nginx
CMD ["nginx", "-g", "daemon off;"]
