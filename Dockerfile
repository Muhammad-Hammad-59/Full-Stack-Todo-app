# Use an official Node.js runtime as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your app will run on
EXPOSE $PORT

# Define environment variables (optional, can be overridden at runtime)
ENV MONGODB_URI=$MONGODB_URI
ENV PORT=$PORT

# Command to run your application
CMD ["node", "index.js"]