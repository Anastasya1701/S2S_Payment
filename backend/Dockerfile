FROM node:20-alpine
WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile
RUN yarn global add @nestjs/cli

COPY backend ./backend
WORKDIR /app/backend

RUN yarn build
CMD ["yarn", "start"]
