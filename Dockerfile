FROM node:11.7.0-alpine

RUN npm install -g gulp typings@1.4.0

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install

COPY typings.json ./

RUN typings install

COPY . .
