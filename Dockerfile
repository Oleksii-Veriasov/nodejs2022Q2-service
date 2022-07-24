FROM node:lts-alpine
# Create app directory
WORKDIR /app
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
# Install app dependencies
RUN npm install && mv node_modules ../
COPY . .
COPY .env.example .env
EXPOSE 4000
CMD [ "npm", "run", "start:dev"]