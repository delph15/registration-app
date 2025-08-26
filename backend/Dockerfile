# Utilise une image Node.js officielle comme base
FROM node:18-alpine

# Définit le répertoire de travail dans le conteneur
WORKDIR /app

# Copie package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Installe les dépendances du projet
RUN npm install

# Copie le reste du code de l'application
COPY . .

# Expose le port sur lequel l'application Express écoute
EXPOSE 5000

# Commande pour démarrer l'application
CMD ["npm", "start"]