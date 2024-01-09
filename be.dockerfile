FROM node:18-alpine

ARG FOLDER

WORKDIR /app/builder

COPY package.json .
COPY yarn.lock .

COPY ./${FOLDER} ./${FOLDER}

RUN yarn install

CMD yarn workspace ${FOLDER} start:dev
