FROM node:lts

RUN apt update

ENV PORT 3000

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json /usr/src/app/
RUN npm i
RUN npm i -g next
# Copying source files
COPY . /usr/src/app

RUN next build

# Building app
#RUN npm run build
EXPOSE 3000


# Running the app
#CMD [ "npm", "start" ]