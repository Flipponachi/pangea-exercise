FROM node:lts-alpine3.13 AS build

WORKDIR /usr/src/app 
COPY package*.json ./
COPY . .
RUN npm install
RUN npm run build

## this is stage two , where the app actually runs
FROM node:lts-alpine3.13 AS App
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production
COPY --from=build /usr/src/app/dist ./dist
EXPOSE 4000
CMD npm start