FROM node:lts-alpine as build

WORKDIR /app
COPY package.json .
RUN npm install

COPY . .
RUN npm run build

FROM nginx:stable-alpine as nginx

COPY --from=build /app/dist /user/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
