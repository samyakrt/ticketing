FROM node:18-alpine

WORKDIR /usr/builder

EXPOSE 3000

COPY ./package.json ./
COPY client client
COPY ./yarn.lock ./

RUN yarn install

CMD ["yarn","workspace","client","dev"]
