FROM node:9
WORKDIR /opt/app
COPY . /opt/app

RUN npm install

CMD ["npm", "start"]