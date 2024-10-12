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

FROM build AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .
ENV NODE_ENV=production
ENV DB_FILE_NAME=slektsnavn.db
RUN bun run db:migrate
RUN bun run db:seed
RUN bun run build

FROM oven/bun:1
WORKDIR /app
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /usr/src/app/package.json .
COPY --from=prerelease /usr/src/app/build build
COPY --from=prerelease /usr/src/app/slektsnavn.db .
ENV DB_FILE_NAME=slektsnavn.db
USER bun
EXPOSE 3000/tcp
ENTRYPOINT [ "bun", "start" ]
