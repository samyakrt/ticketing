FROM node:18-alpine

ARG FOLDER

WORKDIR /app/builder

COPY package.json .
COPY yarn.lock .

COPY ./shared ./shared
COPY ./${FOLDER}/package.json ./${FOLDER}/package.json

RUN yarn install --omit=dev
COPY ./${FOLDER} ./${FOLDER}

CMD yarn workspace ${FOLDER} start:dev
