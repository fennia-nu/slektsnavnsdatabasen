ARG DB_FILE_NAME=database/slektsnavn.db

FROM imbios/bun-node:1-20-slim AS build
RUN apt-get update && apt-get install -y build-essential
WORKDIR /usr/src/app

FROM build AS install
# Install build dependencies
RUN mkdir -p /temp/dev
COPY package.json bun.lockb /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile
# Install production dependencies
RUN mkdir -p /temp/prod
COPY package.json bun.lockb /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

FROM build AS populate-db
ARG DB_FILE_NAME
COPY --from=install /temp/dev/node_modules node_modules
COPY database database
COPY drizzle drizzle
COPY drizzle.config.ts drizzle.config.ts
COPY package.json package.json
ENV NODE_ENV=production
ENV DB_FILE_NAME=$DB_FILE_NAME
RUN bun run db:migrate
RUN bun run db:seed

FROM build AS prerelease
ARG DB_FILE_NAME
COPY --from=install /temp/dev/node_modules node_modules
COPY . .
ENV NODE_ENV=production
ENV DB_FILE_NAME=$DB_FILE_NAME
RUN bun run build

FROM oven/bun:1-slim
WORKDIR /app
ARG DB_FILE_NAME
ENV DB_FILE_NAME=$DB_FILE_NAME
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=populate-db /usr/src/app/$DB_FILE_NAME $DB_FILE_NAME
COPY --from=prerelease /usr/src/app/package.json .
COPY --from=prerelease /usr/src/app/build build
USER bun
EXPOSE 3000/tcp
ENTRYPOINT [ "bun", "start" ]
