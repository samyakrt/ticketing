FROM node:18-alpine as shared
WORKDIR /app/builder

ARG FOLDER

COPY ./shared ./shared
COPY package.json .
COPY yarn.lock .
COPY ${FOLDER}/package.json ./${FOLDER}
RUN yarn install

FROM node:18-alpine

ARG FOLDER

WORKDIR /app/builder

COPY --from=shared /app/builder/shared ./shared
COPY --from=shared /app/builder/package.json ./
COPY --from=shared /app/builder/yarn.lock ./
COPY --from=shared /app/builder/node_modules/ ./
COPY ./${FOLDER} ./${FOLDER}
# COPY --from=shared /app/builder/${FOLDER}/node_modules ./${FOLDER}/

CMD yarn workspace ${FOLDER} start:dev
