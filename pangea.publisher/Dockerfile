FROM node:lts-alpine3.13 AS build

WORKDIR /usr/src/app 
COPY package*.json ./
COPY . .
RUN npm install
RUN npm run build

## this is stage two , where the app actually runs
FROM node:lts-alpine3.13 AS App
ENV MONGO_ADDRESS=$MONGO_ADDRESS
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production
COPY --from=build /usr/src/app/dist ./dist
EXPOSE 9000
CMD npm start