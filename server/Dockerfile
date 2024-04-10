# Base image
FROM node:alpine
ADD . /app
WORKDIR /app
RUN rm -rf node_modules
RUN npm install --force
ENTRYPOINT ["npm", "run", "dev"]