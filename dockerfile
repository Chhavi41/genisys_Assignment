# Use the official Node.js 20 image as the base image
FROM node:20

WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

COPY . .

# Expose the port the app runs on
EXPOSE 8000

# Command to start the application
CMD ["npm", "start"]
