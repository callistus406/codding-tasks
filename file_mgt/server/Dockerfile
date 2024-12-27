FROM node:18.15.0 AS base

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install 

RUN yarn global add ts-node

ENV PATH /app/node_modules/.bin:/usr/local/lib/node_modules:$PATH

COPY . ./

ENV PORT=3400

EXPOSE 3400

FROM base AS development
ENV NODE_ENV=development

CMD ["yarn", "dev"]