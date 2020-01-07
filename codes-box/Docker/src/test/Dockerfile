FROM node-base

USER root

WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY package-lock.json /usr/src/app
RUN npm install

COPY . /usr/src/app/

EXPOSE 3000

ENTRYPOINT ["npm", "run"]
CMD ["start"]