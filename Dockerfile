# Build stage
FROM node:18-alpine as builder

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar el resto del código fuente
COPY . .

# Construir la aplicación
RUN npm run build

# Production stage
FROM node:18-alpine as production

WORKDIR /app

# Instalar servidor estático global
RUN npm install -g serve

# Copiar los archivos construidos desde la etapa anterior
COPY --from=builder /app/dist ./dist

# Exponer el puerto
EXPOSE 4321

# Comando para iniciar el servidor (sin -s para servir archivos estáticos correctamente)
CMD ["serve", "dist", "-l", "4321"] 