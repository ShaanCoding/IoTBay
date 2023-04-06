# Deps
FROM node:19-alpine as base
WORKDIR /app
# RUN apk update --no-cache
# RUN apk add --no-cache python3 make gcc g++ bash curl
COPY package.json yarn.lock tsconfig.json tsup.config.ts prisma ./

# Build
FROM base as build
WORKDIR /app
RUN yarn install --frozen-lockfile
COPY src ./src
RUN yarn generate
RUN yarn generate-secret-key
RUN yarn build

# Runner
FROM base as runner
WORKDIR /app

ENV NODE_ENV="production"
ENV DATABASE_URL="file:/app/config/db.sqlite"
ARG VERSION
ENV VERSION=$VERSION
COPY --from=build /app/node_modules/.prisma /app/node_modules/.prisma
COPY --from=build /app/dist dist
COPY --from=build /app/secret_key secret_key
# COPY --from=build /app/prisma prisma
EXPOSE 3000
RUN yarn install --production --frozen-lockfile
CMD npx prisma migrate deploy && yarn start