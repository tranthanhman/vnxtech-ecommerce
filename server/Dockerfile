# server/Dockerfile
FROM node:20.19-alpine3.21

WORKDIR /var/www/html

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8090

CMD ["npm", "run", "dev"]
