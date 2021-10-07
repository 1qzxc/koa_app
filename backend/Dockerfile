FROM node:11
WORKDIR /app
#COPY package*.json .
COPY package.json .
RUN npm install
#COPY . .
#RUN DATABASE_URL=postgres://postgres:docker@localhost:5433/postgres npm run migrate up
COPY . .
#CMD ["npm", "start"]
EXPOSE 3002




#FROM node:11
#WORKDIR /usr/src/app
#COPY . .
#CMD ["npm", "install"]
#CMD ["npm", "start"]
#EXPOSE 3002
