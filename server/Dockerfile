FROM node:20.7.0-alpine

# install bash and vim
RUN apk update && apk add bash && apk add vim

#working directory
RUN mkdir -p /home/node/app/nodemodules
WORKDIR /home/node/app

# install dependencies
COPY package*.json ./

# ensure that all of the application files are owned by the non-root node user
RUN npm install

# set bash as the default shell
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# copy the project files into the working directory
COPY . .

# expose the port the server listens to
EXPOSE 8000

# start the server after the container is initialized
ENTRYPOINT ["npm", "start"]
