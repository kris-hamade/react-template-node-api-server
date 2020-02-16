FROM node:8.7.0-alpine

# Create app directory and use it as the working directory
RUN mkdir -p /srv/app/REPLACE_ME
WORKDIR /srv/app/REPLACE_ME

COPY package.json /srv/app/REPLACE_ME
COPY package-lock.json /srv/app/REPLACE_ME

RUN npm install

RUN apk update 

RUN apk add curl

COPY . /srv/app/REPLACE_ME

RUN npm run build

CMD [ "node", "server.js" ]