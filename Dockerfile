# Production build & run in one image
FROM node:20-alpine

# Create app directory
WORKDIR /app

# Install dependencies (using lockfile if you have one)
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copy the rest of the source code
COPY . .

# Build the Vite app
RUN npm run build

# Expose the port your server listens on
EXPOSE 5173

# Run the Node server (serves dist/)
CMD ["npm", "run", "start"]
