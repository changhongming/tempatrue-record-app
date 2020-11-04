# Build Stage (Future need split out, can cache build data)
FROM node:15.0.1-alpine3.10 AS builder

WORKDIR /app
COPY . ./

# build image-webpack-loader need
RUN apk update && apk --no-cache add autoconf automake g++ make libpng-dev libtool nasm

RUN ["npm", "install"]
RUN ["npm", "run", "build"]


# Runtime Stage
FROM node:12.19.0-alpine3.9
WORKDIR /app
RUN apk update && apk --no-cache --update add mongodb bash
VOLUME [ "/data/db" ]

COPY --from=builder /app/dist ./dist/
COPY --from=builder /app/backend ./backend/
# WORKAROUND: install dependency conflict
COPY --from=builder /app/node_modules ./node_modules/
COPY --from=builder /app/.babelrc /app/package.json /app/docker-start.sh ./
# TODO: Check why install dependency conflict
# RUN ["npm", "install", "--production"]

EXPOSE 3000

CMD ./docker-start.sh
