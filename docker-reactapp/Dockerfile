# Build Production Bundle

FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json .

RUN npm install --force

COPY . .

RUN npm run build

# Serve Bundle with Web Server

FROM nginx:1.27.0 AS server

COPY --from=build /app/build /usr/share/nginx/html
