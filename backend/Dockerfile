FROM node:11
WORKDIR /app
#COPY package*.json .
COPY package.json .
RUN npm install
#COPY . .
COPY . .
#CMD ["npm", "start"]
EXPOSE 4002
