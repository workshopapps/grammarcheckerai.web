# pull official base image
FROM node:15.14-buster

# set working directory
WORKDIR /api

#copies package.json and package-lock.json to Docker environment
COPY package*.json ./

# Install all node packages
RUN npm install 

# Copies everything over to Docker environment
COPY . .

# Expose the port 
EXPOSE 5000

# Start the app
CMD ["node", "server.js"]

