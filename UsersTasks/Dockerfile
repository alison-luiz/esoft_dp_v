FROM node:20

WORKDIR /app

COPY ./tsconfig*.json ./
COPY ./package.json ./
COPY ./.env.example ./.env

RUN npm install

EXPOSE 3000

COPY . .

CMD ["npm", "run", "dev"]