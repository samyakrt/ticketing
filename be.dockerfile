FROM node:18-alpine

WORKDIR /app/builder

COPY package.json ./
COPY yarn.lock ./

COPY auth ./auth

RUN ["yarn","install"]

CMD ["yarn","workspace","auth","start:dev"]
