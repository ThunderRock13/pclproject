# Use the official Node.js image as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json if you have dependencies to install
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Run the JavaScript script using node
CMD ["node", "app.js"]
