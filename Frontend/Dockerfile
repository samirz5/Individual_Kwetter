FROM node:12.18.0-alpine as build-stage

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

RUN npm run build

FROM nginx:1.18.0-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY nginx.conf /temp/prod.conf
RUN envsubst /app < /temp/prod.conf > /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;"]
