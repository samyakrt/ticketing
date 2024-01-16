FROM node:18-alpine

ARG FOLDER

WORKDIR /app/builder

COPY package.json .
COPY yarn.lock .

COPY ./${FOLDER} ./${FOLDER}

RUN yarn install --omit=dev

CMD yarn workspace ${FOLDER} start:dev
