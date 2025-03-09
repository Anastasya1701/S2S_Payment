FROM node:20-alpine
WORKDIR /app

COPY frontend/package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY frontend ./frontend

WORKDIR /app/frontend

RUN yarn build

CMD ["yarn", "start"]
