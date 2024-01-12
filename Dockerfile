# Use an official lightweight Node.js image as a base image to build on
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose a port (optional, depending on application)
EXPOSE 3000

# Define the command to run your application
CMD ["npm", "start"]



# CLI COMMANDS:
# -------------
# LIST IMAGES SYNTAX - docker images
# BUILD SYNTAX ->   docker build -t <contaner name> . 



### BUILD APPLICATION CONTAINER ###        
# docker build -t zoo-webapp-image . 

### RUN MONGO CONTAINER TO ACCESS DATABASE ###
# docker pull mongo
# docker run -d --name my-mongodb -p 27017:27017 mongo

### RUN APPLICATION CONTAINER ###
# docker run -p 8080:3000 --link my-mongodb:mongodb -e MONGO_HOST=mongodb zoo-webapp-image



# FOR REMOTE:
# docker run -d --name my-mongodb -p 27017:27017 mongo
# docker run -p 8080:3000 --link my-mongodb:mongodb -e MONGO_HOST=mongodb djb993/zoo-webapp-image

