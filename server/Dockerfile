# Use an official Node.js runtime as a base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application code to the working directory
COPY . .

# Expose the port that the app will run on
EXPOSE 8000:8000

# Command to run the application
CMD ["npm", "start"]
