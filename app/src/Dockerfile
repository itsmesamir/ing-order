FROM node:alpine as client

WORKDIR /app

COPY package.json /app

RUN yarn install --omit=dev

COPY ./ ./

CMD yarn run dev