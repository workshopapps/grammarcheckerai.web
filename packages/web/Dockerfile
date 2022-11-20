FROM node:19.1.0-alpine
# Set the working directory  inside the container
WORKDIR /web
# Copy files
COPY . .

RUN npm i --force

#RUN npm run build

EXPOSE 5000

CMD [ "npm", "run", "dev"]