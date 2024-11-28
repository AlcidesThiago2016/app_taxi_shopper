
FROM node:18 as build

WORKDIR /appFront

COPY ./Front-End/package.json ./package-lock.json ./


RUN npm install

COPY ./Front-End ./


RUN npx tsc --project /appFront/tsconfig.json && npm run build

FROM nginx:alpine


COPY --from=build /appFront/dist /usr/share/nginx/html


EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
