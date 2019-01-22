FROM node:latest-alpine

WORKDIR /usr/src/app

# Install the dependencies in stages so they are cached in layers
COPY package*.json ./
RUN npm install

COPY typings.json ./
RUN typings install

COPY . .
