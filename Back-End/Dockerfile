FROM node:18

WORKDIR /app

COPY ./Back-End/package.json ./Back-End/package-lock.json ./

RUN npm install

COPY ./Back-End ./Back-End

RUN npm install -g typescript ts-node

EXPOSE 8080

CMD ["npm", "run", "dev"]
