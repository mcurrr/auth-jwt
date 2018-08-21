FROM node:9.5.0

RUN npm install webpack@3.6 -g
RUN npm install webpack-cli@3 -g

RUN mkdir -p /code
COPY ./src/package.json /code
WORKDIR /code

RUN npm install

COPY ./src /code

RUN webpack --config /code/client/webpack.config.js

USER node

CMD [ "npm", "start" ]
