FROM node:lts-alpine

WORKDIR /opt/node-ts-seed

COPY build/ .

EXPOSE 8080

ENTRYPOINT node server
