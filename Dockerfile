FROM node:15.10.0-alpine3.10

EXPOSE 3000

WORKDIR /app

COPY server/package*.json ./server/

RUN npm i --prefix server

COPY . .

CMD ["node", "server/.build/src/index.js"]