# docker run -i -t tellus-ui /bin/bash

FROM node:argon

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
COPY typings.json /usr/src/app/
RUN npm install -g gulp
RUN npm install -g typescript
RUN npm install -g typings
RUN npm install
RUN typings install

# Bundle app source
COPY . /usr/src/app

EXPOSE 8080