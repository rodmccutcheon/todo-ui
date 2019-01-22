FROM node:11.7.0-alpine

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install

COPY typings.json ./

RUN typings install

COPY . .
