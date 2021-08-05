FROM node:10-alpine
WORKDIR /home/node/app
COPY ./node_modules ./node_modules
COPY --chown=node:node . .
EXPOSE 2173
CMD [ "npm", "start" ]