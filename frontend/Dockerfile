FROM node:20-alpine
WORKDIR /app

COPY frontend/package.json yarn.lock ./

RUN yarn install --frozen-lockfile
RUN yarn list react-scripts || yarn add react-scripts

COPY frontend ./frontend

WORKDIR /app/frontend

RUN yarn build

CMD ["yarn", "start"]
