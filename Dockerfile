# Small, official Node base image.
FROM node:20-alpine

# App lives here inside the container.
WORKDIR /app

# Copy only manifests first so Docker can cache the npm install layer
# (deps are re-installed only when these files change, not on every code edit).
COPY package*.json ./

# Install production dependencies only.
RUN npm ci --omit=dev

# Copy the rest of the source.
COPY . .

# Document the port the app listens on.
EXPOSE 3000

# Start the server.
CMD ["npm", "start"]
