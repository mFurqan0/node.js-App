FROM node:18-alpine


ENV MONGO_DB_USERNAME=admin \
    MONGO_DB_PWD=qwerty

RUN mkdir -p /testapp
WORKDIR /testapp

COPY package*.json ./
RUN npm install

COPY . .

CMD ["node", "/testapp/server.js"]