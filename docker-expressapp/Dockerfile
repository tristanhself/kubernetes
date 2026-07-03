FROM node:22

WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json .

# Install the dependencies
RUN npm ci

# Copy the source code of our application
COPY src/index.js index.js

# Expose the application port
EXPOSE 3000

# Start application
CMD [ "node", "index.js" ]