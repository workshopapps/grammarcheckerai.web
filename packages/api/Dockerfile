# pull official base image
FROM node:15.14-buster

# set working directory
WORKDIR /api

# install app dependencies
#copies package.json and package-lock.json to Docker environment
COPY package*.json ./

# Install all node packages
RUN npm install 

# Copies everything over to Docker environment
COPY . .

# Expose the port 
EXPOSE 3000
# Containers run nginx with global directives and daemon off
CMD ["node", "server.js"]

