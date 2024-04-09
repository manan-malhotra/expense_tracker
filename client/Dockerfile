FROM node
ADD . /client
WORKDIR /client
RUN rm -rf node_modules
RUN npm install --force
ENTRYPOINT ["npm", "start"]
