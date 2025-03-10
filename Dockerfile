FROM node:20-alpine
WORKDIR /app

COPY backend/package.json yarn.lock ./

RUN yarn install --frozen-lockfile
RUN yarn global add @nestjs/cli

COPY backend ./backend

WORKDIR /app/backend

RUN apk add --no-cache curl

RUN yarn build

CMD ["yarn", "start"]
