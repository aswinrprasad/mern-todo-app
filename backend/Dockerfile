FROM node:16.14.0

RUN mkdir -p /app/backend

COPY package.json /app/backend/

WORKDIR /app/backend

RUN npm install  

COPY . /app/backend

EXPOSE 5000 

CMD ["node", "server.js"]	  

