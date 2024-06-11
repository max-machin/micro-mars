# Use the official Node.js image as a parent image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /auth-service

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the NestJS application
RUN npm run build

# Expose the port on which the application will listen
EXPOSE 3003

# Command to start the application
CMD ["npm", "run", "start"]
