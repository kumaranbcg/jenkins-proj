FROM node:10-alpine
WORKDIR /home/node/app
COPY package*.json ./
RUN npm install
RUN apk --no-cache add curl
COPY --chown=node:node . .
EXPOSE 2173
CMD [ "npm", "start" ]