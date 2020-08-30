# build
FROM node:12 as build
WORKDIR /app
COPY . .

# install server deps and build
WORKDIR /app/server
RUN npm ci --production --silent
RUN npm run build

# install client deps and build
WORKDIR /app/client
RUN npm ci --production --silent
RUN npm run build

# copy files into server image
FROM node:12
COPY --from=build /app/server/build /app/server/build
COPY --from=build /app/server/node_modules /app/server/node_modules
COPY --from=build /app/server/package*.json /app/server/
COPY --from=build /app/client/build /app/client/build

# run server
WORKDIR /app/server
CMD ["npm", "start"]