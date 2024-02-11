# an official Node.js runtime as a base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app/client

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application code to the working directory
COPY . .


# Command to run the application
CMD ["npm", "start"]