# Étape 1 : Build de l'application React
FROM node:18-alpine as builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Étape 2 : Servir l'application avec Nginx
FROM nginx:alpine

# Copie les fichiers de build de React vers le répertoire de service de Nginx
COPY --from=builder /app/build /usr/share/nginx/html

# Copie une configuration Nginx personnalisée si nécessaire (optionnel pour cet exemple)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]