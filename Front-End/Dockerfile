FROM node:18 as build

WORKDIR /app

COPY ./Front-End/package.json ./Front-End/package-lock.json ./

RUN npm install

COPY ./Front-End ./ 

RUN ls -la /app

RUN npx tsc --project tsconfig.json && npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
