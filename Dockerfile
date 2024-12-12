FROM node:22.8-slim

RUN mkdir -p /home/node/BE_blog

WORKDIR /home/node/BE_blog

COPY package*.json ./

COPY . .

RUN npm install

EXPOSE 4000

CMD ["npm", "run", "dev"]
