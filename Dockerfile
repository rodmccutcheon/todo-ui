FROM node:11.7.0-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN npm install -g gulp typings@1.4.0

COPY package*.json ./
RUN npm install && npm link gulp

COPY typings.json ./
RUN typings install

COPY . .
