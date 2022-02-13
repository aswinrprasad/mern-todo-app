FROM ubuntu:20.04

COPY ./* /app/

ENV TZ=Asia/India
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /app

RUN apt update && apt install -y curl gnupg gnupg2 systemd 

RUN curl -fsSL https://www.mongodb.org/static/pgp/server-4.4.asc | apt-key add - && \
	echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-4.4.list && \ 
	apt update && apt install -y nodejs npm mongodb-org && systemctl start mongod.service && systemctl enable mongod && \
	npm install  

EXPOSE 5000 27017

CMD ["npm", "start"]	  

