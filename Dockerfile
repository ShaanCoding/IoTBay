# Deps
FROM node:19-alpine as basebackend
WORKDIR /app
# RUN apk update --no-cache
# RUN apk add --no-cache python3 make gcc g++ bash curl
COPY package.json yarn.lock tsconfig.json ./
COPY packages/backend/package.json packages/backend/tsconfig.json packages/backend/tsup.config.ts packages/backend/prisma ./packages/backend/

FROM node:19-alpine as basefrontend
WORKDIR /app
# RUN apk update --no-cache
# RUN apk add --no-cache python3 make gcc g++ bash curl
COPY package.json yarn.lock tsconfig.json ./
COPY packages/frontend/package.json packages/frontend/tsconfig.json packages/frontend/tsconfig.node.json packages/frontend/vite.config.ts packages/frontend/index.html ./packages/frontend/



FROM basefrontend as buildfrontend
WORKDIR /app
RUN yarn workspace frontend install --frozen-lockfile
COPY packages/frontend/src ./packages/frontend/src
RUN yarn workspace frontend build

# Build Backend
FROM basebackend as buildbackend
WORKDIR /app
RUN yarn workspace backend install --frozen-lockfile
COPY packages/backend/src ./packages/backend/src
COPY --from=buildfrontend /app/packages/frontend/dist ./packages/backend/public
RUN yarn workspace backend generate
RUN yarn workspace backend build

# Runner
FROM basebackend as runner
WORKDIR /app

ENV NODE_ENV="production"
ENV DATABASE_URL="file:/app/config/db.sqlite"
COPY --from=buildbackend /app/node_modules/.prisma /app/node_modules/.prisma
COPY --from=buildbackend /app/packages/backend/dist packages/backend/dist
COPY --from=buildbackend /app/packages/backend/public packages/backend/public
# TODO: the above key changes on every build, so we need to find a way to persist it
# COPY --from=build /app/prisma prisma
EXPOSE 3000
RUN yarn install --production --frozen-lockfile
CMD yarn workspace backend migrate && yarn workspace backend start