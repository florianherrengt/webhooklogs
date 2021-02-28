from node:15.10.0-alpine3.10

EXPOSE 3000

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY .dockerbuild ./

CMD ["node", "./src/index.js"]