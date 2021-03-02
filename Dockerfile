FROM node:15.10.0-alpine3.10

EXPOSE 3000

WORKDIR /app

COPY server/package*.json ./server/

RUN npm i --prefix server

COPY . .

RUN ./server/node_modules/.bin/tsc -p server --outDir server/.build

CMD ["node", "server/.build/src/index.js"]